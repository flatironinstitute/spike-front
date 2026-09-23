#!/usr/bin/env node
// Writes the API responses as static JSON files into client/build/api/
// for static hosting (e.g. Vercel). See vercel.json for the rewrites.
const fs = require("fs");
const path = require("path");

const data = require("../data");
const sorterController = require("../controllers/sorterController");
const algorithmController = require("../controllers/algorithmController");
const sortingResultController = require("../controllers/sortingResultController");
const studySetController = require("../controllers/studySetController");
const studyAnalysisResultController = require("../controllers/studyAnalysisResultController");
const generalController = require("../controllers/generalController");
const newsPostController = require("../controllers/newsPostController");

const outDir = path.join(__dirname, "..", "client", "build", "api");

async function write(relPath, handler, params = {}) {
  let body;
  await handler({ params }, { send: obj => (body = obj) });
  const fname = path.join(outDir, relPath + ".json");
  fs.mkdirSync(path.dirname(fname), { recursive: true });
  fs.writeFileSync(fname, JSON.stringify(body));
  console.info(`Wrote ${fname}`);
}

async function main() {
  await write("cpus", sortingResultController.getCPUs);
  await write("sorters", sorterController.getSorters);
  await write("algorithms", algorithmController.getAlgorithms);
  await write("sortingresults", sortingResultController.getSortingResults);
  await write("studysets", studySetController.getStudySets);
  await write("stats", sortingResultController.getStats);
  await write("newsposts", newsPostController.getNewsPosts);
  await write("general", generalController.getGeneral);
  await write(
    "studyanalysisresults",
    studyAnalysisResultController.getStudyAnalysisResults
  );
  const studySetNames = [
    ...new Set(data.studyAnalysisResults.map(sar => sar.studySetName))
  ];
  for (const studySetName of studySetNames) {
    await write(
      `studyanalysisresults/${studySetName}`,
      studyAnalysisResultController.getStudyAnalysisResultsForStudySet,
      { studySetName }
    );
  }
}

main();
