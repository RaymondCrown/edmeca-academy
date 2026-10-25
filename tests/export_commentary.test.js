/* Export commentary: api/commentary.js (validation, the saved-workbook gate, refusals and errors, with the SDK and the bridge mocked)
   and the commentary page in the My Journey, plan and Session 5 canvas exports (browser, /api/commentary mocked). No real API call.
   Run:  npm i -D playwright   then   node export_commentary.test.js /absolute/path/to/DigitalLeaderApp */
const http=require('http'),fs=require('fs'),path=require('path'),{pathToFileURL}=require('url');const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]);let pass=0,fail=0;const ok=(c,m)=>{if(c){pass++;console.log('  ok   '+m)}else{fail++;console.log('  FAIL '+m)}};
const srv=http.createServer((q,r)=>{const f=path.join(root,q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':'text/html'});r.end(b)})});
(async()=>{
console.log('api/commentary.js');
const mod=await import(pathToFileURL(path.join(root,'api','commentary.js')).href);
ok(mod.prepare({kind:'other',text:'x'}).status===400&&mod.prepare({kind:'plan',text:'  '}).status===400&&mod.prepare({kind:'plan',text:'x'.repeat(24001)}).status===413,'unknown kind, empty and over-long documents refused');
const pr=mod.prepare({kind:'plan',text:'Priority 1: Quote from the cost sheet'}).request;
ok(pr.model==='claude-sonnet-5-5'&&pr.thinking.type==='adaptive'&&pr.output_config.effort==='medium'&&pr.fallbacks==='default'&&pr.betas.includes('server-side-fallback-2026-07-01'),'Sonnet 5.5, adaptive thinking, medium effort, default fallbacks');
ok(pr.system.includes('90-day AI implementation roadmap')&&pr.system.includes('no em dashes')&&pr.messages[0].content.includes('<document>\nPriority 1: Quote from the cost sheet\n</document>'),'instructions live on the server; the document is wrapped as data');
ok(['journey','canvas'].every(k=>mod.prepare({kind:k,text:'x'}).request.system!==pr.system),'each export has its own instructions');
ok(mod.tidy('Keep it — small\n\n\n\nnext')==='Keep it, small\n\nnext','em dashes replaced, spacing tidied');
const call=async(req,env)=>{const out={};const res={setHeader(){},status(c){out.status=c;return this},json(j){out.body=j;return this}};const old={...process.env};Object.assign(process.env,env||{});try{await mod.default(req,res)}finally{process.env=old}return out};
const body={name:'Zanele M',business:'ZM Electrical',kind:'plan',text:'Priority 1: x'};
ok((await call({method:'GET'})).status===405,'GET refused');
ok((await call({method:'POST',body})).status===503,'no ANTHROPIC_API_KEY: 503, not configured');
let found=false;global.fetch=async u=>({json:async()=>({ok:true,found,asked:String(u)})});
const env={ANTHROPIC_API_KEY:'test',EDMECA_BRIDGE_URL:'https://script.example/exec'};
ok((await call({method:'POST',body},env)).status===403,'no saved workbook: 403');
found=true;let sent=null,reply={stop_reason:'end_turn',content:[{type:'thinking',thinking:''},{type:'text',text:'Your plan holds — mostly.\n\nWatch Day 30.'}]};
class APIError extends Error{constructor(s){super('x');this.status=s}}class RateLimitError extends APIError{}
mod.deps.Anthropic=class{constructor(){this.beta={messages:{create:async r=>{sent=r;if(reply instanceof Error)throw reply;return reply}}}}};Object.assign(mod.deps.Anthropic,{APIError,RateLimitError});
let o=await call({method:'POST',body},env);
ok(o.status===200&&o.body.commentary==='Your plan holds, mostly.\n\nWatch Day 30.'&&sent.messages[0].content.includes('Priority 1: x'),'commentary returned, text blocks only, tidied');
reply={stop_reason:'refusal',content:[]};ok((await call({method:'POST',body},env)).status===422,'refusal: 422');
reply=new RateLimitError(429);ok((await call({method:'POST',body},env)).status===429,'rate limited: 429');
reply=new APIError(500);ok((await call({method:'POST',body},env)).status===502,'API error: 502');

console.log('Exports in the browser');
await new Promise(r=>srv.listen(8771,r));
const browser=await chromium.launch({channel:'chrome'});const page=await browser.newPage();const errors=[],asks=[];let mode='ok';
page.on('pageerror',e=>errors.push(String(e)));page.on('dialog',d=>d.accept());
await page.route('**/api/bridge**',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,found:false})}));
await page.route('**/api/commentary',route=>{asks.push(JSON.parse(route.request().postData()));return mode==='ok'?route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,commentary:'First paragraph about the plan.\n\nSecond paragraph: what to check on Day 30.'})}):route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({ok:false,configured:false})})});
await page.goto('http://localhost:8771/');const ev=(f,a)=>page.evaluate(f,a);const wait=ms=>page.waitForTimeout(ms);
await ev(()=>{state.name='Zanele M';state.business='ZM Electrical';updateTabLocks();selectSession(6);const d=s6();d.post.answers={M:3,O:2,G:2,I:2,T:2};d.post.submittedAt='2026-10-29T08:00:00Z';d.post.submitted={total:11,band:'Builder'};
	d.roadmap.rows[0]={...d.roadmap.rows[0],priority:'Quote every job from the cost sheet',owner:'Estimator',step:'Cost the Midrand job',date:'2026-10-30',measure:'Quotes costed'};d.journey={found:true,AugustAnswer:'Better financial systems',PreTotal:'6',PreBand:'Thinker',Artefacts:'111100000000000000000'};
	window.print=()=>{window.__printed=document.getElementById('s6print').innerHTML}});
