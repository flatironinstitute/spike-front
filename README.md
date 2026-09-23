# Spike-Front

Front end repository for the SpikeForest pipeline. This site presents benchmarking of spike sorting algorithms.

## Getting started

To install software and packages, you will need to first run in _both_ the `/` and `/client` folder:

### `yarn install`

To start both the client and backend for local development, you can run:

### `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Data

The site no longer uses a database. The server loads its data at startup from the JSON files in `spikeforest_website_data/` (Algorithms, Sorters, StudySets, SortingResults, StudyAnalysisResults, General, and optionally NewsPosts), which are committed and deployed along with the app. To update the site data, replace these files with new output from the spikeforest pipeline and redeploy.

## Deploying to Vercel

The site is deployed as static files. The build (see `vercel.json`) compiles the client and runs `scripts/build-static-api.js`, which writes each API response to `client/build/api/*.json`; rewrites in `vercel.json` map the `/api/...` routes onto these files. The endpoints that depend on the external file store (`loadObject`, `loadText`, `findFile`) and the contact form are not available in this deployment.

## Authors

- **Liz Lovero** - [lizlove](https://github.com/lizlove)
- **Jeremy Magland** - [magland](https://github.com/magland)
