# EDMECA Digital Leader App

Six-session exercise workbook for Property Point | Growthpoint Enterprise Development Cohort Seven. Session 1 (Digital Leader), Session 2 (Operations), Session 3 (Market Access), Session 4 (Financial Intelligence, "One Job, Costed Properly") and Session 5 (Service Innovation: Design Thinking in class, Business Model Canvas as homework) are built; Session 6 shows a "coming soon" placeholder until its exercise content is added.

## Run locally

Because this is a static app with one Vercel serverless function, serve the folder with Vercel for the full bridge flow. The workbook still saves to localStorage when the bridge is unavailable.

```sh
npx vercel dev
```

Open the URL printed by Vercel. Opening `index.html` directly with a `file://` URL only uses localStorage; it cannot reach `/api/bridge` and will not write to Google Sheets.

## Google Sheets connection

The workbook links to the response sheet:

https://docs.google.com/spreadsheets/d/1LFoQoCZEC4uPfFzF7eAgaL71yp6rvMCq-orOjHix2oU/edit?gid=679646205#gid=679646205

Deploy the Apps Script bridge from `EDMECA_Bridge_AppsScript.gs`, then configure this Vercel environment variable:

```sh
vercel env add EDMECA_BRIDGE_URL production
```

Set its value to the Apps Script `/exec` URL and redeploy. The browser calls `/api/bridge`; the serverless function forwards GET resume requests and POST save events to Apps Script.

## App files

- `index.html`: six-session navigation, the Session 1 to 4 exercises, per-user local draft persistence, resume, and save events. Session 4 also generates each participant's Excel cost sheet in the browser (ExcelJS, loaded from cdnjs when the Session 4 tab opens)
- `api/bridge.js`: same-origin proxy to Apps Script
- `vercel.json`: route for the bridge function

## Deploying

This app lives in `DigitalLeaderApp/`, a subfolder of the repo. The Vercel project's **Root Directory** must be set to `DigitalLeaderApp` (Settings → General) for git-triggered deploys to find `index.html`; without it, pushes to `main` build from the repo root and 404.

## Session 4 notes

Session 4 is the calculation surface for the costing session (spec: `EDMECA_Session4_App_Spec_v0.1`, approved 17 September 2026). Six cards, live arithmetic in the browser, two prompt builders, and a **Generate my cost sheet** button on card 6 that downloads `EDMECA_S4_CostSheet_[Business]_[yyyymmdd].xlsx` with live formulas. The browser never calls an AI; participants run the two prompts in their own Claude.

The output-equals-prompt check introduced for Session 4 (an answer box that holds the prompt is refused with a red message) is also applied to the Session 2 SOP box and the Session 3 capability statement, quotation template and follow-up pack boxes.

Redeploy `EDMECA_Bridge_AppsScript.gs` after pulling this version: it adds the `S4_...` tabs and the `s4c1` to `s4c6`, `s4file` and `s4submit` events.

## Session 5 notes

Session 5 hosts the Business Model Canvas, ported from the EDMECA Academy portal tool as it runs on staging (`/portal/tools/bmc`) because the portal page cannot be framed. The guided view walks the nine blocks through the Desirability / Viability / Feasibility lens, three sentence starters per block. Guided, Canvas and Dashboard views sit on the step bar; Import, Example and Reset sit above the guided card; the Dashboard carries Export JSON, Export Word, Finalise & save, and Analyse with Claude (copy the prompt, paste the reply back).

Redeploy `EDMECA_Bridge_AppsScript.gs` after pulling this version: it adds the `S5_Canvas` and `S5_Analysis` tabs and the `s5canvas`, `s5analysis` and `s5submit` events.