await ev(()=>s6ExportPlan('pdf'));await wait(300);
const html=await ev(()=>window.__printed||'');
ok(asks.length===1&&asks[0].kind==='plan'&&asks[0].text.includes('Quote every job from the cost sheet')&&asks[0].text.includes('Your Curated AI Toolkit'),'plan export asks for commentary with the plan text');
ok(!asks[0].text.includes('Zanele'),'the document text carries no participant name');
ok(html.includes('Commentary and guidance')&&html.includes('<p>Second paragraph: what to check on Day 30.</p>')&&html.includes('Written by Claude (AI)'),'commentary page added, paragraphs and source line');
ok(await ev(()=>document.querySelectorAll('#s6print .s6page').length===4),'four pages: roadmap, toolkit, commitment, commentary');
await ev(()=>{window.__printed='';s6ExportPlan('pdf')});await wait(300);
ok(asks.length===1&&(await ev(()=>window.__printed)).includes('Commentary and guidance'),'same plan again: no second request');
await ev(()=>s6ExportJourney('pdf'));await wait(300);
ok(asks.length===2&&asks[1].kind==='journey'&&asks[1].text.includes('Better financial systems')&&asks[1].text.includes('11 of 20, Builder')&&!asks[1].text.includes('Zanele'),'journey export sends the journey, without the name');
ok((await ev(()=>window.__printed)).includes('Commentary and guidance'),'journey PDF carries the commentary');
mode='off';await ev(()=>{s6().roadmap.rows[0].measure='Quotes costed a week';window.__printed='';s6ExportPlan('pdf')});await wait(300);
ok(asks.length===3&&(await ev(()=>document.querySelectorAll('#s6print .s6page').length))===3&&!(await ev(()=>window.__printed)).includes('Commentary'),'commentary unavailable: the export goes ahead without it');
console.log('Session 5 canvas Word export');
mode='ok';
await ev(()=>{const made=[];class P{constructor(o){made.push(o&&o.text)}}window.docx={Document:class{constructor(o){this.o=o}},Packer:{toBlob:async()=>new Blob(['x'])},Paragraph:P,TextRun:class{constructor(o){this.o=o}},HeadingLevel:{},AlignmentType:{},BorderStyle:{}};window.__made=made;window.s5Download=(b,n)=>{window.__saved=n};
	state.session5=blankSession5();s5().canvas.customerSegments=['Facilities managers of office parks'];s5ExportWord()});await wait(300);
ok(asks.length===4&&asks[3].kind==='canvas'&&asks[3].text.includes('Facilities managers of office parks')&&asks[3].text.includes('[EMPTY]'),'canvas export sends the nine blocks');
ok(await ev(()=>window.__made.includes('Commentary and guidance')&&window.__made.includes('First paragraph about the plan.')&&/\.docx$/.test(window.__saved||'')),'canvas Word file carries the commentary');
await ev(()=>{s5LoadSample();window.__saved='';s5ExportWord()});await wait(300);
ok(asks.length===4&&!!(await ev(()=>window.__saved)),'the look-only example canvas exports without asking');
ok(!errors.length,'no page errors '+errors.join(' | '));
await browser.close();srv.close();
console.log(`\n${pass} passed, ${fail} failed`);process.exit(fail?1:0)})();
