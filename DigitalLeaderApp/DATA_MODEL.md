# Digital Leader data model

The Google Sheet is the durable source of truth. The browser should not read the private spreadsheet directly. It calls `/api/bridge`, and the Apps Script web app reads and writes the response sheet.

## Participant identity

A participant is keyed by the normalized combination of `Name` and `Business`. There are no passwords in this workbook.

## Resume flow

1. The participant enters the same name and business.
2. The app calls `/api/bridge?action=load&name=...&business=...`.
3. Apps Script finds the matching row in the `State` tab.
4. Apps Script returns `StateJSON`.
5. The app restores the session state and renders the exercise fields.

The `State` tab is the canonical resume record. The readable exercise tabs are an append-only reporting record.

## State payload

The app stores the current participant state in `StateJSON`.

Session 1:

- Exercise 1 snapshot: `data.q1`, `data.q2`, `data.q3`
- Exercise 2 prompt: `data.task`, `data.context`, `data.role`, `data.requirements`, `data.reasoning`, `data.boundaries`, `data.prompt`, `data.rating`, `data.notes`
- Exercise 3 opportunity map: `ideas[]`, each with `text`, `area`, `impact`, `effort`, and `priority`
- Exercise 3 pressure test: `data.partnerNotes`

Session 2 (matches the facilitator deck: Map Two Processes → Redesign and Standardise → Measure and Make It Stick):

- Priorities: `session2Priorities[]` (indexes into Session 1's `ideas[]`), `session2Notes` (why these three)
- Process maps: `processes[]`, two entries, each `{ name, trigger, steps: [{ text, friction }] }`. `friction` is one of the five kinds from the deck: `repetitive`, `waiting`, `errors`, `bottleneck`, `owner`
- Chosen process: `chosenProcess` (0 or 1, index into `processes[]`)
- Redesign: the chosen process's `steps[]` gain `action` (`eliminate` / `simplify` / `combine` / `keep`, the Eliminate-Simplify-Combine ladder) and `split` (`human` / `ai` / `automated`)
- SOP: `sopPrompt`, built from the chosen process's steps and their Simplify & split decisions (via the "Build prompt" button); `sopText`, the AI-generated SOP the participant pasted back in after running that prompt
- Baseline: `baselineBefore`, `baselineAfter` (minutes)
- Operations checklist: `checklist` (map of item key → adopted boolean), artefact 7
- Pilot: `pilot { process, intervention, tool, owner, baseline, nextStep, nextStepDate }`, the closing commitment artefact

## Adding future sessions

Each new session should add its own state namespace, for example `session3`, and keep its fields inside the same `StateJSON` object. Add a readable reporting tab in Apps Script only when facilitators need spreadsheet columns for that session, and prefix its name with the session number (`S3_...`) so tabs never collide across sessions that reuse the same exercise numbering. This keeps resume data complete while allowing each session to have different exercises.

## Google Sheet reporting tabs

Cross-session (not prefixed — these track the participant across the whole programme):

- `Participants`: sign-in and submission events
- `Submissions`: final submission events
- `State`: one upserted JSON record per participant for cross-device resume

Session 1 (`S1_...`):

- `S1_Ex1_Snapshot`: three leadership snapshot answers
- `S1_Ex2_Prompt`: six prompt blocks, assembled prompt, rating, and iteration notes
- `S1_Ex3_Ideas`: one row per opportunity idea
- `S1_Ex3_Map`: idea count, priority count, selected ideas, and pressure-test notes

Session 2 (`S2_...`):

- `S2_Priorities`: the up-to-three opportunities carried forward, and the rationale
- `S2_ProcessMaps`: one row per step, per process — two processes per save, `ProcessNumber` (1 or 2) and `StepNumber` distinguish them, `Friction` holds the tagged friction kind
- `S2_Redesign`: one row per step of the chosen process, with its Eliminate/Simplify/Combine ladder action and its Human/AI/Automated split
- `S2_SOP`: the built prompt (from the Simplify & split decisions) and the AI-generated SOP text pasted back in for the chosen process
- `S2_Baseline`: before/after/saved minutes for the chosen process
- `S2_Checklist`: which daily/weekly/monthly operations-checklist items the participant committed to
- `S2_Pilot`: the closing six-field pilot commitment — process, intervention, tool, owner, baseline, next step and date

## Note on renaming existing tabs

Apps Script's `sheet()` helper only creates a tab the first time its name is requested — it does not rename an existing tab. If the spreadsheet already has tabs under the old unprefixed names (`Ex1_Snapshot`, `Ex2_Prompt`, `Ex2_ProcessMapping`, `Ex3_Ideas`, `Ex3_Map`, `Ex4_Baseline`), the redeployed script will create fresh `S1_...`/`S2_...` tabs alongside them rather than migrating the old ones. Rename or archive the old tabs by hand in Google Sheets after redeploying.

## Note on Session 1 Exercise 4 (retired)

Session 1 no longer has a fourth exercise — the "Your Baseline, Revealed" profile/score step (Thinker/Builder/Doer, total score, five dimension scores) was removed from the workbook entirely, not just renamed. There is no `S1_Ex4_Baseline` tab; if an old `Ex4_Baseline` tab exists from before, it can be archived.
