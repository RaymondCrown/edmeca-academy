var TABS = {
  State: ['Key','Name','Business','UpdatedAt','StateJSON','StateJSON2','StateJSON3','StateJSON4','StateJSON5','StateJSON6','StateJSON7','StateJSON8'],
  Participants: ['Timestamp','Name','Business','Event'],
  Submissions: ['Timestamp','Name','Business'],
  S1_Ex1_Snapshot: ['Timestamp','Name','Business','WhereTimeGoes','TenExtraHours','CompetitorEdge'],
  S1_Ex2_Prompt: ['Timestamp','Name','Business','Role','Task','Context','Requirements','Reasoning','Boundaries','AssembledPrompt','RatingOutOf10','IterationNotes'],
  S1_Ex3_Ideas: ['Timestamp','SaveId','Name','Business','Idea','Area','Impact','Effort','Quadrant','Priority'],
  S1_Ex3_Map: ['Timestamp','SaveId','Name','Business','IdeaCount','PriorityCount','TopIdeas','PartnerNotes'],
  S2_Priorities: ['Timestamp','Name','Business','SelectedIdeas','Rationale'],
  S2_ProcessMaps: ['Timestamp','SaveId','Name','Business','ProcessNumber','ProcessName','Trigger','StepNumber','StepText','Friction'],
  S2_Redesign: ['Timestamp','Name','Business','ChosenProcess','StepNumber','StepText','LadderAction','Split'],
  S2_SOP: ['Timestamp','Name','Business','ChosenProcess','SOPPrompt','SOPText'],
  S2_Baseline: ['Timestamp','Name','Business','ChosenProcess','BeforeMinutes','AfterMinutes','SavedMinutes'],
  S2_Checklist: ['Timestamp','Name','Business','AdoptedItems'],
  S2_Pilot: ['Timestamp','Name','Business','Process','Intervention','Tool','Owner','BaselineMinutes','NextStep','NextStepDate'],
  S3_GTM: ['Timestamp','Name','Business','WhoYouServe','KnownFor','WhereTheyFindYou'],
  S3_Opportunities: ['Timestamp','SaveId','Name','Business','OpportunityNumber','Opportunity','BuyerType','CloseDate','Winnability','Value','Deliverability','TotalOutOf15','Chosen'],
  S3_Evidence: ['Timestamp','SaveId','Name','Business','RowNumber','Client','Scope','JobValue','JobDate','Outcome'],
  S3_Sort: ['Timestamp','Name','Business','SortDecisions','CorrectOutOf12'],
  S3_Statement: ['Timestamp','Name','Business','Sector','StatementPrompt','StatementText','RubricTicked'],
  S3_Quotation: ['Timestamp','Name','Business','Quote','Role','Task','Context','Requirements','Format','Example','AssembledPrompt','QuoteTemplate','ExampleQuote','ExampleSource'],
  S3_Gaps: ['Timestamp','SaveId','Name','Business','Quote','GapNumber','AskedForNotYetAnswered','WhoSuppliesIt'],
  S3_FollowUp: ['Timestamp','Name','Business','Quote','FollowUpPrompt','FiveMessages'],
  S3_Pipeline: ['Timestamp','SaveId','Name','Business','QuoteNumber','Quote','Stage'],
  S3_Rhythm: ['Timestamp','Name','Business','AdoptedItems'],
  S3_Pilot: ['Timestamp','Name','Business','Quote','Action','Asset','Owner','SendDate','FollowUpDate'],
  S4_Job: ['Timestamp','Name','Business','Sector','JobLine','ClientLabel','QuotedPrice','Duration','Months','Weeks','Status'],
  S4_Costs: ['Timestamp','Name','Business','Layer','Item','Qty','Unit','Rate','Amount','Source','Estimate','FoundInRound'],
  S4_Interview: ['Timestamp','Name','Business','Round','AIAsked','MyAnswer','AddedAsLine','Layer'],
  S4_Price: ['Timestamp','Name','Business','Layer1','Layer2','Layer3','Layer4','Layer5','FullCost','Method','TargetMargin','Price','WalkAway','MarginOnQuoted','BreakEven','QuotedBelowWalkAway','ScenarioAnswer','ScenarioChosen'],
  S4_Cash: ['Timestamp','Name','Business','Deposit','Progress','Final','Terms','MaterialsTiming','CashGap','GapWeek'],
  S4_Pilot: ['Timestamp','Name','Business','Quote','Owner','Date','WhatsApp','FileGenerated','Day7Reply'],
  S5_Canvas: ['Timestamp','Name','Business','Lens','Section','PromptNumber','Answer','SectionsFilled','TotalAnswers','Finalised'],
  S5_Analysis: ['Timestamp','Name','Business','OverallAssessment','Strengths','AreasToDevelop','CoherenceChecks'],
  S5_DesignThinking: ['Timestamp','Name','Business','Phase','Field','Value','EmpathizeDone','DefineDone','IdeateDone'],
  S5_Artefacts: ['Timestamp','Name','Business','ArtefactNumber','Artefact','Credit','Event'],
  S5_Progress: ['Timestamp','Name','Business','EmpathizeDone','DefineDone','IdeatePrototypeDone','InClassStepsOutOf3','CustomerCallsRecordedOutOf3','CanvasSectionsOutOf9','CanvasFinalised'],
  S6_Post: ['Timestamp','Name','Business','Key','M','O','G','I','T','Total','Band','ToolsAdopted','OneChange','RetroM','RetroO','RetroG','RetroI','RetroT','RetroTotal','Event'],
  S6_Journey: ['Key','Name','Business','AugustAnswer','PreM','PreO','PreG','PreI','PreT','PreTotal','PreBand','Artefacts','Notes'],
  S6_Roadmap: ['Timestamp','Name','Business','Key','PriorityNo','Priority','FromArtefactNo','FromArtefact','OwnerRole','Tool','FirstStep','FirstStepDate','Measure','Day30','Day60','Day90','ClaudeQuestions','OneChange','StrangerMonday','StrangerDay30','StrangerDrop','StrangerChange','Event'],
  S6_Toolkit: ['Timestamp','Name','Business','Key','JobNo','Job','Tool','Cost','Choice','Why','Event'],
  S6_Story: ['Timestamp','Name','Business','Key','StorySeed','TopWin','ReplacedSaved','ShowOn27Jan','Consent','Event'],
  S6_Commit: ['Timestamp','Name','Business','Key','FirstStep','FirstStepDate','FirstStepDone','Day30Date','Day30With','Day60Date','Day60With','LetterSent','Event'],
  S6_Artefacts: ['Timestamp','Name','Business','ArtefactNumber','Artefact','Credit','Event'],
  S6_Progress: ['Key','Name','Business','PostDone','PostTotal','PostBand','JourneyExported','RoadmapPriorities','ClaudeQuestionsPasted','StrangerCheckDone','ToolkitDone','StoryDone','Consent','FirstStepDone','ReviewDatesSet','LetterSent','LastSaved'],
  Config: ['Setting','Value']
};

