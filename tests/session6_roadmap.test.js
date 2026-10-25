/* Session 6 · AI Roadmap: POST, My Journey, Roadmap, Toolkit, Story and Commitment, the freeze, and the S6 Apps Script handlers.
   Run:  npm i -D playwright   then   node session6_roadmap.test.js /absolute/path/to/DigitalLeaderApp
   Uses the installed Chrome (channel 'chrome'). Check 12 (Sessions 1 to 5 still pass) is the other test files in this folder. */
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]);let pass=0,fail=0;const ok=(c,m)=>{if(c){pass++;console.log('  ok   '+m)}else{fail++;console.log('  FAIL '+m)}};
const srv=http.createServer((q,r)=>{const f=path.join(root,q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':'text/html'});r.end(b)})});
/* The August form's wording, as read from the live form on 25 October 2026 (snapshot) */
const FORM={M:['Unaware. I have little understanding of AI and have never used an AI tool for my business.','Aware. I am aware of AI tools and have tried one or two but do not use them regularly.','Adopting. I use AI tools regularly for specific tasks such as drafting or research and am starting to think of AI as part of how I lead.','Leading. AI tools are embedded in my daily workflow and I actively use AI to make strategic decisions.'],
O:['Unaware. Most operations are manual and I price on experience without a formal costing model.','Aware. I use some digital tools but most processes and financial tracking are still manual.','Adopting. I have digitised several key processes and have a working cost model I review regularly.','Leading. My operations run on integrated digital systems and I use AI assisted financial tools.'],
G:['Unaware. I rely mainly on word of mouth with no formal proposal systems, website or digital marketing.','Aware. I have basic marketing materials or a simple website and respond to tenders ad hoc.','Adopting. I use digital tools to draft proposals and manage a pipeline and maintain an active online presence.','Leading. I have a clear go to market strategy with AI assisted proposals, CRM tracking and digital marketing.'],
I:['Unaware. I deliver the same services as always and decide on intuition without tracking data.','Aware. I know I should innovate and track data but have not used structured frameworks.','Adopting. I have used frameworks such as the Business Model Canvas and review data with some AI assisted analysis.','Leading. I regularly innovate using structured frameworks and AI and have dashboards with AI powered insights.'],
T:['Unaware. My team has limited digital skills and scaling would require hiring more people.','Aware. Some team members use basic digital tools and I recognise technology could help me scale but have not implemented systems.','Adopting. I am investing in my team digital skills and building systems that let me grow without proportional cost increases.','Leading. My team embraces digital tools and my business runs on scalable systems that let me grow without growing headcount.']};
const TITLES=['Mindset and AI Tool Use','Operations and Financial Systems','Growth and Client Engagement','Innovation and Data Driven Decisions','Team and Scalability Readiness'];
let journeyRow=null,readOnly=false;
(async()=>{await new Promise(r=>srv.listen(8770,r));
const browser=await chromium.launch({channel:'chrome'});const page=await browser.newPage();const errors=[],posts=[];
page.on('pageerror',e=>errors.push(String(e)));page.on('dialog',d=>d.accept());
await page.route('**/api/bridge**',async route=>{const q=route.request();
	if(q.method()==='POST'){posts.push(JSON.parse(q.postData()));return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(readOnly?{ok:false,readOnly:true,error:'read-only'}:{ok:true})})}
	const u=new URL(q.url());if(u.searchParams.get('action')==='journey')return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,found:!!journeyRow,journey:journeyRow,freeze:false})});
	return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,found:false})})});
await page.goto('http://localhost:8770/');const ev=(f,a)=>page.evaluate(f,a);const wait=ms=>page.waitForTimeout(ms);
const text=()=>ev(()=>document.getElementById('session6Content').innerText);
await ev(()=>{state.name='Test Person';state.business='Test Co';updateTabLocks();selectSession(6)});await wait(200);

