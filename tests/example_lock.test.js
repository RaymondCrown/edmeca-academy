/* Session 5 example is look-only: boxes cannot be edited, Start my own canvas brings back the participant's own work, and nothing from the example reaches the sheet.
   Run:  npm i -D playwright   then   node example_lock.test.js /absolute/path/to/DigitalLeaderApp
   Uses the installed Chrome (channel 'chrome'). */
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]);let pass=0,fail=0;const ok=(c,m)=>{if(c){pass++;console.log('  ok   '+m)}else{fail++;console.log('  FAIL '+m)}};
const srv=http.createServer((q,r)=>{const f=path.join(root,q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':'text/html'});r.end(b)})});
(async()=>{await new Promise(r=>srv.listen(8769,r));
const browser=await chromium.launch({channel:'chrome'});const page=await browser.newPage();const errors=[],posts=[];
page.on('pageerror',e=>errors.push(String(e)));page.on('dialog',d=>d.accept());
await page.route('**/api/bridge**',async route=>{const q=route.request();if(q.method()==='POST')posts.push(JSON.parse(q.postData()));return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true,found:false})})});
await page.goto('http://localhost:8769/');const ev=f=>page.evaluate(f);const wait=ms=>page.waitForTimeout(ms);
await ev(()=>{state.name='Example Lock';state.business='Test Co';selectSession(5)});await wait(200);
await ev(()=>{dtSet('persona.name','Zanele');goSession5(0);s5Set('customerSegments',0,'My own segment')});
console.log('Loading the example');
await ev(()=>s5LoadSample());await wait(200);posts.length=0;
ok(await ev(()=>s5().example&&!!state.session5Own),'own work set aside while the example shows');
await ev(()=>goSession5(0));await wait(150);
ok(await ev(()=>[...document.querySelectorAll('#session5Content textarea.s5ans')].every(t=>t.readOnly)),'canvas boxes are read-only');
ok(await ev(()=>!!document.querySelector('#session5Content button[onclick="s5StartOwn()"]')&&!document.querySelector('#session5Content button[onclick="s5Reset()"]')),'Start my own canvas replaces Reset');
ok(await ev(()=>document.querySelector('#session5Content').textContent.includes('look-only')),'look-only notice on the canvas view');
await ev(()=>{s5Set('customerSegments',0,'typed over the example')});
ok(await ev(()=>s5().canvas.customerSegments[0]!=='typed over the example'),'s5Set refuses a change to the example');
await ev(()=>goS5View(0));await wait(150);
ok(await ev(()=>[...document.querySelectorAll('#session5Content input[type=text],#session5Content textarea')].every(i=>i.readOnly)&&[...document.querySelectorAll('#session5Content input[type=radio],#session5Content input[type=checkbox]')].every(i=>i.disabled)),'Design Thinking fields read-only, choices disabled');
await ev(()=>dtSet('persona.name','Typed'));ok(await ev(()=>dt().persona.name==='Thabo'),'dtSet refuses a change to the example');
ok(!posts.some(p=>['s5dt','s5canvas'].includes(p.exercise)),'nothing from the example sent to the S5 tabs');
console.log('Start my own canvas');
await ev(()=>s5StartOwn());await wait(200);
ok(await ev(()=>!s5().example&&dt().persona.name==='Zanele'&&s5().canvas.customerSegments[0]==='My own segment'&&!state.session5Own),'own work is back, example gone');
ok(await ev(()=>[...document.querySelectorAll('#session5Content input,#session5Content textarea')].every(i=>!i.readOnly&&!i.disabled)),'fields editable again');
posts.length=0;await ev(()=>{dtSet('persona.name','Zanele M');goS5View(1)});await wait(200);
ok(posts.some(p=>p.exercise==='s5dt'),'own work saves again');
console.log('No own work: example then Start my own gives a blank workbook');
await ev(()=>{state.session5=blankSession5();s5LoadSample()});await wait(150);await ev(()=>s5StartOwn());
ok(await ev(()=>!s5().example&&!s5Stats().items&&!state.session5Own),'blank workbook after the example');
ok(!errors.length,'no page errors '+errors.join(' | '));
console.log(`\n${pass} passed, ${fail} failed`);await browser.close();srv.close();process.exit(fail?1:0)})();
