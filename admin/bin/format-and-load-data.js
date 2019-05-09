#!/usr/bin/env node

require("dotenv").config({ path: __dirname + "/../../.env" });
const fs = require("fs");
const util = require("util");
const path = require("path");
const fs_writeFile = util.promisify(fs.writeFile);
const fs_unlink = util.promisify(fs.unlinkSync);
const fs_readdir = util.promisify(fs.readdir);
const assert = require('assert');

function print_usage() {
  // used below
  console.info('USAGE:');
  console.info('./format-and-load-data.js [data_directory] [database_url]');
  console.info('If --database-from-env is specified, the DATABASE environment variable (from .env) will be used for the database url.')
}

// parse the arguments
let arg1 = process.argv[2] || null;
let arg2 = process.argv[3] || null;

let data_directory = arg1;
let database_url = arg2;

if (process.argv.includes('--database-from-env')) {
  database_url = process.env.DATABASE;
}

// print usage if insufficient args
if ((!data_directory) || (!database_url)) {
  print_usage();
  process.exit(-1);
}

console.info(`USING DATABASE: ${database_url}`);

// checks
assert(fs.lstatSync(data_directory).isDirectory(), `Not a directory: ${data_directory}`);

if (!fs.existsSync(data_directory + '/cleanedData')) {
  fs.mkdirSync(data_directory + '/cleanedData');
}

const mongoose = require("mongoose");
mongoose.connect(database_url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// import all of the models
const Sorter = require("../../models/Sorter");
const Algorithm = require("../../models/Algorithm");
const StudySet = require("../../models/StudySet");
const Study = require("../../models/Study");
const Recording = require("../../models/Recording");
const TrueUnit = require("../../models/TrueUnit");
const SortingResult = require("../../models/SortingResult");
const UnitResult = require("../../models/UnitResult");

// import all the raw data
const rawSorters = JSON.parse(
  fs.readFileSync(data_directory + "/Sorters.json", "utf-8")
);
const rawAlgorithms = JSON.parse(
  fs.readFileSync(data_directory + "/Algorithms.json", "utf-8")
);
const rawStudySets = JSON.parse(
  fs.readFileSync(data_directory + "/StudySets.json", "utf-8")
);
const rawStudies = JSON.parse(
  fs.readFileSync(data_directory + "/Studies.json", "utf-8")
);
const rawRecordings = JSON.parse(
  fs.readFileSync(data_directory + "/Recordings.json", "utf-8")
);
const rawTrueUnits = JSON.parse(
  fs.readFileSync(data_directory + "/TrueUnits.json", "utf-8")
);
const rawSortingResults = JSON.parse(
  fs.readFileSync(data_directory + "/SortingResults.json", "utf-8")
);
const rawUnitResults = JSON.parse(
  fs.readFileSync(data_directory + "/UnitResults.json", "utf-8")
);
let rawSpikeSprays = [];
const spikeSpraysFname = data_directory + "/SpikeSprays.json";
if (fs.existsSync(spikeSpraysFname)) {
  rawSpikeSprays = JSON.parse(
    fs.readFileSync(spikeSpraysFname, "utf-8")
  );
}

async function writeNewFile(fileName, newData) {
  let newFileName = data_directory + `/cleanedData/${fileName}.json`;
  await fs_writeFile(newFileName, JSON.stringify(newData));
  console.log(`Clean ${fileName}.json saved. 💾`);
}

async function loadIntoDB(model, data, name) {
  try {
    await model.insertMany(data);
    console.log(` 😎 😎 😎 ${name} in DB...`);
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing data make sure to drop the existing database first with.\n\n\t yarn run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}

async function writeCleanData(model, name) {
  console.info(`Writing ${name}...`);
  const allEntries = model.find();
  const [foundEntries] = await Promise.all([allEntries]);
  await writeNewFile(name, foundEntries);
  console.info(`Done writing ${name}.`);
}

async function formatStudies() {
  console.info('Formatting studies...');
  rawStudies.forEach(study => {
    // Add studySet id
    const studysets = JSON.parse(
      fs.readFileSync(data_directory + "/cleanedData/studysets.json", "utf-8")
    );
    let [setId] = studysets.filter(set => set.name === study.studySet);
    if (setId) {
      study.studySet = setId._id;
      study.studySetName = setId.name;
    } else {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t No study set found for study \n",
        study
      );
      process.exit();
    }
    // Add sorter id array based on sorterNames property
    let studySorters = [];
    const sorters = JSON.parse(
      fs.readFileSync(data_directory + "/cleanedData/sorters.json", "utf-8")
    );
    sorters.forEach(sorter => {
      if (study.sorterNames.includes(sorter.name)) {
        studySorters.push(sorter._id);
      }
    });
    if (studySorters.length) {
      study.sorters = studySorters;
    } else {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t No sorters found for study \n",
        study
      );
      process.exit();
    }
  });
  console.log("\t 🌱 Studies formatted.");
  return rawStudies;
}