console.log('1 · Step bar and the journey lock');
ok(await ev(()=>document.querySelectorAll('#steps .step').length===5&&[...document.querySelectorAll('#steps .step')].map(s=>s.textContent).join('|').includes('In class · 5')),'five-step bar, In class 1 to 5');
ok(await ev(()=>!document.getElementById('comingSoon').offsetParent),'the coming soon placeholder is gone');
await ev(()=>goS6View(1));await wait(100);
ok(await ev(()=>s6View===0),'My Journey locked before POST');

console.log('2 · POST wording');
const qs=await ev(()=>[...document.querySelectorAll('#s6PostQs .s6q')].map(c=>({t:c.querySelector('h3').textContent,o:[...c.querySelectorAll('.s6opt span')].map(s=>s.textContent)})));
ok(qs.length===5&&qs.every(q=>q.o.length===4),'five questions, four options each');
ok(qs.every((q,i)=>q.t.endsWith(TITLES[i])&&JSON.stringify(q.o)===JSON.stringify(FORM['MOGIT'[i]])),'titles and all twenty options equal the August form, word for word');
ok(await ev(()=>JSON.stringify(POST_QUESTIONS.map(q=>q.options)))===JSON.stringify(['M','O','G','I','T'].map(k=>FORM[k])),'POST_QUESTIONS snapshot');
const t2=await text();
ok(t2.includes('Answer for today, not for us. The same five questions as August.'),'lead line');
ok(t2.includes('Which AI tools have you used in the business since August?')&&t2.includes('Name one thing that has changed in how you run the business since 13 August'),'the two SLA questions');
ok(await ev(()=>['ChatGPT','Claude','Google Gemini','Microsoft Copilot','Canva AI','WhatsApp or another AI assistant','Lovable','Other'].every(t=>!!document.querySelector(`#session6Content input[type=checkbox][value="${t}"]`))),'the eight tool choices');
ok(await ev(()=>{const r=document.getElementById('s6Retro');return !!r&&getComputedStyle(r).borderStyle==='dashed'&&r.querySelectorAll('.s6q').length===5&&r.textContent.includes('optional, never changes your official comparison'.replace(/^o/,'O'))}),'optional retrospective block, five questions, visually separated');
ok(await ev(()=>!!document.querySelector('#session6Content button[onclick="s6SubmitPost()"]')&&document.querySelector('#session6Content button[onclick="s6SubmitPost()"]').textContent==='Submit my assessment'),'Submit my assessment');

console.log('3 · Scoring and bands');
const submit=async(vals)=>{await ev(v=>{'MOGIT'.split('').forEach((k,i)=>{const el=document.querySelector(`input[name=s6post${k}][value="${v[i]}"]`);el.checked=true;el.dispatchEvent(new Event('change'))});s6SubmitPost()},vals);await wait(80);return ev(()=>(document.getElementById('s6PostBand')||{}).textContent)};
posts.length=0;
ok(await submit([3,2,2,2,2])==='Today: 11 of 20, Builder','M3 O2 G2 I2 T2 shows 11 of 20, Builder');
ok(await submit([4,4,4,4,4])==='Today: 20 of 20, Doer','five Leading shows 20 of 20, Doer');
ok(await submit([1,1,1,1,1])==='Today: 5 of 20, Thinker','five Unaware shows 5 of 20, Thinker');
const sp=posts.filter(p=>p.exercise==='s6post');
ok(sp.length===3&&sp[2].data.total===5&&sp[2].data.band==='Thinker'&&sp[2].data.key==='test person|test co','each submission sends s6post with total, band and key');
ok(sp.every(p=>JSON.stringify(p.data.artefacts)==='{"24":1}'),'s6post credits artefact 24');
ok(await ev(()=>document.querySelector('#steps .step:nth-child(2)').className.indexOf('s6locked')===-1),'My Journey unlocked after POST');