var S5_ARTEFACTS = { 18: 'Refined Value Proposition', 19: 'Business Model Canvas', 20: 'New Service Idea', 21: 'Differentiation Statement' };

var S6_ARTEFACTS = { 22: '90-Day AI Implementation Roadmap', 23: 'Curated AI Toolkit', 24: 'POST-Assessment Score', 25: 'Captured Success Story', 26: 'Accountability Commitment' };

// Session 6: test identities never appear in S6_Progress, the facilitator's one-row-per-participant summary (matched on name or business, case-insensitive).
var S6_TEST_IDENTITIES = ['a', 'b', 'c', 'd', 'dvev', 'test person', 'test co', 'test user', 'sipho', 'testa a', 'abz', 'aq', 'as', 'dfsad', 'hgdyh', 'utfug', 'test kevin', 'zz bridge test', 'test live', 'test dbg', 'raymond crown', 'justin siljeur', 'jerome adonis'];

var S3_SORT_ANSWERS = {
  price: 'yours', claims: 'yours', dates: 'yours', conversation: 'yours',
  method: 'ai', capcv: 'ai', reformat: 'ai', returnables: 'ai',
  naming: 'mech', reminders: 'mech', pipeline: 'mech', covering: 'mech'
};

function sheet(name) {
  var spreadsheet = SpreadsheetApp.getActive();
  var tab = spreadsheet.getSheetByName(name);
  if (!tab) {
    tab = spreadsheet.insertSheet(name);
    tab.appendRow(TABS[name]);
    tab.setFrozenRows(1);
    tab.getRange(1, 1, 1, TABS[name].length).setFontWeight('bold');
    if (name === 'S6_Journey') tab.getRange(1, 12, tab.getMaxRows(), 1).setNumberFormat('@');
    if (name === 'Config') tab.appendRow(['freeze', false]);
  }
  return tab;
}

