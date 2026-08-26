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

The app stores the current participant state in `StateJSON`. Session 1 currently includes:

- Exercise 1 snapshot: `data.q1`, `data.q2`, `data.q3`
- Exercise 2 prompt: `data.task`, `data.context`, `data.role`, `data.requirements`, `data.reasoning`, `data.boundaries`, `data.prompt`, `data.rating`, `data.notes`
- Exercise 3 opportunity map: `ideas[]`, each with `text`, `area`, `impact`, `effort`, and `priority`
- Exercise 3 pressure test: `data.partnerNotes`
- Exercise 4 baseline: `profile`, `data.total`, and `data.dims[]`

Session 2 currently adds:

- Selected items from Session 1 Exercise 3: `session2Priorities[]`, containing the selected idea indexes
- Prioritisation rationale: `session2Notes`
- Process mapping placeholder: `processName`, `processOwner`, and `processNotes`

## Adding future sessions

Each new session should add its own state namespace, for example `session3`, and keep its fields inside the same `StateJSON` object. Add a readable reporting tab in Apps Script only when facilitators need spreadsheet columns for that session. This keeps resume data complete while allowing each session to have different exercises.

## Google Sheet reporting tabs

- `Participants`: sign-in and submission events
- `Ex1_Snapshot`: three leadership snapshot answers
- `Ex2_Prompt`: six prompt blocks, assembled prompt, rating, and iteration notes
- `Ex3_Ideas`: one row per opportunity idea
- `Ex3_Map`: idea count, priority count, selected ideas, and pressure-test notes
- `Ex4_Baseline`: profile, total score, and optional dimensions
- `State`: one upserted JSON record per participant for cross-device resume
- `Submissions`: final submission events