console.log('4 · My Journey');
journeyRow={Key:'test person|test co',Name:'Test Person',Business:'Test Co',AugustAnswer:'Assistance to put better financial systems in place',PreM:'2',PreO:'1',PreG:'1',PreI:'1',PreT:'1',PreTotal:'6',PreBand:'Thinker',Artefacts:'11110000111h100000011'};
await submit([3,2,2,2,2]);await ev(()=>goS6View(1));await wait(250);
const j=await text();
ok(j.includes('Assistance to put better financial systems in place'),'August answer quoted');
ok(await ev(()=>document.getElementById('s6PreBand').textContent==='6 of 20, Thinker'&&document.getElementById('s6PostBandJ').textContent==='11 of 20, Builder'),'PRE and POST totals and bands');
ok(await ev(()=>document.querySelectorAll('.s6art').length===21&&document.querySelectorAll('.s6art.on').length===11),'21 artefact rows, credited ones ticked (half counted as started)');
ok(await ev(()=>document.querySelectorAll('.s6dim').length===5),'five PRE and POST dimension bars');
journeyRow=null;await ev(()=>{s6().journey=null;goS6View(1)});await wait(250);
ok(await ev(()=>!!document.getElementById('s6NoJourney')&&document.getElementById('s6NoJourney').textContent.includes('ask a facilitator'.replace(/^a/,'A'))),'missing row: ask a facilitator');
posts.length=0;await ev(()=>{const i=document.getElementById('s6WhatChanged');i.value='I price from my cost sheet now';i.dispatchEvent(new Event('input'));goS6View(2)});await wait(150);
const seed=posts.find(p=>p.exercise==='s6story');
ok(!!seed&&seed.data.storySeed==='I price from my cost sheet now','What changed still allowed and saved to S6_Story as the story seed');

console.log('5 · Roadmap validation');
const setRow=(i,o)=>ev(([i,o])=>{Object.entries(o).forEach(([k,v])=>{const el=document.getElementById(`s6p${i}_${k}`);el.value=v;el.dispatchEvent(new Event(k==='date'||k==='from'?'change':'input'))})},[i,o]);
ok(await ev(()=>document.getElementById('s6CopyBtn').disabled),'Ask Claude blocked on an empty roadmap');
ok(await ev(()=>document.getElementById('s6p0_from').options.length===22),'no journey row: From lists all 21 artefacts');
await setRow(0,{priority:'Quote every job from the cost sheet',from:'14',owner:'Me',tool:'Session 4 sheet',step:'Cost the Midrand job',date:'2026-10-30',measure:'Quotes costed'});
await setRow(1,{priority:'Same-day enquiry replies',owner:'Myself',step:'Set up the WhatsApp reply',date:'2026-11-02',measure:'Replies within a day'});
ok(await ev(()=>document.getElementById('s6CopyBtn').disabled&&document.getElementById('s6Missing').textContent.includes('three priorities')),'two priorities: still blocked');
await setRow(2,{priority:'Monthly cash line',owner:'Owner',step:'Fill in October',date:'2026-12-01',measure:'Weeks of cash'});
ok(await ev(()=>s6().roadmap.rows[2].date===''&&document.getElementById('s6p2_date').value===''),'a date outside 29 October to 4 November is refused');
ok(await ev(()=>document.getElementById('s6CopyBtn').disabled),'blocked while a date is missing');
await setRow(2,{date:'2026-11-04'});
ok(await ev(()=>!document.getElementById('s6CopyBtn').disabled),'unblocked once all three are complete');
ok(await ev(()=>document.getElementById('s6OwnerWarn').style.display===''),'all owners are me: warning shown');
ok(await ev(()=>!document.getElementById('s6CopyBtn').disabled),'the warning does not block');
await setRow(1,{owner:'Office administrator'});
ok(await ev(()=>document.getElementById('s6OwnerWarn').style.display==='none'),'warning clears when one owner is someone else');
await setRow(1,{owner:'Test'});ok(await ev(()=>document.getElementById('s6OwnerWarn').style.display===''),'the participant\'s first name counts as me');await setRow(1,{owner:'Office administrator'});