// Rows are written in blocks: one read, one deleteRows per run of matching rows and one setValues for all new rows,
// instead of a deleteRow and an appendRow per row. The script lock is held for every save, so this keeps the class's saves moving.
function appendRows(tab, rows) {
  if (!rows.length) return;
  var width = rows.reduce(function (w, r) { return Math.max(w, r.length); }, 0);
  var block = rows.map(function (r) { r = r.slice(); while (r.length < width) r.push(''); return r; });
  var start = tab.getLastRow() + 1;
  var short = start + block.length - 1 - tab.getMaxRows();
  if (short > 0) tab.insertRowsAfter(tab.getMaxRows(), short);
  tab.getRange(start, 1, block.length, width).setValues(block);
}

// rowNumbers ascending; contiguous runs go in one deleteRows call each, bottom run first so the numbers above stay valid.
function deleteRowRuns(tab, rowNumbers) {
  if (!rowNumbers.length) return;
  if (tab.getMaxRows() - rowNumbers.length <= tab.getFrozenRows()) tab.insertRowsAfter(tab.getMaxRows(), 1); // a sheet must keep one unfrozen row
  var i = rowNumbers.length - 1;
  while (i >= 0) {
    var end = rowNumbers[i], start = end;
    while (i > 0 && rowNumbers[i - 1] === start - 1) { start--; i--; }
    tab.deleteRows(start, end - start + 1);
    i--;
  }
}

// Data rows (from row 2) whose Name and Business (columns 2 and 3) match, plus any extra test on the row.
function matchingRows(tab, participant, business, test) {
  var last = tab.getLastRow();
  if (last < 2) return { numbers: [], values: [] };
  var values = tab.getRange(2, 1, last - 1, tab.getLastColumn()).getValues();
  var key = keyFor(participant, business);
  var numbers = [], matched = [];
  values.forEach(function (v, i) {
    if (keyFor(v[1], v[2]) === key && (!test || test(v))) { numbers.push(i + 2); matched.push(v); }
  });
  return { numbers: numbers, values: matched };
}

// Session 4 tabs hold one current record per participant (one row, or one row per line/round), replaced on every save.
// The participant is matched on Name and Business (columns 2 and 3). S4_Pilot keeps the facilitator's Day7Reply across saves.
function upsertRows(name, participant, business, rows) {
  var tab = sheet(name);
  var found = matchingRows(tab, participant, business);
  var day7 = '';
  if (name === 'S4_Pilot') found.values.forEach(function (v) { if (v[8]) day7 = v[8]; });
  deleteRowRuns(tab, found.numbers);
  if (day7) rows.forEach(function (row) { row[8] = day7; });
  appendRows(tab, rows);
}

// Tabs that keep every save (Sessions 1 to 3) collect a list's rows here and add them in one block.
function appendAll(name, rows) {
  appendRows(sheet(name), rows);
}

function writeDesignThinking(data, name, business, timestamp) {
  var rows = (data.dtRows || []).map(function (r) {
    return [timestamp, name, business, r.phase || '', r.field || '', r.value || '', data.empathize ? 'YES' : '', data.define ? 'YES' : '', data.ideate ? 'YES' : ''];
  });
  if (!rows.length) rows.push([timestamp, name, business, '', '', '', '', '', '']);
  upsertRows('S5_DesignThinking', name, business, rows);
}

// S5_Artefacts: one row per participant and artefact number, replaced when that artefact is saved again (credit 1 = complete, 0.5 = started).
// 20 arrives on s5dt once Ideate & Prototype is complete; 18, 19, 20 and 21 arrive on s5submit and on every later canvas save while the canvas stays finalised.
function writeArtefacts(data, name, business, timestamp, event, tabName, names) {
  var tab = sheet(tabName || 'S5_Artefacts');
  names = names || S5_ARTEFACTS;
  var credits = data.artefacts || {};
  var numbers = Object.keys(credits);
  if (!numbers.length) return;
  deleteRowRuns(tab, matchingRows(tab, name, business, function (v) { return numbers.indexOf(String(v[3])) !== -1; }).numbers);
  appendRows(tab, numbers.map(function (number) {
    return [timestamp, name, business, Number(number), names[number] || '', credits[number], event];
  }));
}

