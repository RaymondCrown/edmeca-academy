/* Bridge saves: a refused save warns and is retried, unsent Session 5 work goes on page hide, and a stale sheet copy does not overwrite newer local work.
   Run:  npm i -D playwright   then   node bridge_saves.test.js /absolute/path/to/DigitalLeaderApp
   Uses the installed Chrome (channel 'chrome'). */
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]);let pass=0,fail=0;const ok=(c,m)=>{if(c){pass++;console.log('  ok   '+m)}else{fail++;console.log('  FAIL '+m)}};
const srv=http.createServer((q,r)=>{const f=path.join(root,q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':'text/html'});r.end(b)})});
(async()=>{await new Promise(r=>srv.listen(8767,r));
const browser=await chromium.launch({channel:'chrome'});const page=await browser.newPage();const errors=[],posts=[];let mode='fail',remote={ok:true,found:false};
page.on('pageerror',e=>errors.push(String(e)));page.on('dialog',d=>d.accept());
await page.route('**/api/bridge**',async route=>{const q=route.request();if(q.method()==='POST'){const b=JSON.parse(q.postData());posts.push(b);return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(mode==='fail'?{ok:false,error:'Your input contains more than the maximum of 50000 characters'}:{ok:true})})}return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(remote)})});
await page.goto('http://localhost:8767/');const ev=f=>page.evaluate(f);const wait=ms=>page.waitForTimeout(ms);
await ev(()=>{state.name='Jodi T';state.business='NC Test';selectSession(5)});await wait(300);
console.log('Refused save');
posts.length=0;await ev(()=>postS5dt('s5dt'));await wait(400);
ok(await ev(()=>$('toast').textContent.includes('not yet to the programme sheet')),'participant is told the sheet did not take it');
ok(await ev(()=>Object.keys(bridgeQueue()).some(k=>k.endsWith('|s5dt'))),'s5dt kept in the retry queue');
ok(posts[0]&&posts[0].state&&posts[0].state.savedAt,'state carries savedAt');
console.log('Retry after the next good save');
mode='ok';posts.length=0;await ev(()=>syncState());await wait(600);
ok(posts.some(p=>p.exercise==='s5dt'),'queued s5dt re-sent');
ok(await ev(()=>Object.keys(bridgeQueue()).length===0),'queue empty');
console.log('Unsent Design Thinking work goes on page hide');
posts.length=0;await ev(()=>{dtSet('persona.name','Zanele')});await ev(()=>{Object.defineProperty(document,'visibilityState',{value:'hidden',configurable:true});document.dispatchEvent(new Event('visibilitychange'))});await wait(400);
ok(posts.some(p=>p.exercise==='s5dt'),'s5dt sent when the page is hidden');
posts.length=0;await ev(()=>document.dispatchEvent(new Event('visibilitychange')));await wait(300);
ok(!posts.some(p=>p.exercise==='s5dt'),'nothing re-sent when nothing changed');
console.log('Stale sheet copy does not overwrite newer local work');
await ev(()=>{const k='edmeca:jodi t|nc test';const l=JSON.parse(localStorage.getItem(k));l.state.persona='LOCAL';localStorage.setItem(k,JSON.stringify(l))});
remote={ok:true,found:true,state:{name:'Jodi T',business:'NC Test',persona:'OLD SHEET'}};
posts.length=0;await ev(()=>load());await wait(400);
ok(await ev(()=>state.persona==='LOCAL'),'legacy, smaller sheet copy loses to local');
ok(posts.some(p=>!p.exercise&&p.state&&p.state.persona==='LOCAL'),'local copy pushed back to the sheet (state only)');
remote={ok:true,found:true,state:{name:'Jodi T',business:'NC Test',persona:'NEWER SHEET',savedAt:'2099-01-01T00:00:00Z'}};
await ev(()=>load());ok(await ev(()=>state.persona==='NEWER SHEET'),'newer sheet copy (another device) wins');
ok(!errors.length,'no page errors '+errors.join());
console.log(`\n${pass} passed, ${fail} failed`);await browser.close();srv.close();process.exit(fail?1:0)})();