console.log('6 · Ask Claude');
const prompt=await ev(()=>s6RoadmapPrompt());
ok(prompt.startsWith('As a practical business coach, review my 90-day roadmap: three priorities')&&prompt.includes('Do not rewrite it. Do not add priorities or tools.'),'prompt carries the coach line and the Do not rewrite it line');
ok(['Quote every job from the cost sheet','Same-day enquiry replies','Monthly cash line','14. Cost model or pricing template','Office administrator','Friday 30 October 2026','Test Co'].every(s=>prompt.includes(s)),'prompt carries the three rows and the business name');
await ev(p=>{const q=document.getElementById('s6ClaudeQ');q.value=p;q.dispatchEvent(new Event('input'))},prompt);
ok(await ev(()=>{const m=document.getElementById('s6ClaudeQ').nextElementSibling;return m&&m.classList.contains('echo-msg')&&m.style.display!=='none'}),'pasting the prompt is flagged');
posts.length=0;ok(await ev(()=>s6SaveRoadmap())===false&&!posts.some(p=>p.exercise==='s6roadmap'),'and refused on save');await wait(150);
await ev(()=>{const q=document.getElementById('s6ClaudeQ');q.value='1. Who costs the job if you are on site?\n2. Where does the sheet live?\n3. What happens on day 8?';q.dispatchEvent(new Event('input'));const c=document.getElementById('s6Change');c.value='Named the estimator';c.dispatchEvent(new Event('input'));
	document.getElementById('s6Stranger').open=true;[['s6StrMonday','Estimator'],['s6StrDay30','Ten quotes costed'],['s6StrDrop','Day 90'],['s6StrChange','Moved the date']].forEach(([id,v])=>{const e=document.getElementById(id);e.value=v;e.dispatchEvent(new Event('input'))})});
ok(await ev(()=>s6SaveRoadmap())===true,'real questions save');await wait(150);
const rm=posts.find(p=>p.exercise==='s6roadmap');
ok(rm&&rm.data.rows.length===3&&rm.data.rows[0].fromNo===14&&rm.data.claudeQ.startsWith('1. Who')&&rm.data.stranger.monday==='Estimator','s6roadmap carries three rows, the questions and the stranger check');
ok(rm&&JSON.stringify(rm.data.artefacts)==='{"22":1}'&&rm.data.progress.roadmapPriorities===3&&rm.data.progress.claudeQuestionsPasted&&rm.data.progress.strangerCheckDone,'artefact 22 full credit; progress flags from content');

console.log('7 · Toolkit');
await ev(()=>goS6View(3));await wait(100);
ok(await ev(()=>document.querySelectorAll('.s6kit[data-row]').length===8&&[...document.querySelectorAll('.s6kit[data-row]')].every(r=>r.querySelectorAll('.sortopts button').length===3)),'eight prefilled jobs with Keep, Try, Skip');
ok(await ev(()=>s6().toolkit[7].choice==='skip'),'job 8 prefilled Skip');
posts.length=0;await ev(()=>{s6Choose(0,'keep');s6SaveToolkit()});await wait(150);
const tk=posts.find(p=>p.exercise==='s6toolkit');
ok(tk&&tk.data.rows.length===8&&tk.data.rows[0].choice==='Keep','one row per job');
ok(tk&&!tk.data.rows.some(r=>/[R$€£¥]\s?\d|\d\s*\/\s*month/i.test(JSON.stringify(r)))&&!/\d\s*\/\s*month|R\s?\d/.test(await text()),'no currency or per-month price anywhere');
ok(tk&&JSON.stringify(tk.data.artefacts)==='{"23":0.5}','toolkit partly chosen: 23 at 0.5');
await ev(()=>{for(let i=1;i<7;i++)s6Choose(i,'try');s6SaveToolkit()});await wait(150);
ok(JSON.stringify(posts.filter(p=>p.exercise==='s6toolkit').pop().data.artefacts)==='{"23":1}','all eight chosen: 23 at 1');