async function formatTrueUnits() {
  console.info('Formatting true units...');
  rawTrueUnits.forEach(unit => {
    unit.recordingName = unit.recording;
    unit.studyName = unit.study;
    delete unit.recording;
    delete unit.study;
  });
  console.log("\t 🌱 True Units formatted.");
  return rawTrueUnits;
}

async function formatRecordings() {
  console.info('Formatting recordings...');
  const studies = JSON.parse(
    fs.readFileSync(data_directory + "/cleanedData/studies.json", "utf-8")
  );
  const studysets = JSON.parse(
    fs.readFileSync(data_directory + "/cleanedData/studysets.json", "utf-8")
  );
  const trueunits = JSON.parse(
    fs.readFileSync(data_directory + "/cleanedData/trueunits.json", "utf-8")
  );
  rawRecordings.forEach(recording => {
    // Add study id from study name
    recording.studyName = recording.study;
    let [studyId] = studies.filter(study => study.name === recording.studyName);
    if (studyId) {
      recording.study = studyId._id;
    } else {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t No study found for recording \n",
        recording
      );
      process.exit();
    }
    // Add a true units object property
    recording.trueUnits = [];

    // Add study set name
    let [studySetId] = studysets.filter(set => set._id === studyId.studySet);
    if (studySetId) {
      recording.studySetName = studySetId.name;
    } else {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t No studyset found for recording \n",
        recording
      );
      process.exit();
    }
  });
  // Collect true units
  trueunits.forEach(unit => {
    let [parentRecording] = rawRecordings.filter(
      recording =>
        recording.studyName == unit.studyName &&
        recording.name == unit.recordingName
    );
    if (parentRecording) {
      parentRecording.trueUnits.push(unit);
    } else {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t No recording found for true unit \n",
        unit
      );
      process.exit();
    }
  });
  // Validate number of true units found
  rawRecordings.forEach(recording => {
    if (recording.numTrueUnits !== recording.trueUnits.length) {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t numTrueUnits does not match true units found \n",
        recording
      );
      process.exit();
    }
  });
  console.log("\t 🌱 Recordings formatted.");
  return rawRecordings;
}

async function formatSortingResults() {
  console.info('Formatting sorting results...');
  rawSortingResults.forEach(sorting => {
    // Move string names to string properties
    sorting.recordingName = sorting.recording;
    sorting.studyName = sorting.study;
    sorting.sorterName = sorting.sorter;
    delete sorting.study;
  });
  rawSortingResults.forEach(sorting => {
    // Match sorting.recording to the recording._id;
    const recordings = JSON.parse(
      fs.readFileSync(data_directory + "/cleanedData/recordings.json", "utf-8")
    );
    let [recordingId] = recordings.filter(
      recording =>
        recording.studyName === sorting.studyName &&
        recording.name === sorting.recordingName
    );
    if (recordingId) {
      sorting.recording = recordingId._id;
    } else {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t No recording found for sorting result \n",
        sorting
      );
      process.exit();
    }
    // Match sorting.studyName to the study.name and add the id;
    const studies = JSON.parse(
      fs.readFileSync(data_directory + "/cleanedData/studies.json", "utf-8")
    );
    let [studyId] = studies.filter(study => study.name === sorting.studyName);
    if (studyId) {
      sorting.study = studyId;
    } else {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t No study found for sorting result \n",
        sorting
      );
      process.exit();
    }
    // Match sorting.sorter to the sorter._id;
    const sorters = JSON.parse(
      fs.readFileSync(data_directory + "/cleanedData/sorters.json", "utf-8")
    );
    let [sorterId] = sorters.filter(
      sorter => sorter.name === sorting.sorterName
    );
    if (sorterId) {
      sorting.sorter = sorterId._id;
    } else {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t No sorter found for sorting result \n",
        sorting
      );
      process.exit();
    }
  });
  console.log("\t 🌱 Sorting Results formatted.");
  return rawSortingResults;
}