// S5_Progress: the facilitator's one-row-per-participant check on in-class steps, customer calls (due 16 October) and the canvas (due 22 October).
function writeProgress(data, name, business, timestamp) {
  var p = data.progress || {};
  upsertRows('S5_Progress', name, business, [[timestamp, name, business, p.empathize ? 'YES' : '', p.define ? 'YES' : '', p.ideate ? 'YES' : '', p.inClass || 0, p.calls || 0, p.sections || 0, p.finalised ? 'YES' : '']]);
}

// Session 6 · AI Roadmap. Every S6 tab except S6_Post holds one current record per participant, replaced on every save.
// S6_Post keeps every submission (the latest counts). Key is the lowercased "name|business".
function yes(v) { return v ? 'YES' : ''; }

function writeSession6(exercise, data, name, business, timestamp) {
  var key = keyFor(name, business);
  if (exercise === 's6post') {
    var a = data.answers || {}, r = data.retro || {};
    var dims = ['M', 'O', 'G', 'I', 'T'];
    appendRows(sheet('S6_Post'), [[timestamp, name, business, key].concat(dims.map(function (k) { return a[k] || ''; }), [data.total || '', data.band || '', data.tools || '', data.oneChange || ''], dims.map(function (k) { return r[k] || ''; }), [data.retroTotal || '', exercise])]);
  } else if (exercise === 's6roadmap') {
    var st = data.stranger || {};
    upsertRows('S6_Roadmap', name, business, (data.rows || []).map(function (row, i) {
      var first = i === 0; // the Claude questions, the change and the stranger check (about priority 1) sit on the priority 1 row
      return [timestamp, name, business, key, row.no || i + 1, row.priority || '', row.fromNo || '', row.from || '', row.owner || '', row.tool || '', row.step || '', row.date || '', row.measure || '', row.d30 || '', row.d60 || '', row.d90 || '',
        first ? data.claudeQ || '' : '', first ? data.change || '' : '', first ? st.monday || '' : '', first ? st.day30 || '' : '', first ? st.drop || '' : '', first ? st.change || '' : '', exercise];
    }));
  } else if (exercise === 's6toolkit') {
    upsertRows('S6_Toolkit', name, business, (data.rows || []).map(function (row, i) {
      return [timestamp, name, business, key, row.no || i + 1, row.job || '', row.tool || '', row.cost || '', row.choice || '', row.why || '', exercise];
    }));
  } else if (exercise === 's6story') {
    upsertRows('S6_Story', name, business, [[timestamp, name, business, key, data.storySeed || '', data.topWin || '', data.replaced || '', data.show27 || '', data.consent || '', exercise]]);
  } else if (exercise === 's6commit') {
    upsertRows('S6_Commit', name, business, [[timestamp, name, business, key, data.firstStep || '', data.firstStepDate || '', yes(data.done), data.d30 || '', data.d30With || '', data.d60 || '', data.d60With || '', yes(data.letter), exercise]]);
  } else {
    return;
  }
  if (data.artefacts) writeArtefacts(data, name, business, timestamp, exercise, 'S6_Artefacts', S6_ARTEFACTS);
  if (data.progress && !isTestIdentity(name, business)) writeS6Progress(data.progress, name, business, timestamp);
}

// S6_Progress: flags come from the participant's content (the app derives them on every save), never from a button.
function writeS6Progress(p, name, business, timestamp) {
  upsertRows('S6_Progress', name, business, [[keyFor(name, business), name, business, yes(p.postDone), p.postTotal || '', p.postBand || '', yes(p.journeyExported), p.roadmapPriorities || 0,
    yes(p.claudeQuestionsPasted), yes(p.strangerCheckDone), yes(p.toolkitDone), yes(p.storyDone), p.consent || '', yes(p.firstStepDone), yes(p.reviewDatesSet), yes(p.letterSent), timestamp]]);
}

