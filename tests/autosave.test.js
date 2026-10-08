/* Autosave on navigation: the step being left reaches the sheet by the step bar, Back, a session tab or hiding the page, without duplicates.
   Run:  npm i -D playwright   then   node autosave.test.js /absolute/path/to/DigitalLeaderApp
   Uses the installed Chrome (channel 'chrome'). */
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]);let pass=0,fail=0;const ok=(c,m)=>{if(c){pass++;console.log('  ok   '+m)}else{fail++;console.log('  FAIL '+m)}};
const srv=http.createServer((q,r)=>{const f=path.join(root,q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':'text/html'});r.end(b)})});
(async()=>{await new Promise(r=>srv.listen(8768,r));
const browser=await chromium.launch({channel:'chrome'});const page=await browser.newPage();const errors=[],posts=[];
page.on('pageerror',e=>errors.push(String(e)));page.on('dialog',d=>d.accept());
await page.route('**/api/bridge**',async route=>{const q=route.request();if(q.method()==='POST')posts.push(JSON.parse(q.postData()));return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,found:false})})});
await page.goto('http://localhost:8768/');const ev=f=>page.evaluate(f);const wait=ms=>page.waitForTimeout(ms);
const sent=ex=>posts.filter(p=>p.exercise===ex);const toastShown=()=>ev(()=>$('toast').classList.contains('show'));
await ev(()=>{state.name='Auto Save';state.business='Test Co';});
console.log('Startup and resume send nothing');
await ev(()=>{selectSession(1)});await wait(200);
ok(!posts.some(p=>p.exercise),'no exercise rows on opening a session');

console.log('Session 1: step bar');
await ev(()=>showSession1Exercise(0));await ev(()=>{$('q1').value='Admin eats my mornings';$('q1').dispatchEvent(new Event('input',{bubbles:true}))});
posts.length=0;await ev(()=>showSession1Exercise(1));await wait(200);
ok(sent('e1').length===1&&sent('e1')[0].data.q1==='Admin eats my mornings','e1 sent when the step bar moves on');
ok(!(await toastShown()),'no toast on autosave');
posts.length=0;await ev(()=>showSession1Exercise(0));await wait(150);
ok(!sent('e2').length,'empty exercise 2 not sent');
posts.length=0;await ev(()=>showSession1Exercise(1));await wait(150);
ok(!sent('e1').length,'unchanged exercise 1 not sent again');
await ev(()=>{$('role').value='You are my ops lead';});posts.length=0;await ev(()=>{save(2);go(3)});await wait(150);
ok(sent('e2').length===1,'Save & continue sends once, no duplicate from the autosave');

console.log('Session 2: step bar and Back');
await ev(()=>trySelectSession(2));await wait(200);
ok(sent('e1').length===0,'leaving Session 1 from exercise 3 does not resend e1');
await ev(()=>goSession2(0));await ev(()=>{$('s2Notes').value='Quotes first'});
posts.length=0;await ev(()=>goSession2(1));await wait(150);
ok(sent('s2_priorities').length===1&&sent('s2_priorities')[0].data.notes==='Quotes first','s2_priorities sent from the step bar');
await ev(()=>{state.processes[0].name='Quoting';state.processes[0].steps=[{text:'Site visit',friction:'waiting'}]});
posts.length=0;await ev(()=>{goSession2(2);session2Back()});await wait(150);
ok(sent('s2_processmap').length===1,'process map sent when moving on');
await ev(()=>{state.pilot={}});await ev(()=>goSession2(4));await ev(()=>{$('pilotProcess').value='Quoting'});
posts.length=0;await ev(()=>session2Back());await wait(150);
ok(sent('s2_pilot').length===1&&sent('s2_pilot')[0].data.process==='Quoting','half-filled pilot sent by Back (owner and date still blank)');

console.log('Session 3: pasted prompt is still held back');
await ev(()=>trySelectSession(3));await ev(()=>{const d=s3();d.evidence=[{client:'Mall',scope:'HVAC',value:'1',date:'2026',outcome:'won'}];goSession3(2)});await wait(150);
await ev(()=>{const d=s3();d.capPrompt='You are a capability statement writer for my business. Use my evidence table to write two pages.';$('capText').value=d.capPrompt});
posts.length=0;await ev(()=>goSession3(3));await wait(150);
ok(!sent('s3_statement').length,'statement that is just the prompt is not sent');

console.log('Session 4: unfinished card sent by a session tab');
await ev(()=>trySelectSession(4));await ev(()=>{goSession4(0);s4().job.line='Aircon service';s4().job.client='Client A'});
posts.length=0;await ev(()=>trySelectSession(2));await wait(150);
ok(sent('s4c1').length===1&&sent('s4c1')[0].data.line==='Aircon service','s4c1 sent with required fields still missing');

console.log('Hiding the page');
await ev(()=>{goSession2(0);$('s2Notes').value='Quotes first, then invoices'});
posts.length=0;await ev(()=>{Object.defineProperty(document,'visibilityState',{value:'hidden',configurable:true});document.dispatchEvent(new Event('visibilitychange'))});await wait(200);
ok(sent('s2_priorities').length===1,'current step sent when the browser tab is hidden');
posts.length=0;await ev(()=>document.dispatchEvent(new Event('visibilitychange')));await wait(150);
ok(!sent('s2_priorities').length,'not resent when nothing changed');

ok(!errors.length,'no page errors '+errors.join(' | '));
console.log(`\n${pass} passed, ${fail} failed`);await browser.close();srv.close();process.exit(fail?1:0)})();
