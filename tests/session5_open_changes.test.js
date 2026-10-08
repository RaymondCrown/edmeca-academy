/* Session 5 open changes: example in the Design Thinking cards, artefact credit, facilitator progress.
   Run:  npm i -D playwright   then   node session5_open_changes.test.js /absolute/path/to/DigitalLeaderApp
   Uses the installed Chrome (channel 'chrome'); set PW_CHANNEL= to use Playwright's own Chromium instead. */
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'DigitalLeaderApp');
let pass=0,fail=0;const ok=(c,m)=>{if(c){pass++;console.log('  ok   '+m)}else{fail++;console.log('  FAIL '+m)}};
const srv=http.createServer((q,r)=>{const f=path.join(root,q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':f.endsWith('.html')?'text/html':'application/octet-stream'});r.end(b)})});
(async()=>{
	await new Promise(r=>srv.listen(8766,r));
	const browser=await chromium.launch(process.env.PW_CHANNEL===''?{}:{channel:process.env.PW_CHANNEL||'chrome'});
	const page=await browser.newPage();const errors=[],posts=[];
	page.on('pageerror',e=>errors.push(String(e)));
	page.on('dialog',d=>d.accept());
	await page.route('**/api/bridge**',async route=>{const req=route.request();if(req.method()==='POST'){try{posts.push(JSON.parse(req.postData()))}catch(_){}}await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,found:false})})});
	await page.goto('http://localhost:8766/');
	await page.evaluate(()=>{state.name='Test Participant';state.business='Kgotso Test';selectSession(5)});
	await page.waitForTimeout(300);
	const last=ex=>[...posts].reverse().find(p=>p.exercise===ex);
	const ev=f=>page.evaluate(f);

	console.log('Example loads into the Design Thinking cards');
	await ev(()=>{const d=dt();d.persona.name='Zanele';d.segments[0]='My own group'});
	await ev(()=>s5LoadSample());
	await page.waitForTimeout(200);
	ok(await ev(()=>s5().example===true),'example flag set');
	ok(await ev(()=>dt().persona.name==='Thabo'&&dt().chosen===0&&dt().hmwChosen===0),'cards hold the Kgotso example (persona, chosen group, chosen HMW)');
	ok(await ev(()=>[0,1,2].every(dtComplete)),'all three in-class steps complete with the example loaded');
	ok(await ev(()=>dt().circled.length===3&&dt().calls[0].who!==''&&dt().calls[1].who===''),'three circled, one example call');
	ok(await page.locator('text=The Kgotso Facilities example is loaded').count()===1,'banner shown on the Design Thinking view');
	ok(await page.locator('.s5bar button:has-text("Example")').count()===1&&await page.locator('.s5bar button:has-text("Start my own canvas")').count()===1,'Example and Start my own canvas buttons on the Design Thinking view (Reset while the example is loaded)');
	ok(await ev(()=>s5View===0),'stays on the current view after loading');

	console.log('Example stays out of the sheet');
	posts.length=0;
	await ev(()=>{goS5View(1);goS5View(2);postS5dt('s5dt');postSession5('s5canvas')});
	ok(posts.every(p=>!p.exercise||p.exercise==='signin'||!/^s5/.test(p.exercise)),'no s5 event posted while the example is loaded');
	ok(await ev(()=>{dtToCanvas();return s5View===2}),'Take it to the canvas refuses with the example loaded');

	console.log('Reset clears the cards, the flag and the sheet rows');
	posts.length=0;
	await ev(()=>s5Reset());
	await page.waitForTimeout(200);
	ok(await ev(()=>!s5().example&&dt().persona.name===''&&dt().chosen===-1&&s5View===0),'cards and flag cleared, back on Empathize');
	ok(!!last('s5dt')&&last('s5dt').data.dtRows.length===0,'s5dt posted with no rows after reset');

	console.log('Progress (S5_Progress)');
	await ev(()=>{const d=dt();d.calls[0].who='Facilities manager';d.calls[0].happened='A chiller tripped';d.calls[1].who='Only a role'});
	let p=await ev(()=>s5Progress());
	ok(p.calls===1&&p.inClass===0&&p.sections===0&&p.finalised===false,'one call counts only when who and what happened are both filled');
	await ev(()=>{Object.assign(state.session5,{dt:dtExampleState()});s5().example=false});
	p=await ev(()=>s5Progress());
	ok(p.inClass===3&&p.empathize&&p.define&&p.ideate,'in-class count reaches 3 when every step is complete');
	posts.length=0;
	await ev(()=>postS5dt('s5dt'));
	ok(!!last('s5dt')&&last('s5dt').data.progress.inClass===3&&last('s5dt').data.progress.calls===1,'s5dt carries progress');

	console.log('Artefact credit');
	ok(JSON.stringify(last('s5dt').data.artefacts)==='{"20":1}','s5dt gives artefact 20 once Ideate & Prototype is complete');
	await ev(()=>{dt().proto.change=''});
	posts.length=0;await ev(()=>postS5dt('s5dt'));
	ok(JSON.stringify(last('s5dt').data.artefacts)==='{}','no credit for 20 while Ideate & Prototype is incomplete');
	await ev(()=>{dt().proto.change='Add one line on the fee'});
	ok(await ev(()=>JSON.stringify(s5Artefacts())==='{"20":1}'),'canvas empty: only artefact 20 so far');
	await ev(()=>{dtToCanvas()}); await page.waitForTimeout(200);
	ok(await ev(()=>JSON.stringify(s5Artefacts())==='{"20":1}'),'unedited Design Thinking drafts earn no credit for 18 or 21');
	await ev(()=>{const c=s5().canvas;c.valuePropositions[0]+=' We start with a free site check.';c.valuePropositions[2]+='they get one contractor who is accountable.'});
	ok(await ev(()=>{const a=s5Artefacts();return a[18]===0.5&&a[21]===1&&a[20]===1&&a[19]===undefined}),'edited VP1 and VP3: 18 = 0.5, 21 = 1, 19 not yet');
	await ev(()=>{s5().canvas.valuePropositions[1]='Our proposition is improved and rests on fixed fees and one report.'});
	ok(await ev(()=>s5Artefacts()[18]===1),'18 = 1 once all three Value Proposition starters are answered');
	posts.length=0;
	await ev(()=>{s5Finalise()});await page.waitForTimeout(200);
	const sub=last('s5submit');
	ok(!!sub&&sub.data.artefacts[19]===0.5&&sub.data.artefacts[18]===1&&sub.data.artefacts[20]===1&&sub.data.artefacts[21]===1,'s5submit carries 18, 19 (0.5, canvas not full), 20 and 21');
	ok(!!sub&&sub.data.progress.finalised===true&&sub.data.progress.sections>=2,'s5submit carries progress with the canvas finalised');
	await ev(()=>{Object.keys(s5().canvas).forEach(k=>{s5().canvas[k]=['a','b','c']});s5().finalized=new Date().toISOString()});
	ok(await ev(()=>s5Artefacts()[19]===1),'19 = 1 when all nine sections are filled and finalised');

	console.log('Regression');
	await ev(()=>{selectSession(4)});await page.waitForTimeout(150);
	await ev(()=>{selectSession(5)});await page.waitForTimeout(150);
	ok(await page.locator('#steps .step').count()===6,'Session 5 step bar still has six views');
	ok(errors.length===0,'no page errors'+(errors.length?': '+errors.join(' | '):''));
	await browser.close();srv.close();
	console.log(`\n${pass} passed, ${fail} failed`);process.exit(fail?1:0);
})().catch(e=>{console.error(e);process.exit(2)});