async function formatUnitResults() {
  console.info('Formatting unit results...');

  // move these outside loop
  const recordings = JSON.parse(
    fs.readFileSync(data_directory + "/cleanedData/recordings.json", "utf-8")
  );
  const studies = JSON.parse(
    fs.readFileSync(data_directory + "/cleanedData/studies.json", "utf-8")
  );
  const sorters = JSON.parse(
    fs.readFileSync(data_directory + "/cleanedData/sorters.json", "utf-8")
  );

  let unit_results_lookup = {};

  rawUnitResults.forEach(result => {
    // Move string names to string properties
    result.recordingName = result.recording;
    result.studyName = result.study;
    result.sorterName = result.sorter;
    result.snr = 0.0;

    // Match result.studyName && result.recordingName to a recording._id;
    let [recordingId] = recordings.filter(
      recording =>
        recording.studyName === result.studyName &&
        recording.name === result.recordingName
    );
    if (recordingId) {
      result.recording = recordingId._id;
    } else {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t No recording found for unit result \n",
        result
      );
      process.exit();
    }

    // Match result.studyName to the study.name and add it;
    let [studyId] = studies.filter(study => study.name === result.studyName);
    if (studyId) {
      result.study = studyId;
    } else {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t No study found for sorting result \n",
        sorting
      );
      process.exit();
    }

    // Match result.sorter to the sorter._id;
    let [sorterId] = sorters.filter(
      sorter => sorter.name === result.sorterName
    );
    if (sorterId) {
      result.sorter = sorterId._id;
    } else {
      console.log(
        "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t No sorter found for unit result \n",
        result
      );
      process.exit();
    }

    result.spikesprayUrl = '';

    let code0 = `${result.studyName}--${result.recordingName}--${result.sorterName}--${result.unitId}--${result.bestSortedUnitId}`;
    unit_results_lookup[code0] = result;
  });

  console.info(`Loading spikesprays...`);

  let num_spikesprays = 0;
  rawSpikeSprays.forEach(spikeSpray => {
    let code0 = `${spikeSpray.studyName}--${spikeSpray.recordingName}--${spikeSpray.sorterName}--${spikeSpray.trueUnitId}--${spikeSpray.sortedUnitId}`;
    if (code0 in unit_results_lookup) {
      unit_results_lookup.spikesprayUrl = spikeSpray.spikesprayUrl;
      num_spikesprays++;
    }
  });

  console.info(`Loaded ${num_spikesprays} spikesprays.`);

  return rawUnitResults;
}

async function fetchUnitResultsWithSNR(cleanUnitResults) {
  console.info('Fetching unit results with SNR...');
  const trueunits = JSON.parse(
    fs.readFileSync(data_directory + "/cleanedData/trueunits.json", "utf-8")
  );
  let unitResultsWithSNR = [];
  console.log("\n 🥞 Starting Unit Result SNR transfer.");

  // this is to avoid the previous double-for-loop
  let true_units_by_code = {};
  for (let i = 0; i < trueunits.length; i++) {
    tu = trueunits[i];
    let code0 = tu.recordingName + '--' + tu.studyName + '--' + tu.unitId;
    true_units_by_code[code0] = tu;
  }
  for (let index = 0; index < cleanUnitResults.length; index++) {
    let ur = cleanUnitResults[index];
    let true_unit_code = ur.recordingName + '--' + ur.studyName + '--' + ur.unitId;
    if (true_unit_code in true_units_by_code) {
      let tu = true_units_by_code[true_unit_code];
      ur.snr = tu.snr;
      unitResultsWithSNR.push(ur);
    }
    else {
      console.error('Unable to find true unit for unit result.', true_unit_code, ur);
      process.exit(-1);
    }
  }
  if (unitResultsWithSNR.length !== cleanUnitResults.length) {
    console.log(
      "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t Unmatched unit results without SNR \n"
    );
    process.exit();
  }
  console.log("\t 🌱 Unit Results formatted.");
  return unitResultsWithSNR;
}

function deleteFile(file) {
  try {
    fs.unlinkSync(file);
  } catch (e) {
    console.error(e);
  }
}

async function emptyDataFolder(directory) {
  let files = await fs_readdir(directory);
  let filePaths = files.map(file => path.join(directory, file));
  filePaths.forEach(file => {
    deleteFile(file);
  });
}

async function formatAndLoadData() {
  // Sorters
  await loadIntoDB(Sorter, rawSorters, "Sorters");
  await writeCleanData(Sorter, "sorters");

  // Algorithms
  await loadIntoDB(Algorithm, rawAlgorithms, "Algorithms");
  await writeCleanData(Algorithm, "algorithms");

  // Study Sets
  await loadIntoDB(StudySet, rawStudySets, "Study sets");
  await writeCleanData(StudySet, "studysets");

  // Studies
  let cleanStudies = await formatStudies();
  await loadIntoDB(Study, cleanStudies);
  await writeCleanData(Study, "studies");

  // True Units
  let cleanTrueUnits = await formatTrueUnits();
  await loadIntoDB(TrueUnit, cleanTrueUnits, "True units");
  await writeCleanData(TrueUnit, "trueunits");

  // Recordings
  let cleanRecordings = await formatRecordings();
  await loadIntoDB(Recording, cleanRecordings, "Recordings");
  await writeCleanData(Recording, "recordings");

  // Sorting Results
  let cleanSortingResults = await formatSortingResults();
  await loadIntoDB(SortingResult, cleanSortingResults, "Sorting results");
  await writeCleanData(SortingResult, "sortingresults");

  // Unit Results
  let cleanUnitResults = await formatUnitResults();
  let unitResultsWithSNR = await fetchUnitResultsWithSNR(cleanUnitResults);
  await loadIntoDB(UnitResult, unitResultsWithSNR, "Unit results");
  await writeCleanData(UnitResult, "unitresults");

  // Delete WIP Files
  await emptyDataFolder(data_directory + "/cleanedData");
  // await emptyDataFolder(data_directory + "/rawData");
  console.log(`🗑️  All used data files in the trash.`);

  console.log(
    "\n 👍👍👍👍👍👍👍👍 it's Done! \n\n 🐧 Data formatted, loaded into the DB, and deleted from the repo.🐧"
  );
  process.exit();
}

formatAndLoadData();
