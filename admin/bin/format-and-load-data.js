#!/usr/bin/env node

require("dotenv").config({ path: __dirname + "/../../.env" });
const fs = require("fs");
// const util = require("util");
// const path = require("path");
// const fs_writeFile = util.promisify(fs.writeFile);
// const fs_unlink = util.promisify(fs.unlinkSync);
// const fs_readdir = util.promisify(fs.readdir);
// const assert = require("assert");

function print_usage() {
  // used below
  console.info("USAGE:");
  console.info("./format-and-load-data.js [data_directory_or_json_file] [database_url]");
  console.info(
    "If --database-from-env is specified, the DATABASE environment variable (from .env) will be used for the database url."
  );
  console.info(
    "If --database-from-env-prod is specified, the DATABASE_PROD environment variable (from .env) will be used for the database url."
  );
}

// parse the arguments
let arg1 = process.argv[2] || null;
let arg2 = process.argv[3] || null;

let data_directory_or_file = arg1;
let database_url = arg2;

if (process.argv.includes("--database-from-env")) {
  database_url = process.env.DATABASE;
}
if (process.argv.includes("--database-from-env-prod")) {
  database_url = process.env.DATABASE_PROD;
}

// print usage if insufficient args
if (!data_directory_or_file || !database_url) {
  print_usage();
  process.exit(-1);
}

console.info(`USING DATABASE: ${database_url}`);

let data_directory = null;
let data_file = null;
if (fs.lstatSync(data_directory_or_file).isDirectory()) {
  data_directory = data_directory_or_file;
}
else if (fs.lstatSync(data_directory_or_file).isFile()) {
  data_file = data_directory_or_file;
}
else {
  console.log(`No such file or directory: ${data_directory_or_file}`);
  process.exit(-1);
}

// checks

// if (data_directory) {
//   if (!fs.existsSync(data_directory + "/cleanedData")) {
//     fs.mkdirSync(data_directory + "/cleanedData");
//   }
// }

const mongoose = require("mongoose");
mongoose.connect(database_url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// import all of the models
const Sorter = require("../../models/Sorter");
const Algorithm = require("../../models/Algorithm");
const StudySet = require("../../models/StudySet");
const SortingResult = require("../../models/SortingResult");
const StudyAnalysisResult = require("../../models/StudyAnalysisResult");
const General = require("../../models/General");

// import all the raw data
<<<<<<< HEAD
let rawSorters, rawAlgorithms, rawStudySets, rawSortingResults, rawStudyAnalysisResults, rawGeneral;
=======
let rawSorters, rawAlgorithms, rawStudySets, rawSortingResults, rawStudySets, rawGeneral;
>>>>>>> bb7492690912377cf9ac9306d3efbb6651520523
if (data_directory) {
  rawSorters = JSON.parse(
    fs.readFileSync(data_directory + "/Sorters.json", "utf-8")
  );
  rawAlgorithms = JSON.parse(
    fs.readFileSync(data_directory + "/Algorithms.json", "utf-8")
  );
  rawStudySets = JSON.parse(
    fs.readFileSync(data_directory + "/StudySets.json", "utf-8")
  );
  rawSortingResults = JSON.parse(
    fs.readFileSync(data_directory + "/SortingResults.json", "utf-8")
  );
  rawStudyAnalysisResults = JSON.parse(
    fs.readFileSync(data_directory + "/StudyAnalysisResults.json", "utf-8")
  );
  rawGeneral = JSON.parse(
    fs.readFileSync(data_directory + "/General.json", "utf-8")
  );
}
<<<<<<< HEAD
else if (data_file) {
=======
else if (raw_file) {
>>>>>>> bb7492690912377cf9ac9306d3efbb6651520523
  const obj = JSON.parse(
    fs.readFileSync(data_file, "utf-8")
  );
  rawSorters = obj['Sorters'];
  rawAlgorithms = obj['Algorithms'];
  rawStudySets = obj['StudySets'];
  rawSortingResults = obj['SortingResults'];
  rawStudyAnalysisResults = obj['StudyAnalysisResults'];
  rawGeneral = obj['General'];
}
else {
  console.log('Unexpected error.');
  process.exit(-1);
}

// async function writeNewFile(fileName, newData) {
//   let newFileName = data_directory + `/cleanedData/${fileName}.json`;
//   await fs_writeFile(newFileName, JSON.stringify(newData));
//   console.log(`Clean ${fileName}.json saved. 💾`);
// }

async function loadIntoDB(model, data, name) {
  try {
    await model.insertMany(data);
    console.log(` 😎 😎 😎 ${name} in DB...`);
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

// async function writeCleanData(model, name) {
//   console.info(`Writing ${name}...`);
//   const allEntries = model.find();
//   const [foundEntries] = await Promise.all([allEntries]);
//   await writeNewFile(name, foundEntries);
//   console.info(`Done writing ${name}.`);
// }

// function deleteFile(file) {
//   try {
//     fs.unlinkSync(file);
//   } catch (e) {
//     console.error(e);
//   }
// }

// async function emptyDataFolder(directory) {
//   let files = await fs_readdir(directory);
//   let filePaths = files.map(file => path.join(directory, file));
//   filePaths.forEach(file => {
//     deleteFile(file);
//   });
// }

async function formatAndLoadData() {
  // Sorters
  await loadIntoDB(Sorter, rawSorters, "Sorters");
  // await writeCleanData(Sorter, "sorters");

  // Algorithms
  await loadIntoDB(Algorithm, rawAlgorithms, "Algorithms");
  // await writeCleanData(Algorithm, "algorithms");

  // Study Sets
  await loadIntoDB(StudySet, rawStudySets, "Study sets");
  // await writeCleanData(StudySet, "studySets");


  // Sorting Results
  await loadIntoDB(SortingResult, rawSortingResults, "Sorting results");
  // await writeCleanData(SortingResult, "sortingresults");

  // Study analysis results
  await loadIntoDB(StudyAnalysisResult, rawStudyAnalysisResults, "StudyAnalysisResults");
  // await writeCleanData(StudyAnalysisResult, "studyanalysisresults");

  // General
  await loadIntoDB(General, rawGeneral, "General");
  // await writeCleanData(General, "general");

  // Delete WIP Files
  // await emptyDataFolder(data_directory + "/cleanedData");
  // console.log(`🗑️  All used data files in the trash.`);

  console.log(
    "\n 👍👍👍👍👍👍👍👍 it's Done! \n\n 🐧 Data formatted, loaded into the DB.🐧"
  );
  process.exit();
}

formatAndLoadData();