function isTestIdentity(name, business) {
  return S6_TEST_IDENTITIES.indexOf(String(name).trim().toLowerCase()) !== -1 || S6_TEST_IDENTITIES.indexOf(String(business).trim().toLowerCase()) !== -1;
}

// S6_Journey is prepared by the facilitator (one row per Key). The participant gets their own row only, without Notes.
function readJourney(name, business) {
  var values = sheet('S6_Journey').getDataRange().getDisplayValues();
  var key = keyFor(name, business);
  for (var i = values.length - 1; i >= 1; i--) {
    if (String(values[i][0]).trim().toLowerCase() === key) {
      var row = {};
      TABS.S6_Journey.forEach(function (h, j) { if (h !== 'Notes') row[h] = values[i][j] == null ? '' : String(values[i][j]); });
      return row;
    }
  }
  return null;
}

// Config!freeze: TRUE makes the workbook read-only (the facilitator sets it on Friday 30 October). Every write is refused.
function isFrozen() {
  var values = sheet('Config').getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]).trim().toLowerCase() === 'freeze') return values[i][1] === true || String(values[i][1]).trim().toUpperCase() === 'TRUE';
  }
  return false;
}

// State: a Google Sheets cell holds at most 50,000 characters, so the state JSON is split across StateJSON to StateJSON8
// (45,000 characters each, 360,000 in all) and joined again on load. Before this, a participant whose state passed
// 50,000 characters had every save rejected, exercise rows included.
var STATE_CHUNK = 45000;
var STATE_CHUNKS = 8;

function writeState(name, business, timestamp, state) {
  var stateSheet = sheet('State');
  var header = stateSheet.getRange(1, 1, 1, TABS.State.length);
  if (header.getValues()[0].join('|') !== TABS.State.join('|')) header.setValues([TABS.State]).setFontWeight('bold');
  var text = JSON.stringify(state);
  if (text.length > STATE_CHUNK * STATE_CHUNKS) throw new Error('state is ' + text.length + ' characters, over the ' + (STATE_CHUNK * STATE_CHUNKS) + ' limit');
  var chunks = [];
  for (var c = 0; c < STATE_CHUNKS; c++) chunks.push(text.slice(c * STATE_CHUNK, (c + 1) * STATE_CHUNK));
  var key = keyFor(name, business);
  var keys = stateSheet.getRange(1, 1, stateSheet.getLastRow(), 1).getValues();
  var row = -1;
  for (var i = 1; i < keys.length; i++) if (keys[i][0] === key) row = i + 1;
  var stateValues = [[key, name, business, timestamp].concat(chunks)];
  if (row === -1) row = stateSheet.getLastRow() + 1;
  stateSheet.getRange(row, 1, 1, TABS.State.length).setValues(stateValues);
}