console.log('8 · Story and Commitment');
await ev(()=>goS6View(4));await wait(100);
ok((await text()).includes('I price from my cost sheet now'),'What changed shown above the story');
ok(await ev(()=>[...document.querySelectorAll('input[name=s6consent]')].map(i=>i.nextElementSibling.textContent).join('|'))==='Yes: use my business name and story externally|Anonymised: use the story, not the name|Internal only: for the Property Point report','three consent options, exact wording');
posts.length=0;await ev(()=>{const t=document.getElementById('s6TopWin');t.value='Quotes in an hour, not a day';t.dispatchEvent(new Event('input'))});
ok(await ev(()=>s6SaveStory())!==true&&!posts.some(p=>p.exercise==='s6story'),'story save needs a consent choice');
await ev(()=>{const r=document.querySelector('input[name=s6consent][value=anon]');r.checked=true;r.dispatchEvent(new Event('change'))});
ok(await ev(()=>s6SaveStory())===true,'saves once consent is chosen');await wait(150);
const sto=posts.find(p=>p.exercise==='s6story');
ok(sto&&sto.data.consent==='Anonymised: use the story, not the name'&&JSON.stringify(sto.data.artefacts)==='{"25":1}','s6story credits 25');
ok((await text()).includes('Cost the Midrand job')&&(await text()).includes('Friday 30 October 2026'),'commitment shows the first step and date from the roadmap');
ok(await ev(()=>document.getElementById('s6D30').value==='2026-11-28'&&document.getElementById('s6D60').value==='2026-12-28'),'review dates prefilled Saturday 28 November and Monday 28 December');
ok(!(await text()).toLowerCase().includes('partner'),'no partner field');
posts.length=0;await ev(()=>s6SaveCommit());await wait(150);
ok(JSON.stringify(posts.find(p=>p.exercise==='s6commit').data.artefacts)==='{"26":0.5}','first step not ticked: 26 at 0.5');
await ev(()=>{const c=document.getElementById('s6Done');c.checked=true;c.dispatchEvent(new Event('change'));s6SaveCommit()});await wait(150);
let cm=posts.filter(p=>p.exercise==='s6commit').pop();
ok(JSON.stringify(cm.data.artefacts)==='{"26":1}'&&cm.data.done&&cm.data.firstStep==='Cost the Midrand job','ticked with both dates: 26 at 1');
await ev(()=>{const d=document.getElementById('s6D60');d.value='';d.dispatchEvent(new Event('change'));s6SaveCommit()});await wait(150);
ok(JSON.stringify(posts.filter(p=>p.exercise==='s6commit').pop().data.artefacts)==='{"26":0.5}','one date missing: 26 at 0.5');

console.log('9 · Events and progress');
const pr=posts.filter(p=>p.exercise==='s6commit').pop().data.progress;
ok(pr.postDone&&pr.postTotal===11&&pr.postBand==='Builder'&&pr.toolkitDone&&pr.storyDone&&pr.consent.startsWith('Anonymised')&&pr.firstStepDone&&!pr.reviewDatesSet&&!pr.letterSent,'S6_Progress flags derived from content');
posts.length=0;await ev(()=>{const t=document.getElementById('s6TopWin');t.value='Quotes in an hour';t.dispatchEvent(new Event('input'));goS6View(3)});await wait(100);
ok(posts.some(p=>p.exercise==='s6story'&&p.data.topWin==='Quotes in an hour')&&!posts.some(p=>p.exercise==='s6commit'),'leaving a view sends what changed (story), not what was already sent (commitment)');

console.log('10 · Freeze');
readOnly=true;posts.length=0;await ev(()=>{goS6View(4)});await wait(50);
await ev(()=>s6SaveCommit());await wait(200);
ok(await ev(()=>window.workbookFrozen===true&&!!document.getElementById('s6Frozen')&&document.getElementById('s6Frozen').textContent==='The workbook is now read-only; your exports are still available.'),'read-only reply: the banner shows');
ok(await ev(()=>!Object.keys(JSON.parse(localStorage.getItem('edmeca:pending')||'{}')).some(k=>k.includes('s6commit'))),'a read-only save is not queued for retry');
await ev(()=>{window.print=()=>{window.__printed=document.getElementById('s6print').innerText}});
await ev(()=>s6ExportPlan('pdf'));await wait(400); /* the export first asks /api/commentary, which this test does not serve */
const printed=await ev(()=>window.__printed||'');
ok(printed.includes('Your 90-Day Roadmap')&&printed.includes('Your Curated AI Toolkit')&&printed.includes('Your Accountability Commitment')&&printed.includes('Quote every job from the cost sheet'),'PDF export still works: roadmap, toolkit and commitment pages');
ok(await ev(()=>document.querySelectorAll('#s6print .s6page').length===3),'three pages');
readOnly=false;

