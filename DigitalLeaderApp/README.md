# EDMECA Digital Leader App

Six-session exercise workbook for Property Point | Growthpoint Enterprise Development Cohort Seven. Session 1 (Digital Leader), Session 2 (Operations), Session 3 (Market Access) and Session 4 (Financial Intelligence, "One Job, Costed Properly") are built; Sessions 5 and 6 show a "coming soon" placeholder until their exercise content is added.

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