Design Thinking (added 7 October 2026): the Session 5 step bar now opens on three in-class views, Empathize, Define and Ideate, taken from the Business Planning Integration deck (segment and persona, Jobs to Be Done, the Alpha Prompt, three customer calls as homework, problem statement, How Might We, SCAMPER). The worked example is Kgotso Facilities, the same made-up contractor as the canvas example. AI is used twice, both copy-prompt / paste-back and echo-checked: the Alpha Prompt (Claude asks three questions) and card 9, Prototype (added 7 October 2026, on the third view, now called Ideate & Prototype: Claude drafts a one-page landing page from cards 2, 5, 6 and 8, with [TO CONFIRM] for any fact it would otherwise invent; the participant records the headline, a partner's reaction and one change, and shows the page to one of the three customers as homework). Take it to the canvas drafts four canvas starters, only into empty boxes, and the canvas views are labelled as homework (due Thursday 22 October; customer calls by Thursday 15 October). Redeploy `EDMECA_Bridge_AppsScript.gs` after pulling: it adds the `S5_DesignThinking` tab and the `s5dt` event.

Session 5 follow-ups (7 October 2026): the Example button on the Design Thinking views and the canvas views now loads the Kgotso Facilities example into the Design Thinking cards as well as the canvas, and none of it reaches the sheet. Session 5 also records artefact credit (18, 19, 20, 21) and a one-row-per-participant progress check for the facilitator.

Redeploy `EDMECA_Bridge_AppsScript.gs` after pulling this version: it adds the `S5_Artefacts` and `S5_Progress` tabs. Without the redeploy the new data is ignored and nothing breaks.

Tests: `tests/session5_open_changes.test.js` (headless Playwright; run it against `DigitalLeaderApp/` before pushing).

Empathize feeds Define (7 October 2026): when the Define view opens, each empty problem field (customer, job, barrier) is drafted once from the Empathize cards (chosen segment; the functional job's "so I can"; the first challenge). One-click suggestions sit under each field (segment, segment with the persona name, the jobs, the challenges and pains), and an empty HMW box offers a starter built from the problem statement. An unfinished starter does not count as a How Might We question. No sheet or Apps Script change. Tests: `tests/session5_define_prefill.test.js`.

Card 9 aligned with the PRP Metaprompt (7 October 2026): the prototype prompt now follows `EDMECA_PRP_Metaprompt_Live_Landing_Page.pdf`. Cards 1 to 8 answer the metaprompt's questions 1 to 4 (segment, persona, challenges, pains, needs, what they use instead, all three jobs, problem statement, chosen HMW, chosen idea and circled SCAMPER ideas). Card 9 adds questions 5 to 7 (the offer, the one WhatsApp action, up to three proof points) and an optional WhatsApp number. Claude asks only for what is blank, flags at most one inconsistency, then writes the Lovable PRP only (450 words; the metaprompt's closing instruction plus one sentence asking for a visually striking page). The metaprompt's Output 2 (Facebook advert) and Output 3 (what to watch) are left out of the app's prompt. Participants paste the PRP into Lovable, publish, and paste back the hero headline and the live link. No sheet or Apps Script change. Tests: `tests/session5_lovable_prp.test.js`.

Card 9 visual brief (8 October 2026): the PRP now asks Lovable for a visually striking page: a full-width hero image, images in the problem section and behind at least one other section, a sector palette with a strong WhatsApp accent, icons on the steps and benefits, bold type, alternating sections and subtle animation. Images illustrate the service and are never presented as the business's own team, clients or past work, and no real company's logo appears. The PRP limit rises from 350 to 450 words to fit the design section.

Sheet saves fixed (8 October 2026): a participant's whole workbook is kept as JSON in the `State` tab, and a Google Sheets cell holds at most 50,000 characters. Once a participant's state passed that (Jodi Johnson and Caz Johnson, mostly from long Session 2 and 3 pastes), the Apps Script threw before writing any exercise rows, so every save from them was lost, and the app hid the error and still said "Saved". Now:
- the Apps Script splits the state across `StateJSON` to `StateJSON8` (45,000 characters each) and writes the exercise rows first, so a state problem can never cost the rows;
- the app checks every save's reply; a refused or offline save is kept on the device, retried after the next save that gets through, and the participant sees "Saved on this device, but not yet to the programme sheet";
- unsent Design Thinking or canvas work is sent when the page is hidden or closed (it used to go only on a view or block change);
- on resume, a sheet copy older than the device's copy no longer overwrites it (states now carry `savedAt`; older sheet copies are compared by size).

Redeploy `EDMECA_Bridge_AppsScript.gs` after pulling this version (Manage deployments → edit → New version, so the `/exec` URL stays the same). Tests: `tests/bridge_saves.test.js`.

Autosave on every move (8 October 2026): the step a participant leaves is now sent to the sheet whichever way they leave it, not only by its Save / Save & continue button: the step bar, Back, a session tab, the Login tab, or hiding or closing the browser tab (switching to Claude counts). It runs the step's own Save code quietly: no toast, and required-field checks are skipped so half-finished work still arrives (Session 4 cards and the Session 2 and 3 pilots included); the pasted-prompt check still holds a step back. A step is sent only when it holds something new since it was last sent, so moving around does not repeat rows. Tabs that add a row per save (Sessions 1 to 3) can still gain a row each time a participant changes a step and moves on; the latest row is the current one. No Apps Script change. Tests: `tests/autosave.test.js`.

Session 5 example is look-only (8 October 2026): while the Kgotso Facilities example is loaded, its boxes are read-only, the choices and editing buttons are disabled, and Reset is replaced by **Start my own canvas**. Before, a participant could type their own answers over the example, and none of it ever reached the sheet. Loading the example now sets the participant's own Session 5 work aside, and Start my own canvas brings it back (or opens a blank workbook if there was none). No Apps Script change. Tests: `tests/example_lock.test.js`.

Leaner saves (8 October 2026): the Apps Script writes rows in blocks: one read, one `deleteRows` per run of a participant's rows and one `setValues` for the new rows, instead of a `deleteRow` and `appendRow` per row. A 30-row Design Thinking re-save drops from about 67 sheet calls to 9, and the Session 1 to 3 lists (ideas, process steps, opportunities, evidence, gaps, pipeline) go in one call. The script lock is held for every save, so shorter saves keep a full class moving. In the app, the whole-workbook copy for the State tab is sent only when it has changed since the last one sent, and a burst of moves within 2 seconds is a single write; an unchanged workbook is left out of exercise saves. Redeploy `EDMECA_Bridge_AppsScript.gs` after pulling (Manage deployments → edit → New version). Tests: `tests/apps_script.test.js` (Node, no browser) and `tests/bridge_saves.test.js`.

Retries never overwrite newer work (8 October 2026): a failed save waiting in the retry queue was stored as a live reference, so it picked up later edits but kept its old counts, and once a newer save got through, the retry sent the older save on top of it (seen on a test account: a finalised canvas was overwritten by an earlier canvas save, Finalised went blank and the counts read 7 sections / 21 answers against 27 answered rows). Now a queued save is a frozen copy; saves that write the same rows share one retry slot (`s5canvas`, `s5submit` and `s5analysis`; `s4c6` and `s4file`), so a newer one replaces the older; and the queue never re-sends an old workbook copy, it sends the current one. Separately, `S5_Canvas` Finalised and the artefact credit now follow the canvas itself: a canvas save after finalising keeps YES and the credit (before, moving to another block after finalising cleared YES), and editing a box clears it as before. Redeploy `EDMECA_Bridge_AppsScript.gs` after pulling. Tests: `tests/bridge_saves.test.js`, `tests/apps_script.test.js`.
