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
