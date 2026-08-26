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
  S2_Pilot: ['Timestamp','Name','Business','Process','Intervention','Tool','Owner','BaselineMinutes','NextStep','NextStepDate']
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
    }

    return json({ ok: true });
  } catch (error) {
    return json({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}
