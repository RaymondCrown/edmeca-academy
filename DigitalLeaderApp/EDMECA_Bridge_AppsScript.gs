var TABS = {
  State: ['Key','Name','Business','UpdatedAt','StateJSON'],
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
  S4_Pilot: ['Timestamp','Name','Business','Quote','Owner','Date','WhatsApp','FileGenerated','Day7Reply']
};

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
  }
  return tab;
}

// Session 4 tabs hold one current record per participant (one row, or one row per line/round), replaced on every save.
// The participant is matched on Name and Business (columns 2 and 3). S4_Pilot keeps the facilitator's Day7Reply across saves.
function upsertRows(name, participant, business, rows) {
  var tab = sheet(name);
  var values = tab.getDataRange().getValues();
  var key = keyFor(participant, business);
  var kept = {};
  for (var i = values.length - 1; i >= 1; i--) {
    if (keyFor(values[i][1], values[i][2]) === key) {
      if (name === 'S4_Pilot' && values[i][8]) kept.day7 = values[i][8];
      tab.deleteRow(i + 1);
    }
  }
  rows.forEach(function (row) {
    if (name === 'S4_Pilot' && kept.day7) row[8] = kept.day7;
    tab.appendRow(row);
  });
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}

function keyFor(name, business) {
  return (String(name).trim() + '|' + String(business).trim()).toLowerCase();
}

function doGet(event) {
  var params = event.parameter || {};
  if (params.action !== 'load') return json({ ok: true, ping: 'EDMECA bridge alive' });
  var values = sheet('State').getDataRange().getValues();
  var key = keyFor(params.name || '', params.business || '');
  for (var i = values.length - 1; i >= 1; i--) {
    if (values[i][0] === key) return json({ ok: true, found: true, state: JSON.parse(values[i][4] || '{}') });
  }
  return json({ ok: true, found: false });
}

function doPost(event) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var body = JSON.parse(event.postData.contents);
    var name = String(body.name || '').trim();
    var business = String(body.business || '').trim();
    if (!name || !business) return json({ ok: false, error: 'missing name or business' });
    var timestamp = new Date();

    if (body.state) {
      var stateSheet = sheet('State');
      var key = keyFor(name, business);
      var values = stateSheet.getDataRange().getValues();
      var row = -1;
      for (var i = 1; i < values.length; i++) if (values[i][0] === key) row = i + 1;
      var stateValues = [key, name, business, timestamp, JSON.stringify(body.state)];
      if (row === -1) stateSheet.appendRow(stateValues);
      else stateSheet.getRange(row, 1, 1, 5).setValues([stateValues]);
    }

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
      var ideasSheet = sheet('S1_Ex3_Ideas');
      ideas.forEach(function (idea) {
        ideasSheet.appendRow([timestamp, saveId, name, business, idea.text || idea.txt || '', idea.area || '', idea.impact || idea.imp || '', idea.effort || idea.eff || '', idea.quadrant || '', idea.priority || idea.top ? 'YES' : '']);
      });
      var topIdeas = ideas.filter(function (idea) { return idea.priority || idea.top; }).map(function (idea) { return idea.text || idea.txt || ''; }).join(' | ');
      sheet('S1_Ex3_Map').appendRow([timestamp, saveId, name, business, ideas.length, ideas.filter(function (idea) { return idea.priority || idea.top; }).length, topIdeas, data.partnerNotes || data.notes || '']);

    // Session 2
    } else if (exercise === 's2_priorities') {
      sheet('S2_Priorities').appendRow([timestamp, name, business, JSON.stringify(data.priorities || []), data.notes || '']);
    } else if (exercise === 's2_processmap') {
      var pmSaveId = Utilities.getUuid().slice(0, 8);
      var pmSheet = sheet('S2_ProcessMaps');
      (data.processes || []).forEach(function (proc, pIndex) {
        (proc.steps || []).forEach(function (step, sIndex) {
          pmSheet.appendRow([timestamp, pmSaveId, name, business, pIndex + 1, proc.name || '', proc.trigger || '', sIndex + 1, step.text || '', step.friction || '']);
        });
      });
    } else if (exercise === 's2_redesign') {
      var rSheet = sheet('S2_Redesign');
      (data.steps || []).forEach(function (step, sIndex) {
        rSheet.appendRow([timestamp, name, business, data.chosenProcess || '', sIndex + 1, step.text || '', step.action || '', step.split || '']);
      });
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
      var oppSheet = sheet('S3_Opportunities');
      (data.opportunities || []).forEach(function (opp, index) {
        var total = (Number(opp.win) || 0) + (Number(opp.value) || 0) + (Number(opp.deliver) || 0);
        oppSheet.appendRow([timestamp, oppSaveId, name, business, index + 1, opp.name || '', opp.buyerType || '', opp.date || '', opp.win || '', opp.value || '', opp.deliver || '', total, opp.name && opp.name === data.chosen ? 'YES' : '']);
      });
    } else if (exercise === 's3_evidence') {
      var evSaveId = Utilities.getUuid().slice(0, 8);
      var evSheet = sheet('S3_Evidence');
      (data.evidence || []).forEach(function (row, index) {
        evSheet.appendRow([timestamp, evSaveId, name, business, index + 1, row.client || '', row.scope || '', row.value || '', row.date || '', row.outcome || '']);
      });
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
      var gapSheet = sheet('S3_Gaps');
      (data.gaps || []).forEach(function (gap, index) {
        gapSheet.appendRow([timestamp, gapSaveId, name, business, data.opportunity || '', index + 1, gap.missing || '', gap.who || '']);
      });
    } else if (exercise === 's3_followup') {
      sheet('S3_FollowUp').appendRow([timestamp, name, business, data.opportunity || '', data.prompt || '', data.text || '']);
    } else if (exercise === 's3_pipeline') {
      var pipeSaveId = Utilities.getUuid().slice(0, 8);
      var pipeSheet = sheet('S3_Pipeline');
      (data.opportunities || []).forEach(function (opp, index) {
        pipeSheet.appendRow([timestamp, pipeSaveId, name, business, index + 1, opp.name || '', opp.stage || '']);
      });
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
    }

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}
