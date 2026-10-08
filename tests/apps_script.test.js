/* Apps Script bridge against a mocked spreadsheet: block writes, Day7Reply kept, state split across cells, rows written even when state fails.
   Run:  node apps_script.test.js /absolute/path/to/DigitalLeaderApp   (no browser needed) */
const fs=require('fs'),path=require('path');const src=fs.readFileSync(path.join(path.resolve(process.argv[2]||'DigitalLeaderApp'),'EDMECA_Bridge_AppsScript.gs'),'utf8');let calls=0;
let pass=0,fail=0;const ok=(c,m)=>{if(c){pass++;console.log('  ok   '+m)}else{fail++;console.log('  FAIL '+m)}};
function Tab(){this.rows=[];this.max=1000;this.frozen=0}
Tab.prototype={appendRow(r){calls++;this.rows.push(r.slice())},setFrozenRows(n){this.frozen=n},getLastRow(){return this.rows.length},getMaxRows(){return Math.max(this.max,this.rows.length)},getFrozenRows(){return this.frozen},
 getLastColumn(){return this.rows.reduce((w,r)=>Math.max(w,r.length),0)},insertRowsAfter(a,n){calls++;this.max+=n},
 deleteRow(i){calls++;this.rows.splice(i-1,1);this.max--},deleteRows(s,n){calls++;this.rows.splice(s-1,n);this.max-=n},
 getDataRange(){calls++;const t=this;return{getValues:()=>t.rows.map(r=>r.slice())}},
 getRange(r,c,nr,nc){const t=this;nr=nr||1;nc=nc||1;return{setFontWeight(){return this},
  getValues:()=>{calls++;const o=[];for(let i=0;i<nr;i++){o.push([]);for(let j=0;j<nc;j++)o[i].push((t.rows[r-1+i]||[])[c-1+j]??'')}return o},
  setValues(v){calls++;v.forEach(row=>row.forEach(x=>{if(typeof x==='string'&&x.length>50000)throw new Error('more than 50000 characters in a single cell')}));if(r-1+v.length>t.getMaxRows())throw new Error('out of bounds');v.forEach((row,i)=>{t.rows[r-1+i]=t.rows[r-1+i]||[];row.forEach((x,j)=>{t.rows[r-1+i][c-1+j]=x})});return this}}}};
const tabs={};const SpreadsheetApp={getActive:()=>({getSheetByName:n=>tabs[n],insertSheet:n=>(tabs[n]=new Tab())})};
const ContentService={createTextOutput:t=>({setMimeType(){return JSON.parse(t)}}),MimeType:{JSON:1}};
const f=new Function('SpreadsheetApp','ContentService','LockService','Utilities',src+';return{doPost,doGet}')(SpreadsheetApp,ContentService,{getScriptLock:()=>({waitLock(){},releaseLock(){}})},{getUuid:()=>'abcdef12'});
const post=b=>f.doPost({postData:{contents:JSON.stringify(b)}});
const dt=(who,n,tag)=>post({name:who,business:'Co',exercise:'s5dt',data:{dtRows:Array.from({length:n},(_,i)=>({phase:'E',field:'f'+i,value:tag+i})),progress:{empathize:true},artefacts:{20:1}}});
console.log('Block writes');
dt('Gina',30,'g');dt('Andre',29,'a');calls=0;
ok(dt('Gina',30,'G').ok&&calls<=12,'30-row re-save in '+calls+' sheet calls');
const T=tabs.S5_DesignThinking.rows;
ok(T.filter(r=>r[1]==='Gina').length===30&&T.filter(r=>r[1]==='Gina').every(r=>r[5][0]==='G'),'re-save replaces all 30 rows');
ok(T.filter(r=>r[1]==='Andre').length===29,'other participant untouched');
ok(tabs.S5_Progress.rows.length-1===2&&tabs.S5_Artefacts.rows.length-1===2,'one progress row and one artefact row each');
calls=0;post({name:'Kev',business:'Co',exercise:'s2_processmap',data:{processes:[{name:'Q',steps:Array.from({length:12},(_,i)=>({text:'s'+i}))}]}});
ok(tabs.S2_ProcessMaps.rows.length-1===12&&calls<=3,'12-step process map in '+calls+' sheet calls');
post({name:'Jo',business:'Co',exercise:'s4c6',data:{quote:'Q1'}});tabs.S4_Pilot.rows[1][8]='replied';post({name:'Jo',business:'Co',exercise:'s4c6',data:{quote:'Q2'}});
ok(JSON.stringify(tabs.S4_Pilot.rows.slice(1).map(r=>[r[3],r[8]]))==='[["Q2","replied"]]','S4_Pilot keeps the Day7Reply');
const t=new Tab();tabs.S5_Progress=t;t.appendRow(['h']);t.setFrozenRows(1);t.max=2;t.appendRow(['x','Solo','Co']);
ok(post({name:'Solo',business:'Co',exercise:'s5dt',data:{dtRows:[],progress:{}}}).ok&&t.rows.length-1===1,'replacing the only data row on a full sheet works');
console.log('State split across cells');
tabs.State=new Tab();tabs.State.appendRow(['Key','Name','Business','UpdatedAt','StateJSON']);
ok(post({name:'Jodi',business:'NC',exercise:'s3_gtm',data:{who:'x'},state:{n:'x'.repeat(120000)}}).ok,'120,000-character state saved');
ok(tabs.State.rows[0].length===12&&tabs.State.rows[1].slice(4).every(c=>c.length<=45000),'header widened, cells under the limit');
const g=new Function('SpreadsheetApp','ContentService','LockService','Utilities',src+';return doGet')(SpreadsheetApp,ContentService,{},{})({parameter:{action:'load',name:'jodi',business:'nc'}});
ok(g.found&&g.state.n.length===120000,'state joined again on load');
const before=tabs.S3_GTM.rows.length;
const r=post({name:'Caz',business:'NC',exercise:'s3_gtm',data:{who:'y'},state:{n:'y'.repeat(400000)}});
ok(!r.ok&&tabs.S3_GTM.rows.length===before+1,'state over the cap is refused, the exercise row still written');
console.log(`\n${pass} passed, ${fail} failed`);process.exit(fail?1:0);
