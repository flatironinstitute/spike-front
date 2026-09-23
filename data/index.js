const fs = require("fs");
const path = require("path");

// Static site data, deployed along with the app (replaces the former MongoDB)
const DATA_DIR = path.join(__dirname, "..", "spikeforest_website_data");

function load(name, fallback) {
  const fname = path.join(DATA_DIR, `${name}.json`);
  if (!fs.existsSync(fname)) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing data file: ${fname}`);
  }
  return JSON.parse(fs.readFileSync(fname, "utf-8"));
}

module.exports = {
  sorters: load("Sorters"),
  algorithms: load("Algorithms"),
  studySets: load("StudySets"),
  sortingResults: load("SortingResults"),
  studyAnalysisResults: load("StudyAnalysisResults"),
  general: load("General"),
  newsPosts: load("NewsPosts", [])
};
