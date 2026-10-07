/* Session 5: Empathize feeds Define (drafts once into empty fields, suggestions, HMW starter).
   Run:  npm i -D playwright   then   node session5_define_prefill.test.js /absolute/path/to/DigitalLeaderApp
   Uses the installed Chrome (channel 'chrome'); set PW_CHANNEL= to use Playwright's own Chromium instead. */
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'DigitalLeaderApp');
let pass=0,fail=0;const ok=(c,m)=>{if(c){pass++;console.log('  ok   '+m)}else{fail++;console.log('  FAIL '+m)}};
const srv=http.createServer((q,r)=>{const u=q.url.split('?')[0];const f=path.join(root,u==='/'?'index.html':u);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':f.endsWith('.html')?'text/html':'application/octet-stream'});r.end(b)})});
(async()=>{
	await new Promise(r=>srv.listen(8767,r));
	const browser=await chromium.launch(process.env.PW_CHANNEL===''?{}:{channel:process.env.PW_CHANNEL||'chrome'});
	const page=await browser.newPage();const errors=[];
	page.on('pageerror',e=>errors.push(String(e)));page.on('dialog',d=>d.accept());
	await page.route('**/api/bridge**',r=>r.fulfill({status:200,contentType:'application/json',body:'{"ok":true,"found":false}'}));
	await page.goto('http://localhost:8767/');
	const ev=f=>page.evaluate(f);
	await ev(()=>{state.name='Test Participant';state.business='Kgotso Test';selectSession(5)});
	await page.waitForTimeout(200);

	console.log('Define opens empty when Empathize is empty');
	await ev(()=>goS5View(1));
	ok(await ev(()=>{const p=dt().problem;return !p.customer&&!p.job&&!p.barrier&&dt().seeded.length===0}),'nothing drafted from empty cards');
	ok(await page.locator('.dtsug').count()===0,'no suggestions shown');

	console.log('Empathize feeds Define');
	await ev(()=>{const d=dt();d.segments[0]='Facilities managers of office parks';d.segments[1]='Retail centre managers';d.chosen=0;d.persona.name='Thabo';d.challenges[0]='No time to check plant before it fails.';d.pains[0]='"I hear about the broken aircon from the tenant first."';d.jobs.functional={when:'a tenant reports a fault',want:'it fixed before they phone again',so:'keep the leases renewing'};d.jobs.emotional.so='Stop dreading the heatwave';goS5View(0);goS5View(1)});
	await page.waitForTimeout(150);
	let p=await ev(()=>dt().problem);
	ok(p.customer==='Facilities managers of office parks','customer drafted from the chosen segment');
	ok(p.job==='keep the leases renewing','job drafted from the functional job ("so I can")');
	ok(p.barrier==='no time to check plant before it fails','barrier drafted from the first challenge, lower case, no full stop');
	ok(await ev(()=>dtProblemSentence())==='Facilities managers of office parks struggle to keep the leases renewing because no time to check plant before it fails.','problem sentence assembles from the drafts');
	ok(await page.locator('text=We drafted some fields from your Empathize cards').count()===1,'note says the fields were drafted');
	ok(await page.locator('.dtsug button:has-text("Facilities managers of office parks like Thabo")').count()===1,'customer suggestion with the persona');
	ok(await page.locator('.dtsug button:has-text("it fixed before they phone again")').count()===1&&await page.locator('.dtsug button:has-text("stop dreading the heatwave")').count()===1,'job suggestions from the functional and emotional jobs');
	ok(await page.locator('.dtsug button:has-text("I hear about the broken aircon from the tenant first")').count()===1,'pain suggestion with its quote marks removed');

	console.log('Suggestions and editing');
	await page.locator('.dtsug button:has-text("I hear about the broken aircon")').click();
	ok(await ev(()=>dt().problem.barrier)==='I hear about the broken aircon from the tenant first','tapping a suggestion sets the field');
	ok(await page.locator('#session5Content input[value="I hear about the broken aircon from the tenant first"]').count()===1,'the input shows the new value');
	await ev(()=>{dtSet('problem.job','');goS5View(0);goS5View(1)});
	ok(await ev(()=>dt().problem.job)==='','a field the owner cleared is not drafted again');
	await ev(()=>{dt().jobs.functional.so='win the renewal';goS5View(0);goS5View(1)});
	ok(await ev(()=>dt().problem.customer)==='Facilities managers of office parks','a drafted field is not overwritten when Empathize changes');

	console.log('HMW starter');
	await ev(()=>{dtSet('problem.job','keep the leases renewing');renderS5dt()});
	ok(await page.locator('.dtsug button:has-text("How might we help facilities managers of office parks to keep the leases renewing, so they can")').count()===3,'starter offered under each empty HMW box');
	await page.locator('.dtsug button:has-text("How might we help")').first().click();
	ok(await ev(()=>dt().hmw[0].startsWith('How might we help facilities managers')),'tapping the starter fills HMW 1');
	ok(await page.locator('.dtsug button:has-text("How might we help")').count()===2,'starter no longer offered under a filled box');
	await ev(()=>{const d=dt();d.hmw[1]='HMW two?';d.hmw[2]='HMW three?';d.hmwChosen=0;d.checks={focus:true,evidence:true,nosolution:true}});
	ok(await ev(()=>!dtComplete(1)&&dtMissing(1).join().includes('each one finished')),'an unfinished starter does not count as a question');
	await ev(()=>{dt().hmw[0]+='renew without a fight?'});
	ok(await ev(()=>dtComplete(1)),'Define completes once the starter is finished');

	console.log('Save and reload');
	ok(await ev(()=>{const m=mergeDt(JSON.parse(JSON.stringify(dt())));return JSON.stringify(m.seeded)===JSON.stringify(dt().seeded)&&m.seeded.length===3}),'seeded list survives a reload');
	ok(await ev(()=>Array.isArray(mergeDt({}).seeded)&&mergeDt({}).seeded.length===0),'old saves without the list still open');
	await ev(()=>{s5LoadSample()});await page.waitForTimeout(100);
	ok(await ev(()=>dt().problem.customer==='Facilities managers like Thabo'),'Example still loads its own problem statement');
	ok(errors.length===0,'no page errors'+(errors.length?': '+errors.join(' | '):''));
	await browser.close();srv.close();
	console.log(`\n${pass} passed, ${fail} failed`);process.exit(fail?1:0);
})().catch(e=>{console.error(e);process.exit(2)});
