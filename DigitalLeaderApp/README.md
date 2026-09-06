# EDMECA Digital Leader App

Six-session exercise workbook for Property Point | Growthpoint Enterprise Development Cohort Seven. Session 1 (Digital Leader), Session 2 (Operations) and Session 3 (Market Access) are built; Sessions 4-6 show a "coming soon" placeholder until their exercise content is added.

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

- `index.html`: six-session navigation, the Session 1, 2 and 3 exercises, per-user local draft persistence, resume, and save events
- `api/bridge.js`: same-origin proxy to Apps Script
- `vercel.json`: route for the bridge function

## Deploying

This app lives in `DigitalLeaderApp/`, a subfolder of the repo. The Vercel project's **Root Directory** must be set to `DigitalLeaderApp` (Settings → General) for git-triggered deploys to find `index.html`; without it, pushes to `main` build from the repo root and 404.
