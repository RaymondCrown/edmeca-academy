# EDMECA Digital Leader app: notes for Claude Code

The app is one static page, `DigitalLeaderApp/index.html`, plus `api/bridge.js` (a same-origin proxy to the Apps Script in `EDMECA_Bridge_AppsScript.gs`, URL in the Vercel variable `EDMECA_BRIDGE_URL`). Vercel project `ppt-edm-digital-leader` deploys `main`, root directory `DigitalLeaderApp`. Merge to `main` only on Raymond's instruction.

Session specs, decks and briefs live outside the repo (iCloud `Claude/Edmeca/Claude-Edmeca-GrowthPoint-ED/`; Session 5 and later decks in Dropbox Downloads).

## Conventions every session follows

- Sign-in is name and business; the participant key is lowercased `name|business`. Do not change it.
- The whole workbook is `state`, saved to localStorage at once and to the `State` tab after a 2-second pause (`syncState`). Each session has its own namespace (`state.session5`, `state.session6`) with `blank...` / `merge...` helpers beside `blankSession5` near the top of the first script, and `restore` merges it.
- Exercise saves go through `bridgePost(payload)` with a new event name; the Apps Script upserts the participant's rows (`upsertRows`, matched on Name and Business). Failed saves are queued and retried; a read-only reply (the freeze) is not.
- Leaving a step by any route autosaves it quietly (`autosaveStep`, `quietSave` on: no toasts, no required-field checks, only what changed since the last send).
- AI steps are copy prompt, paste back, and `looksLikePrompt` / `s4FlagEcho` refuse a pasted prompt. The browser never calls an AI. The one exception is export commentary: `exportCommentary(kind,text)` posts to `api/commentary.js`, which calls Claude with EDMECA's key (`ANTHROPIC_API_KEY` in Vercel) and keeps the instructions server-side. Keep participant names out of the text sent.
- On-screen text: plain English, second person, no em dashes, no section symbol, dates as "Thursday 29 October 2026". No client names: "roles, not names".
- Tests are headless Playwright against the installed Chrome, one file per change in `tests/`: `npm i -D playwright`, then `node tests/<file>.test.js /absolute/path/to/DigitalLeaderApp`. Run all of them before pushing.

## Session 6 · AI Roadmap (Thursday 29 October 2026)

Script: the last `<script>` block in `index.html`. State: `state.session6` (`blankS6`, `mergeS6`, `S6_TOOLKIT` near `blankSession5`), view in `state.session6View`.

| View | Render | Save | Event | Tab |
| --- | --- | --- | --- | --- |
| 0 POST | `renderS6Post` | `s6SubmitPost` (Submit only, never autosaved to the tab) | `s6post` | `S6_Post` (appends) |
| 1 My Journey | `renderS6Journey`, data from `s6LoadJourney` (`GET action=journey`) | leaving the view | `s6story` (StorySeed) | reads `S6_Journey` |
| 2 Roadmap | `renderS6Roadmap`, live checks `s6RoadmapLive` | `s6SaveRoadmap` | `s6roadmap` | `S6_Roadmap` |
| 3 Toolkit | `renderS6Toolkit` | `s6SaveToolkit` | `s6toolkit` | `S6_Toolkit` |
| 4 Story and Commitment | `renderS6Story` | `s6SaveStory` (needs consent), `s6SaveCommit` | `s6story`, `s6commit` | `S6_Story`, `S6_Commit` |

Other functions: `POST_QUESTIONS` (word for word from the August form; never edit), `s6Score` / `s6Band`, `s6RoadmapMissing` (blocks Ask Claude), `s6OwnersAllMe` (soft warning), `s6RoadmapPrompt`, `s6Credit` (artefacts 22 to 26), `s6Progress` (flags for `S6_Progress`, from content), `s6Post` (the payload), `s6Flush` (autosave), `s6ExportJourney` and `s6ExportPlan` (PDF through `window.print` on `#s6print`, Word through `s5LoadDocx`). Apps Script: `writeSession6`, `writeS6Progress`, `readJourney`, `isFrozen`, `isTestIdentity`.

Tabs: `S6_Post`, `S6_Journey` (facilitator-prepared), `S6_Roadmap`, `S6_Toolkit`, `S6_Story`, `S6_Commit`, `S6_Artefacts`, `S6_Progress`, `Config`. Columns and credit rules: `DigitalLeaderApp/DATA_MODEL.md`.

### Manual steps before class

1. Fill in `s6LibraryUrl` and `s6SupportUrl` in `index.html` (both `[TO CONFIRM]`), then merge to `main` on Raymond's word.
2. Redeploy the Apps Script: Manage deployments, edit, **New version** (the `/exec` URL stays the same, so `EDMECA_BRIDGE_URL` needs no change). If a new deployment is made instead, update `EDMECA_BRIDGE_URL` in Vercel and redeploy the app.
3. Monday 26 October: prepare `S6_Journey`, one row per participant Key, using the merge map (THC under two business names, Kairos as "Kevin" and "Kevin Abrahams", GD Projects under three, Caz and Ansha under two each). Key must equal the lowercased `name|business` the participant signs in with on Thursday; add one row per key they might use. Format the `Artefacts` column as plain text before typing (Format, Number, Plain text); the script does this when it creates the tab. Pairing: per person; Jodi has no August score (leave PreTotal blank); Stephan pairs with his own 13 August baseline (10); Ben's 11 is THC's score of record, shown only if Ben submits a POST.
4. Smoke test with name "Test Person", business "Test Co": submit a POST, open My Journey, save each view, check the S6 tabs, then delete that identity's rows (it never appears in `S6_Progress`).
5. Check `Config` has `freeze` FALSE. On Friday 30 October set it to TRUE.
6. Do not touch S5_Progress flags in code; Kairos, THC and GD Projects are corrected by hand on the sheet.