function readState(row) {
  return JSON.parse(row.slice(4, 4 + STATE_CHUNKS).join('') || '{}');
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function keyFor(name, business) {
  return (String(name).trim() + '|' + String(business).trim()).toLowerCase();
}

function doGet(event) {
  var params = event.parameter || {};
  if (params.action === 'journey') {
    var journey = readJourney(params.name || '', params.business || '');
    return json({ ok: true, found: !!journey, journey: journey, freeze: isFrozen() });
  }
  if (params.action !== 'load') return json({ ok: true, ping: 'EDMECA bridge alive' });
  var values = sheet('State').getDataRange().getValues();
  var key = keyFor(params.name || '', params.business || '');
  for (var i = values.length - 1; i >= 1; i--) {
    if (values[i][0] === key) return json({ ok: true, found: true, state: readState(values[i]), freeze: isFrozen() });
  }
  return json({ ok: true, found: false, freeze: isFrozen() });
}

function doPost(event) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var body = JSON.parse(event.postData.contents);
    var name = String(body.name || '').trim();
    var business = String(body.business || '').trim();
    if (!name || !business) return json({ ok: false, error: 'missing name or business' });
    if (isFrozen()) return json({ ok: false, readOnly: true, error: 'read-only' });
    var timestamp = new Date();
    var exercise = body.exercise;
    var data = body.data || {};

    if (exercise === 'signin' || exercise === 'submit') {
      sheet('Participants').appendRow([timestamp, name, business, exercise]);
      if (exercise === 'submit') sheet('Submissions').appendRow([timestamp, name, business]);

    // Session 1
    } else if (exercise === 'e1') {
      sheet('S1_Ex1_Snapshot').appendRow([timestamp, name, business, data.q1 || '', data.q2 || '', data.q3 || '']);
    } else if (exercise === 'e2') {
      sheet('S1_Ex2_Prompt').appendRow([timestamp, name, business, data.role || '', data.task || '', data.context || '', data.requirements || '', data.reasoning || '', data.boundaries || '', data.prompt || '', data.rating || '', data.notes || '']);
    } else if (exercise === 'e3') {
      var saveId = Utilities.getUuid().slice(0, 8);
      var ideas = data.ideas || [];
      var ideasSheet = [];
      ideas.forEach(function (idea) {
        ideasSheet.push([timestamp, saveId, name, business, idea.text || idea.txt || '', idea.area || '', idea.impact || idea.imp || '', idea.effort || idea.eff || '', idea.quadrant || '', idea.priority || idea.top ? 'YES' : '']);
      });
      appendAll('S1_Ex3_Ideas', ideasSheet);
      var topIdeas = ideas.filter(function (idea) { return idea.priority || idea.top; }).map(function (idea) { return idea.text || idea.txt || ''; }).join(' | ');
      sheet('S1_Ex3_Map').appendRow([timestamp, saveId, name, business, ideas.length, ideas.filter(function (idea) { return idea.priority || idea.top; }).length, topIdeas, data.partnerNotes || data.notes || '']);

    // Session 2
    } else if (exercise === 's2_priorities') {
      sheet('S2_Priorities').appendRow([timestamp, name, business, JSON.stringify(data.priorities || []), data.notes || '']);
    } else if (exercise === 's2_processmap') {
      var pmSaveId = Utilities.getUuid().slice(0, 8);
      var pmSheet = [];
      (data.processes || []).forEach(function (proc, pIndex) {
        (proc.steps || []).forEach(function (step, sIndex) {
          pmSheet.push([timestamp, pmSaveId, name, business, pIndex + 1, proc.name || '', proc.trigger || '', sIndex + 1, step.text || '', step.friction || '']);
        });
      });
      appendAll('S2_ProcessMaps', pmSheet);
    } else if (exercise === 's2_redesign') {
      var rSheet = [];
      (data.steps || []).forEach(function (step, sIndex) {
        rSheet.push([timestamp, name, business, data.chosenProcess || '', sIndex + 1, step.text || '', step.action || '', step.split || '']);
      });
      appendAll('S2_Redesign', rSheet);
    } else if (exercise === 's2_sop') {
      sheet('S2_SOP').appendRow([timestamp, name, business, data.chosenProcess || '', data.sopPrompt || '', data.sopText || '']);
    } else if (exercise === 's2_baseline') {
      var before = Number(data.before) || 0;
      var after = Number(data.after) || 0;
      sheet('S2_Baseline').appendRow([timestamp, name, business, data.chosenProcess || '', before, after, Math.max(before - after, 0)]);
    } else if (exercise === 's2_checklist') {
      sheet('S2_Checklist').appendRow([timestamp, name, business, JSON.stringify(data.checklist || {})]);
    } else if (exercise === 's2_pilot') {
      sheet('S2_Pilot').appendRow([timestamp, name, business, data.process || '', data.intervention || '', data.tool || '', data.owner || '', data.baseline || '', data.nextStep || '', data.nextStepDate || '']);

    // Session 3
    } else if (exercise === 's3_gtm') {
      sheet('S3_GTM').appendRow([timestamp, name, business, data.who || '', data.knownFor || '', data.where || '']);
    } else if (exercise === 's3_opportunities') {
      var oppSaveId = Utilities.getUuid().slice(0, 8);
      var oppSheet = [];
      (data.opportunities || []).forEach(function (opp, index) {
        var total = (Number(opp.win) || 0) + (Number(opp.value) || 0) + (Number(opp.deliver) || 0);
        oppSheet.push([timestamp, oppSaveId, name, business, index + 1, opp.name || '', opp.buyerType || '', opp.date || '', opp.win || '', opp.value || '', opp.deliver || '', total, opp.name && opp.name === data.chosen ? 'YES' : '']);
      });
      appendAll('S3_Opportunities', oppSheet);
    } else if (exercise === 's3_evidence') {
      var evSaveId = Utilities.getUuid().slice(0, 8);
      var evSheet = [];
      (data.evidence || []).forEach(function (row, index) {
        evSheet.push([timestamp, evSaveId, name, business, index + 1, row.client || '', row.scope || '', row.value || '', row.date || '', row.outcome || '']);
      });
      appendAll('S3_Evidence', evSheet);
    } else if (exercise === 's3_sort') {
      var sort = data.sort || {};
      var correct = 0;
      Object.keys(S3_SORT_ANSWERS).forEach(function (key) { if (sort[key] === S3_SORT_ANSWERS[key]) correct++; });
      sheet('S3_Sort').appendRow([timestamp, name, business, JSON.stringify(sort), correct]);
    } else if (exercise === 's3_statement') {
      var rubric = data.rubric || {};
      var ticked = Object.keys(rubric).filter(function (key) { return rubric[key]; }).join(' | ');
      sheet('S3_Statement').appendRow([timestamp, name, business, data.sector || '', data.prompt || '', data.text || '', ticked]);
    } else if (exercise === 's3_quotation') {
      var blocks = data.blocks || {};
      sheet('S3_Quotation').appendRow([timestamp, name, business, data.opportunity || '', blocks.role || '', blocks.task || '', blocks.context || '', blocks.requirements || '', blocks.format || '', blocks.example || '', data.prompt || '', data.text || '', data.exampleText || '', data.exampleSource || '']);
    } else if (exercise === 's3_gaps') {
      var gapSaveId = Utilities.getUuid().slice(0, 8);
      var gapSheet = [];
      (data.gaps || []).forEach(function (gap, index) {
        gapSheet.push([timestamp, gapSaveId, name, business, data.opportunity || '', index + 1, gap.missing || '', gap.who || '']);
      });
      appendAll('S3_Gaps', gapSheet);
    } else if (exercise === 's3_followup') {
      sheet('S3_FollowUp').appendRow([timestamp, name, business, data.opportunity || '', data.prompt || '', data.text || '']);
    } else if (exercise === 's3_pipeline') {
      var pipeSaveId = Utilities.getUuid().slice(0, 8);
      var pipeSheet = [];
      (data.opportunities || []).forEach(function (opp, index) {
        pipeSheet.push([timestamp, pipeSaveId, name, business, index + 1, opp.name || '', opp.stage || '']);
      });
      appendAll('S3_Pipeline', pipeSheet);
    } else if (exercise === 's3_rhythm') {
      sheet('S3_Rhythm').appendRow([timestamp, name, business, JSON.stringify(data.rhythm || {})]);
    } else if (exercise === 's3_pilot') {
      sheet('S3_Pilot').appendRow([timestamp, name, business, data.opportunity || '', data.action || '', data.asset || '', data.owner || '', data.date || '', data.followUp || '']);

    // Session 4 (amounts are stored for EDMECA's programme reporting; nothing is reported to Property Point at rand level)
    } else if (exercise === 's4c1') {
      upsertRows('S4_Job', name, business, [[timestamp, name, business, data.sector || '', data.line || '', data.client || '', data.quoted || '', data.duration || '', data.months || '', data.weeks || '', data.status || '']]);
    } else if (exercise === 's4c2') {
      upsertRows('S4_Costs', name, business, (data.lines || []).map(function (line) {
        return [timestamp, name, business, line.layer || '', line.item || '', line.qty || '', line.unit || '', line.rate || '', line.amount || '', line.source || '', line.estimate ? 'YES' : '', line.round || ''];
      }));
    } else if (exercise === 's4c3') {
      upsertRows('S4_Interview', name, business, (data.rounds || []).map(function (round) {
        return [timestamp, name, business, round.round || '', round.asked || '', round.answer || '', round.added || 'N', round.layer || ''];
      }));
    } else if (exercise === 's4c4') {
      var layers = data.layers || [];
      upsertRows('S4_Price', name, business, [[timestamp, name, business, layers[0] || 0, layers[1] || 0, layers[2] || 0, layers[3] || 0, layers[4] || 0, data.fullCost || 0, data.method || 'A', data.targetMargin || 0, data.price || 0, data.walkAway || 0, data.marginOnQuoted === '' ? '' : data.marginOnQuoted, data.breakEven === '' ? '' : data.breakEven, data.belowWalkAway || 'N', data.scenarioAnswer || '', data.scenarioChosen || '']]);
    } else if (exercise === 's4c5') {
      upsertRows('S4_Cash', name, business, [[timestamp, name, business, data.deposit || 0, data.progress || 0, data.final || 0, data.terms || 0, data.materials || '', data.cashGap || 0, data.gapWeek || 0]]);
    } else if (exercise === 's4c6' || exercise === 's4file') {
      upsertRows('S4_Pilot', name, business, [[timestamp, name, business, data.quote || '', data.owner || '', data.date || '', data.whatsapp || '', data.fileGenerated || '', '']]);
    } else if (exercise === 's4submit') {
      sheet('Participants').appendRow([timestamp, name, business, 's4submit']);

    // Session 5 · Business Model Canvas: one row per answered prompt, replaced on every save (an empty block gets one blank row so it still shows).
    // Answers are positional — PromptNumber is the sentence starter (1 to 3) the answer sits under in the workbook.
    // Session 5 · Design Thinking (in class, before the canvas): one row per answered field, replaced on every save.
    // The workbook flattens the fields into dtRows ({phase, field, value}); s5submit carries them too when the canvas is finalised.
    } else if (exercise === 's5dt') {
      writeDesignThinking(data, name, business, timestamp);
    } else if (exercise === 's5canvas' || exercise === 's5submit' || exercise === 's5analysis') {
      var canvas = data.canvas || {};
      var sections = [
        ['Desirability', 'customerSegments', '1. Customer Segments'], ['Desirability', 'valuePropositions', '2. Value Propositions'],
        ['Desirability', 'channels', '3. Channels'], ['Desirability', 'customerRelationships', '4. Customer Relationships'],
        ['Viability', 'costStructure', '9. Cost Structure'], ['Viability', 'revenueStreams', '5. Revenue Streams'],
        ['Feasibility', 'keyActivities', '7. Key Activities'], ['Feasibility', 'keyResources', '6. Key Resources'], ['Feasibility', 'keyPartnerships', '8. Key Partnerships']
      ];
      var finalised = exercise === 's5submit' || data.finalised ? 'YES' : ''; // a later canvas save keeps YES while the canvas is still finalised
      var canvasRows = [];
      sections.forEach(function (section) {
        var items = canvas[section[1]] || [];
        var answered = 0;
        items.forEach(function (item, index) {
          if (!String(item || '').trim()) return;
          answered++;
          canvasRows.push([timestamp, name, business, section[0], section[2], index + 1, item, data.filled || 0, data.items || 0, finalised]);
        });
        if (!answered) canvasRows.push([timestamp, name, business, section[0], section[2], '', '', data.filled || 0, data.items || 0, finalised]);
      });
      upsertRows('S5_Canvas', name, business, canvasRows);
      var analysis = data.analysis;
      if (analysis && typeof analysis.overallAssessment === 'string') {
        upsertRows('S5_Analysis', name, business, [[timestamp, name, business, analysis.overallAssessment, (analysis.strengths || []).join('\n'), (analysis.areasToImprove || []).join('\n'), (analysis.coherenceChecks || []).join('\n')]]);
      }
      if (exercise === 's5submit' && data.dtRows && data.dtRows.length) writeDesignThinking(data, name, business, timestamp);
      if (exercise === 's5submit') sheet('Participants').appendRow([timestamp, name, business, 's5submit']);
    }

    // Session 6 · AI Roadmap
    if (String(exercise || '').indexOf('s6') === 0) writeSession6(exercise, data, name, business, timestamp);

    // Session 5 facilitator evidence, written alongside whichever s5 event arrived
    if (String(exercise || '').indexOf('s5') === 0) {
      if (data.progress) writeProgress(data, name, business, timestamp);
      if (data.artefacts) writeArtefacts(data, name, business, timestamp, exercise);
    }

    // State last and on its own, so a state failure never costs the exercise rows above.
    if (body.state) {
      try {
        writeState(name, business, timestamp, body.state);
      } catch (stateError) {
        return json({ ok: false, error: 'state not saved: ' + String(stateError) });
      }
    }

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}
