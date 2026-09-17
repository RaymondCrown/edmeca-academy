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

Session 3 follows the facilitator deck's arc (Choose Where to Compete → Build the Assets with AI → Make the Pipeline Work) but is **quotation-first**: the frame is the enquiry-to-quote flow the cohort actually runs, and a formal RFQ or tender is one buyer type rather than the organising idea. That decision came from the cohort's own Session 2 data — five of the seven real participants chose a quote-shaped process (*enquiry to quote*, *quote to cash*, *Request for Quotation to purchase order*, and so on) and none chose a tender. Unlike Sessions 1 and 2, every Session 3 field lives inside a single `session3` object, per the namespacing rule below:

- Go-to-market outline: `gtmWho`, `gtmKnownFor`, `gtmWhere` — the deck's three questions (targeting, positioning, channels)
- Quote requests: `opportunities[]`, each `{ name, buyerType, date, win, value, deliver, stage }`. The field is still called `opportunities` in the state so the two-session-old resume record stays stable, but on screen these are live enquiries and quote requests. `buyerType` is one of four re-cut from the deck's breakout corners: `new` (new client enquiry), `repeat` (existing client, repeat work), `contractor` (main contractor or panel), `rfq` (formal RFQ or tender). `date` is when the client wants it. `win`/`value`/`deliver` are the three-question filter, each scored 0–5, so the total is out of 15. `stage` is the pipeline stage `1`–`5`
- Chosen quote: `chosenOpportunity` (index into `opportunities[]`), the one taken through the afternoon
- Evidence: `evidence[]`, each `{ client, scope, value, date, outcome }` — the deck asks for 10 to 14 real jobs
- Stays-yours sort: `sort` (map of item key → `yours` / `ai` / `mech`). The Apps Script scores this against the deck's own answers and stores the count out of 12
- Capability statement: `sector`, `capPrompt` (built from the evidence rows via the "Build prompt" button, from the deck's slide 33 prompt starter), `capText` (what the participant pasted back), `rubric` (map of the five slide-34 quality criteria → ticked boolean)
- Quotation template: `quoteBlocks` (the six-block recipe — `role`, `task`, `context`, `requirements`, `format`, `example` — pointed at the words around a quote: covering note, scope, assumptions, exclusions), `quotePrompt`, `quoteText`. Four of the six blocks are derived from what Parts 1 to 3 already captured, the first time the participant opens Part 4: `role` from the business name and the sector, `task` from the chosen quote's buyer type, `context` from the enquiry, the go-to-market answers and the evidence count, and `example` from the capability statement. `requirements` and `format` are deliberately never derived — they come off the enquiry and the participant's own terms, and inventing them would put words in the participant's mouth. `quotePrefilled` records that the one-time fill has happened, so returning to Part 4 never overwrites what the participant typed; the "Rebuild from Parts 1-3" button re-derives those four blocks on demand and leaves the other two untouched. The built prompt embeds the evidence rows and the capability statement itself, and instructs the AI to leave every price, rate and total as `[PRICE]` — the number is never delegated
- Past quote for the Example block: `exampleText`, `exampleSource`. The participant can drop a quote they were happy with (PDF, `.docx`, or plain text) onto the Example block, or paste it. **The file is never uploaded.** It is read in the browser — pdf.js for PDF, mammoth for `.docx`, both lazy-loaded from cdnjs on first use, `FileReader` for text — and only the extracted text is kept, capped at 6,000 characters. The cap exists because the whole of `StateJSON` has to fit in one Google Sheets cell (50,000 characters), and 6,000 is more than enough to give the AI the shape and voice of a quote. `exampleSource` is just the filename, for the on-screen note. When text arrives, the derived Example line switches from "match our capability statement" to "match the past quote below" — unless the participant has already written their own line, which is left alone. The built prompt embeds the text under its own heading, with the instruction to match tone and structure, not prices. Old `.doc` files and scanned PDFs (no text layer) are refused with a message that says to paste instead
- Completeness check: `gaps[]`, each `{ missing, who }` — what the client asked for that the quote does not yet answer, and who supplies it
- Follow-up pack: `commsPrompt` (built around the chosen quote — the deck's five reusable messages: follow-up, quote covering note, escalation, holding reply, thank-you), `commsText` (the five messages pasted back)
- BD rhythm: `rhythm` (map of item key → adopted boolean)
- Pilot: `pilot { opportunity, action, asset, owner, date, followUp }`, the closing commitment artefact — the quote, what you send, the asset, one owner, the send date and the chase date

Note on the six-block prompt recipe: the deck's slide 35 names the blocks Role / Task / Context / Requirements / **Format** / **Example**, and carries a facilitator warning that the Session 1 callback is unverified. Session 1 in this workbook does teach six blocks, so the count is right, but its last two are named **Reasoning** and **Boundaries**. The app follows the deck. If the deck is corrected, change `quoteRecipe` in `index.html` and the `S3_Quotation` column headings together.

Session 4 (Costing, Pricing and Financial Intelligence — "One Job, Costed Properly") follows the approved app spec (`EDMECA_Session4_App_Spec_v0.1`, 17 September 2026): six cards, the app as the calculation surface, Claude only ever asked to ask. Everything lives inside a single `session4` object:

- Job (card 1): `job { sector, line, client, quoted, duration, durationUnit, status }`. `sector` is pre-filled from `session3.sector` when empty. `duration` plus `durationUnit` (`days` / `weeks` / `months`) converts to months for layer 5 (weeks ÷ 4.33, days ÷ 21.67) and to weeks for the cash line. `status` is `won` / `lost` / `pending`, reporting only
- Cost lines (cards 2 and 3): `lines[]`, each `{ layer, item, qty, unit, rate, source, estimate, round }`. `layer` is 1 to 4 (People, Materials, Vehicles and machines, The job's own overheads); layer 5 is never a line, it is calculated on card 4. `unit` is one of `day, hour, m3, km, load, each, month, lump sum`; a lump sum takes `rate` as the amount, otherwise amount = qty × rate. `source` is `invoice` / `bank` / `wagebook` / `supplier` / `ownrate` / `other`. `round` is the interview round (1-based) the line was found in, or null for Round 1 lines. `hideAmounts` is the display-only toggle for the pair check
- Interview (card 3): `interviewPrompt` (rebuilt every render from the sector, the job line and the item names — never quantities, rates or amounts), `rounds[]`, each `{ asked, answer }`. Three rounds with both fields filled is the minimum; an `asked` box that equals, or contains more than 80 percent of, the prompt is refused
- Price (card 4): `price { overhead, method, months, share, avgDirect, avgSales, targetMargin, minMargin }`. `method` is `A` (by time: overhead × months × share, the default), `B` (by direct cost: overhead ÷ avgDirect × direct cost) or `C` (by revenue: overhead ÷ avgSales × quoted price). `months` starts from the card 1 duration and is editable. Margins are stored as percentages (20 means 20%). Everything else on the card is derived live: direct cost (layers 1 to 4), full cost, price = full ÷ (1 − target), walk-away = full ÷ (1 − minimum), margin on quoted, markup equivalent, margin after direct costs, break-even = overhead ÷ margin after direct costs
- Scenarios (card 4): `scenario { service, costIdx, chargedIdx, prompt, answer, chosen }`. The prompt carries index figures only (cost 100, price 100 ÷ (1 − target)); no rand amount reaches the AI. `chosen` is `base` / `plus` / `minus` / `add` / `sent`
- Cash line (card 5): `cash { deposit, progress, final, progressWeek, terms, materials, weeks, try50 }`. Percentages must total 100. `progressWeek` empty means the middle week. `materials` is `upfront` (week 1) / `spread` / `completion`. Weekly logic: deposit in week 0, progress and final paid ceil(terms ÷ 7) weeks after they are claimed; layer 2 by the chosen timing, layers 1, 3 and 5 spread evenly over the job weeks, layer 4 in the last job week. The cash gap is the lowest cumulative position. Acceptance values from the deck's worked example: price R317 250, full cost R253 800, 6 weeks, 30/40/30, 30 days gives −R158 625 in week 6; 50/20/30 gives −R95 175
- Pilot and file (card 6): `pilot { quote, owner, date, whatsapp }` (date on or before 2026-09-30), `fileGenerated` (ISO timestamp of the last download), `submitted` (ISO timestamp when all six cards were complete on save)

The calculation code is a DOM-free block in `index.html` between `/* S4CALC:BEGIN */` and `/* S4CALC:END */`, and the spreadsheet builder between `/* S4XLSX:BEGIN */` and `/* S4XLSX:END */`, so both can be lifted out and run in node against the worked example. The generated file (`EDMECA_S4_CostSheet_[Business]_[yyyymmdd].xlsx`, built with ExcelJS from cdnjs) has seven tabs — Cost Sheet, Interview, Scenarios, Cash Line, Four Numbers, 90-Day Cash, How To Use — with every calculated cell a live formula and input cells shaded yellow. The Cash Line tab has no native chart (ExcelJS cannot write one): the cumulative column carries a data bar, the deepest-point row is shaded red, and the note says how to insert a line chart in one step.

Prompt-echo check: `looksLikePrompt(output, prompt)` normalises whitespace and case and flags an output that equals the prompt, contains it whole, or contains more than 80 percent of its six-word phrases. It is applied to every Session 4 output box, and back-ported to Session 2 (`sopText`) and Session 3 (`capText`, `quoteText`, `commsText`), where a save is refused with the red message.

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

Session 3 (`S3_...`):

- `S3_GTM`: the three go-to-market answers — who you serve, what you are known for, where they find you
- `S3_Opportunities`: one row per live quote request, with its buyer type (`new` / `repeat` / `contractor` / `rfq`), wanted-by date, the three filter scores, the total out of 15, and `Chosen` marking the one taken through the afternoon. The tab keeps its `Opportunities` name to match the state field
- `S3_Evidence`: one row per job in the track record — client, scope, value, date, outcome
- `S3_Sort`: the stays-yours/AI-assists/mechanical decisions as JSON, plus how many of the twelve match the deck's answers
- `S3_Statement`: the sector, the built prompt, the capability statement pasted back, and which of the five quality criteria the participant ticked
- `S3_Quotation`: the six recipe blocks in their own columns, the assembled prompt, the quotation template pasted back, and the text of the past quote attached to the Example block (capped at 6,000 characters) with the filename it came from
- `S3_Gaps`: one row per completeness gap — what the client asked for that the quote does not yet answer, and who supplies it
- `S3_FollowUp`: the prompt built around the chosen quote and the five follow-up messages pasted back
- `S3_Pipeline`: one row per quote, with the pipeline stage it was placed in
- `S3_Rhythm`: which daily/weekly/monthly business-development items the participant committed to
- `S3_Pilot`: the closing six-field pilot — the quote, action, asset, owner, send date and follow-up date

Session 4 (`S4_...`) — unlike the earlier tabs these hold one current record per participant, replaced on every save (`upsertRows` deletes the participant's rows, matched on Name and Business, then appends). Amounts are stored for EDMECA's programme reporting; nothing is reported to Property Point at rand level:

- `S4_Job`: sector, job line, client label, quoted price, duration, months, weeks, status (event `s4c1`)
- `S4_Costs`: one row per cost line — layer, item, qty, unit, rate, amount, source, estimate, found-in-round (events `s4c2` and `s4c3`)
- `S4_Interview`: one row per round — AI asked, my answer, added as line (Y/N), layer (event `s4c3`)
- `S4_Price`: the five layer totals, full cost, method, target margin, price, walk-away, margin on quoted, break-even, quoted below walk-away (Y/N), the scenario answer and the scenario chosen (event `s4c4`)
- `S4_Cash`: deposit, progress, final, terms, materials timing, cash gap, gap week (event `s4c5`)
- `S4_Pilot`: quote, owner, date, WhatsApp, file generated, and `Day7Reply`, which the facilitator fills in by hand and which survives later saves (events `s4c6` and `s4file`)
- `s4submit` appends a `Participants` row with event `s4submit` when all six cards are complete. Autosave goes to the `State` tab only, through the ordinary state payload

## Note on renaming existing tabs

Apps Script's `sheet()` helper only creates a tab the first time its name is requested — it does not rename an existing tab. If the spreadsheet already has tabs under the old unprefixed names (`Ex1_Snapshot`, `Ex2_Prompt`, `Ex2_ProcessMapping`, `Ex3_Ideas`, `Ex3_Map`, `Ex4_Baseline`), the redeployed script will create fresh `S1_...`/`S2_...` tabs alongside them rather than migrating the old ones. Rename or archive the old tabs by hand in Google Sheets after redeploying.

## Note on Session 1 Exercise 4 (retired)

Session 1 no longer has a fourth exercise — the "Your Baseline, Revealed" profile/score step (Thinker/Builder/Doer, total score, five dimension scores) was removed from the workbook entirely, not just renamed. There is no `S1_Ex4_Baseline` tab; if an old `Ex4_Baseline` tab exists from before, it can be archived.
