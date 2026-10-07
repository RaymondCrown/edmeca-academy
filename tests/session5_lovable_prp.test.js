/* Session 5 card 9: prototype prompt aligned with the EDMECA PRP Metaprompt (Live Landing Page Edition).
   Run:  npm i -D playwright   then   node session5_lovable_prp.test.js /absolute/path/to/DigitalLeaderApp
   Uses the installed Chrome (channel 'chrome'); set PW_CHANNEL= to use Playwright's own Chromium instead. */
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const root=path.resolve(process.argv[2]||'DigitalLeaderApp');
let pass=0,fail=0;const ok=(c,m)=>{if(c){pass++;console.log('  ok   '+m)}else{fail++;console.log('  FAIL '+m)}};
const srv=http.createServer((q,r)=>{const u=q.url.split('?')[0];const f=path.join(root,u==='/'?'index.html':u);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':f.endsWith('.html')?'text/html':'application/octet-stream'});r.end(b)})});
(async()=>{
	await new Promise(r=>srv.listen(8769,r));
	const browser=await chromium.launch(process.env.PW_CHANNEL===''?{}:{channel:process.env.PW_CHANNEL||'chrome'});
	const page=await browser.newPage();const errors=[],posts=[];
	page.on('pageerror',e=>errors.push(String(e)));page.on('dialog',d=>d.accept());
	await page.route('**/api/bridge**',async r=>{const q=r.request();if(q.method()==='POST'){try{posts.push(JSON.parse(q.postData()))}catch(_){}}await r.fulfill({status:200,contentType:'application/json',body:'{"ok":true,"found":false}'})});
	await page.goto('http://localhost:8769/');
	const ev=f=>page.evaluate(f);
	await ev(()=>{state.name='Test Participant';state.business='Kgotso Test';selectSession(5)});
	await page.waitForTimeout(200);

	console.log('Prompt carries cards 1 to 8');
	await ev(()=>{const d=dt(),x=dtExampleState();Object.assign(d,x);d.proto={headline:'',reaction:'',change:'',offer:'',action:'',whatsapp:'',proof:['','',''],link:''};d.seeded=['customer','job','barrier'];goS5View(2)});
	await page.waitForTimeout(150);
	let pr=await ev(()=>dtProtoPrompt());
	const has=(s,m)=>ok(pr.includes(s),m);
	has('Business: Kgotso Test','business');
	has('Segment: Facilities managers of managed office parks','segment');
	has('Thabo, 41 years old, Facilities manager','persona with age and role');
	has('never put this name on the page)','persona name kept off the page');
	has('Challenges: Twelve sites','challenges');has('Pain points, in their words: "I hear about','pains');has('Needs: Know about a fault','needs');
	has('What they use instead of us today: Whoever is free','what they hire instead');
	has('- Functional: When a tenant reports a fault','functional job');has('- Emotional: When summer starts','emotional job');has('- Social: When I report to the landlord','social job');
	has('Problem statement: Facilities managers like Thabo struggle to','problem statement');
	has('Chosen How Might We: How might we help facilities managers find a fault','chosen HMW');
	has('We address it by offering a monthly maintenance contract','winning idea');
	has('Ideas we circled in SCAMPER: Replace it: Replace call-out billing','circled SCAMPER ideas');

	console.log('Questions 5 to 7');
	ok(await ev(()=>dt().proto.offer==='We help facilities managers like Thabo to keep tenants comfortable and leases renewing without '),'offer started once from the problem statement, ending at "without"');
	ok(await page.locator('text=We started your offer from your problem statement').count()===1,'note shown');
	pr=await ev(()=>dtProtoPrompt());
	ok(pr.includes('first ask me only about the offer, the customer action and the proof, one question at a time'),'an unfinished offer counts as blank; Claude asks only for what is blank');
	ok(pr.includes('5. The offer, in 10 seconds: (not filled in)'),'unfinished offer not passed to Claude');
	ok(await ev(()=>dtMissing(2).join().includes('finished after "without"')),'unfinished offer flagged in the pill');
	await ev(()=>dtSet('proto.offer',dt().proto.offer+'waiting for the plant to break.'));
	pr=await ev(()=>dtProtoPrompt());
	ok(pr.includes('first ask me only about the customer action and the proof, one question at a time'),'a finished offer is no longer asked for');
	ok(pr.includes('WhatsApp number for the button: [TO CONFIRM]'),'blank number becomes [TO CONFIRM]');
	await page.locator('input[name="dtAction"]').nth(2).check();
	await ev(()=>{dtSet('proto.proof.0','Free site check before you sign');dtSet('proto.whatsapp','082 000 0000');dtSet('proto.offer','We help facilities managers keep leases renewing.')});
	pr=await ev(()=>dtProtoPrompt());
	ok(!pr.includes('first ask me only'),'no questions once 5 to 7 are answered');
	ok(pr.includes('6. Customer action: click WhatsApp to book. WhatsApp number for the button: 082 000 0000'),'action and number');
	ok(pr.includes('7. Proof we can show: Free site check before you sign'),'proof');
	ok(pr.includes('5. The offer, in 10 seconds: We help facilities managers keep leases renewing.'),'offer');
	await ev(()=>{dtSet('proto.offer','');goS5View(1);goS5View(2)});
	ok(await ev(()=>dt().proto.offer==='') ,'a cleared offer is not drafted again');
	await ev(()=>dtSet('proto.offer','We help facilities managers keep leases renewing.'));

	console.log('Metaprompt outputs and rules');
	pr=await ev(()=>dtProtoPrompt());
	['LOVABLE PRP (maximum 350 words)','Then write the Lovable PRP below.','10. Fixed first-live-version rules: single-page landing page, no login','"Build a polished, mobile-first single-page landing page','Do not ask clarifying questions."','flag at most one clear inconsistency','write [TO CONFIRM]','"Great future feature. For this first live version, let\'s keep the page focused, useful and launchable."'].forEach(s=>has(s,'carries: '+s.slice(0,60)));
	ok(!/[–—§]/.test(pr),'no em dash, en dash or section symbol');

	console.log('Paste-back and completion');
	await ev(()=>{const d=dt();d.proto.reaction='He would press it';d.proto.change='Add the fee line'});
	ok(await ev(()=>dtMissing(2).join().includes('hero headline')),'headline still required');
	await page.fill('#dtProtoHeadline',pr);
	ok(await page.locator('#dtProtoHeadline + .echo-msg').isVisible(),'pasting the prompt as the headline shows the red message');
	ok(await ev(()=>!dtComplete(2)),'an echoed headline does not complete the step');
	await page.fill('#dtProtoHeadline','Find the fault before your tenants do.');
	ok(await ev(()=>dtComplete(2)),'completes with headline, offer and action; link and proof optional');
	await ev(()=>dtSet('proto.link','kgotso dot lovable'));
	ok(await ev(()=>dtMissing(2).join().includes('https://')),'a malformed link is flagged');
	await ev(()=>dtSet('proto.link','https://kgotso-test.lovable.app'));
	ok(await ev(()=>dtComplete(2)),'a proper link is accepted');
	await ev(()=>dtSet('proto.action',''));
	ok(await ev(()=>dtMissing(2).join().includes('one action')),'action required');
	await ev(()=>dtSet('proto.action','book'));

	console.log('Sheet rows and reload');
	posts.length=0;await ev(()=>postS5dt('s5dt'));
	const rows=(posts.find(p=>p.exercise==='s5dt')||{data:{dtRows:[]}}).data.dtRows.filter(r=>r.phase==='Prototype').map(r=>r.field+'='+r.value);
	ok(rows.includes('Offer=We help facilities managers keep leases renewing.')&&rows.includes('Customer action=WhatsApp to book')&&rows.includes('Proof 1=Free site check before you sign')&&rows.includes('Live page link=https://kgotso-test.lovable.app'),'Prototype rows carry offer, action, proof and link');
	ok(await ev(()=>{const m=mergeDt(JSON.parse(JSON.stringify(dt())));return m.proto.action==='book'&&m.proto.proof[0]==='Free site check before you sign'&&m.proto.link.startsWith('https')}),'new fields survive a reload');
	ok(await ev(()=>{const m=mergeDt({proto:{headline:'x',action:'bogus'}});return m.proto.action===''&&m.proto.proof.length===3&&m.proto.offer===''}),'old saves open; an unknown action is dropped');
	await ev(()=>s5LoadSample());await page.waitForTimeout(100);
	ok(await ev(()=>dt().proto.action==='book'&&dtComplete(2)),'Example fills card 9 too');
	ok(errors.length===0,'no page errors'+(errors.length?': '+errors.join(' | '):''));
	await browser.close();srv.close();
	console.log(`\n${pass} passed, ${fail} failed`);process.exit(fail?1:0);
})().catch(e=>{console.error(e);process.exit(2)});