console.log('11 · Wording');
const s6text=await ev(()=>{const out=[];for(let v=0;v<5;v++){s6View=v;renderS6View();out.push(document.getElementById('session6Content').innerText)}out.push(JSON.stringify(POST_QUESTIONS),s6RoadmapPrompt(),document.getElementById('steps').innerText);return out.join('\n')});
ok(!/[—§]/.test(s6text),'no em dash and no section symbol in Session 6');
ok(!errors.length,'no page errors '+errors.join(' | '));
await browser.close();srv.close();

console.log('Apps Script · S6 handlers');
const src=fs.readFileSync(path.join(root,'EDMECA_Bridge_AppsScript.gs'),'utf8');
function Tab(){this.rows=[];this.max=1000;this.frozen=0}
Tab.prototype={appendRow(r){this.rows.push(r.slice())},setFrozenRows(n){this.frozen=n},getLastRow(){return this.rows.length},getMaxRows(){return Math.max(this.max,this.rows.length)},getFrozenRows(){return this.frozen},
 getLastColumn(){return this.rows.reduce((w,r)=>Math.max(w,r.length),0)},insertRowsAfter(a,n){this.max+=n},deleteRows(s,n){this.rows.splice(s-1,n);this.max-=n},
 getDataRange(){const t=this;return{getValues:()=>t.rows.map(r=>r.slice()),getDisplayValues:()=>t.rows.map(r=>r.map(String))}},
 getRange(r,c,nr,nc){const t=this;nr=nr||1;nc=nc||1;return{setFontWeight(){return this},setNumberFormat(){return this},
  getValues:()=>{const o=[];for(let i=0;i<nr;i++){o.push([]);for(let j=0;j<nc;j++)o[i].push((t.rows[r-1+i]||[])[c-1+j]??'')}return o},
  setValues(v){v.forEach((row,i)=>{t.rows[r-1+i]=t.rows[r-1+i]||[];row.forEach((x,j)=>{t.rows[r-1+i][c-1+j]=x})});return this}}}};
const tabs={};const SS={getActive:()=>({getSheetByName:n=>tabs[n],insertSheet:n=>(tabs[n]=new Tab())})};
const CS={createTextOutput:t=>({setMimeType(){return JSON.parse(t)}}),MimeType:{JSON:1}};
const g=new Function('SpreadsheetApp','ContentService','LockService','Utilities',src+';return{doPost,doGet}')(SS,CS,{getScriptLock:()=>({waitLock(){},releaseLock(){}})},{getUuid:()=>'abcdef12'});
const post=b=>g.doPost({postData:{contents:JSON.stringify(b)}});
const prog={postDone:true,postTotal:11,postBand:'Builder',roadmapPriorities:3,claudeQuestionsPasted:true,consent:'Anonymised: use the story, not the name'};
post({name:'Zanele M',business:'ZM Electrical',exercise:'s6post',data:{answers:{M:3,O:2,G:2,I:2,T:2},total:11,band:'Builder',tools:'Claude',retro:{},artefacts:{24:1},progress:prog}});
post({name:'Zanele M',business:'ZM Electrical',exercise:'s6post',data:{answers:{M:3,O:3,G:2,I:2,T:2},total:12,band:'Builder',retro:{},artefacts:{24:1},progress:prog}});
ok(tabs.S6_Post.rows.length===3&&tabs.S6_Post.rows[0].length===20&&tabs.S6_Post.rows[2][3]==='zanele m|zm electrical'&&tabs.S6_Post.rows[2][9]===12&&tabs.S6_Post.rows[2][19]==='s6post','S6_Post keeps every submission, with Key and Event');
const rows=[1,2,3].map(n=>({no:n,priority:'P'+n,fromNo:14,from:'Cost model or pricing template',owner:'Estimator',date:'2026-10-30',measure:'m'}));
post({name:'Zanele M',business:'ZM Electrical',exercise:'s6roadmap',data:{rows,claudeQ:'1. q',stranger:{monday:'Estimator'},artefacts:{22:1},progress:prog}});
post({name:'Zanele M',business:'ZM Electrical',exercise:'s6roadmap',data:{rows,claudeQ:'1. q2',stranger:{monday:'Estimator'},artefacts:{22:1},progress:prog}});
const R=tabs.S6_Roadmap.rows;ok(R.length===4&&R[1][16]==='1. q2'&&R[2][16]===''&&R[1][18]==='Estimator'&&R[1].length===23,'S6_Roadmap: one row per priority, replaced on resave');
post({name:'Zanele M',business:'ZM Electrical',exercise:'s6toolkit',data:{rows:[{no:1,job:'Drafting',choice:'Keep'}],artefacts:{23:0.5},progress:prog}});
post({name:'Zanele M',business:'ZM Electrical',exercise:'s6story',data:{storySeed:'seed',topWin:'win',consent:'Anonymised: use the story, not the name',artefacts:{25:1},progress:prog}});
post({name:'Zanele M',business:'ZM Electrical',exercise:'s6commit',data:{firstStep:'Cost it',done:true,d30:'2026-11-28',d60:'2026-12-28',artefacts:{26:1},progress:prog}});
ok(tabs.S6_Toolkit.rows.length===2&&tabs.S6_Story.rows[1][8].startsWith('Anonymised')&&tabs.S6_Commit.rows[1][6]==='YES','S6_Toolkit, S6_Story and S6_Commit written');
const A=tabs.S6_Artefacts.rows.slice(1);ok(A.length===5&&A.map(r=>r[3]).sort().join()==='22,23,24,25,26'&&A.find(r=>r[3]===22)[4]==='90-Day AI Implementation Roadmap','S6_Artefacts: one row per artefact, named');
const P=tabs.S6_Progress.rows;ok(P.length===2&&P[1][0]==='zanele m|zm electrical'&&P[1][3]==='YES'&&P[1][7]===3&&P[1][12].startsWith('Anonymised'),'S6_Progress: one row per Key, rewritten on every save');
ok(!tabs.S5_Artefacts&&!tabs.S5_Progress,'S5 tabs untouched by S6 events');
post({name:'Test Person',business:'Test Co',exercise:'s6post',data:{answers:{},retro:{},artefacts:{24:1},progress:prog}});
ok(tabs.S6_Progress.rows.length===2&&tabs.S6_Post.rows.length===4,'test identities kept out of S6_Progress (rows still written elsewhere)');
ok(!g.doGet({parameter:{action:'journey',name:'Zanele M',business:'ZM Electrical'}}).found&&tabs.S6_Journey.rows[0].join()==='Key,Name,Business,AugustAnswer,PreM,PreO,PreG,PreI,PreT,PreTotal,PreBand,Artefacts,Notes','S6_Journey created with headers if missing');
tabs.S6_Journey.rows.push(['zanele m|zm electrical','Zanele M','ZM Electrical','Better quotes','2','1','1','1','1','6','Thinker','111100000000000000000','facilitator only']);
const jr=g.doGet({parameter:{action:'journey',name:'Zanele M ',business:'zm electrical'}});
ok(jr.found&&jr.journey.PreTotal==='6'&&jr.journey.Artefacts==='111100000000000000000'&&!('Notes' in jr.journey)&&jr.freeze===false,'journey read by Key, Notes left out');
ok(!g.doGet({parameter:{action:'journey',name:'Nobody',business:'X'}}).found,'missing journey row: found false');
tabs.Config.rows[1][1]=true;
const before=tabs.S6_Commit.rows.length;const fr=post({name:'Zanele M',business:'ZM Electrical',exercise:'s6commit',data:{progress:prog}});
ok(fr.readOnly&&!fr.ok&&tabs.S6_Commit.rows.length===before,'Config freeze TRUE: writes refused as read-only');
ok(g.doGet({parameter:{action:'load',name:'Zanele M',business:'ZM Electrical'}}).freeze===true,'load reports the freeze');
console.log(`\n${pass} passed, ${fail} failed`);process.exit(fail?1:0)})();
