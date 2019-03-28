require("dotenv").config({ path: __dirname + "/../.env" });
const fs = require("fs");
const util = require("util");
const fs_writeFile = util.promisify(fs.writeFile);

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// import all of our models - they need to be imported only once
const Sorter = require("../models/Sorter");
const StudySet = require("../models/StudySet");
const Study = require("../models/Study");
const Recording = require("../models/Recording");
const TrueUnit = require("../models/TrueUnit");
const SortingResult = require("../models/SortingResult");
const UnitResult = require("../models/UnitResult");

// import all the raw data
const rawSorters = JSON.parse(
  fs.readFileSync(__dirname + "/rawData/Sorters.json", "utf-8")
);
const rawStudySets = JSON.parse(
  fs.readFileSync(__dirname + "/rawData/StudySets.json", "utf-8")
);
const rawStudies = JSON.parse(
  fs.readFileSync(__dirname + "/rawData/Studies.json", "utf-8")
);
const rawRecordings = JSON.parse(
  fs.readFileSync(__dirname + "/rawData/Recordings.json", "utf-8")
);
const rawTrueUnits = JSON.parse(
  fs.readFileSync(__dirname + "/rawData/TrueUnits.json", "utf-8")
);
const rawSortingResults = JSON.parse(
  fs.readFileSync(__dirname + "/rawData/SortingResults.json", "utf-8")
);
const rawUnitResults = JSON.parse(
  fs.readFileSync(__dirname + "/rawData/UnitResults.json", "utf-8")
);

async function writeNewFile(fileName, newData) {
  let newFileName = __dirname + `/cleanedData/${fileName}.json`;
  await fs_writeFile(newFileName, JSON.stringify(newData));
  console.log(`Clean ${fileName}.json saved. 💾`);
}

async function loadSorters() {
  try {
    await Sorter.insertMany(rawSorters);
    console.log(" 😎 😎 😎 Sorters in DB...");
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t yarn run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}

async function writeCleanSorters() {
  const sortersPromise = Sorter.find();
  const [sorters] = await Promise.all([sortersPromise]);
  await writeNewFile("sorters", sorters);
}

async function loadStudySets() {
  try {
    await StudySet.insertMany(rawStudySets);
    console.log(" 😎 😎 😎 Study Sets in DB...");
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t yarn run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}

async function writeCleanStudySets() {
  const studySetsPromise = StudySet.find();
  const [studysets] = await Promise.all([studySetsPromise]);
  await writeNewFile("studysets", studysets);
}

async function formatStudies() {
  rawStudies.forEach(study => {
    // Add studySet id
    const studysets = JSON.parse(
      fs.readFileSync(__dirname + "/cleanedData/studysets.json", "utf-8")
    );
    let [setId] = studysets.filter(set => set.name === study.studySet);
    if (setId) {
      study.studySet = setId._id;
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
      fs.readFileSync(__dirname + "/cleanedData/sorters.json", "utf-8")
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

async function loadStudies(cleanStudies) {
  try {
    await Study.insertMany(cleanStudies);
    console.log(" 😎 😎 😎 Studies in DB...");
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t yarn run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}

async function writeCleanStudies() {
  const studiesPromise = Study.find();
  const [studies] = await Promise.all([studiesPromise]);
  await writeNewFile("studies", studies);
}

async function formatTrueUnits() {
  rawTrueUnits.forEach(unit => {
    unit.recordingName = unit.recording;
    unit.studyName = unit.study;
    delete unit.recording;
    delete unit.study;
  });
  console.log("\t 🌱 True Units formatted.");
  return rawTrueUnits;
}

async function loadTrueUnits(cleanTrueUnits) {
  try {
    await TrueUnit.insertMany(cleanTrueUnits);
    console.log(" 😎 😎 😎 TrueUnits in DB...");
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t yarn run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}
async function writeCleanTrueUnits() {
  const trueUnitsPromise = TrueUnit.find();
  const [trueunits] = await Promise.all([trueUnitsPromise]);
  await writeNewFile("trueunits", trueunits);
}

async function formatRecordings() {
  rawRecordings.forEach(recording => {
    // Add study id from study name
    recording.studyName = recording.study;
    const studies = JSON.parse(
      fs.readFileSync(__dirname + "/cleanedData/studies.json", "utf-8")
    );
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
  });
  // Collect true units
  const trueunits = JSON.parse(
    fs.readFileSync(__dirname + "/cleanedData/trueunits.json", "utf-8")
  );
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

async function loadRecordings(cleanRecordings) {
  try {
    await Recording.insertMany(cleanRecordings);
    console.log(" 😎 😎 😎 Recordings in DB...");
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t yarn run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}

async function writeCleanRecordings() {
  const recordingsPromise = Recording.find();
  const [recordings] = await Promise.all([recordingsPromise]);
  await writeNewFile("recordings", recordings);
}

async function formatSortingResults() {
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
      fs.readFileSync(__dirname + "/cleanedData/recordings.json", "utf-8")
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
    // Match sorting.sorter to the sorter._id;
    const sorters = JSON.parse(
      fs.readFileSync(__dirname + "/cleanedData/sorters.json", "utf-8")
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

async function loadSortingResults(cleanSortingResults) {
  try {
    await SortingResult.insertMany(cleanSortingResults);
    console.log(" 😎 😎 😎 Sorting Results in DB...");
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t yarn run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}

async function writeCleanSortingResults() {
  const sortingResultsPromise = SortingResult.find();
  const [sortingresults] = await Promise.all([sortingResultsPromise]);
  await writeNewFile("sortingresults", sortingresults);
}

async function formatUnitResults() {
  rawUnitResults.forEach(result => {
    // Move string names to string properties
    result.recordingName = result.recording;
    result.studyName = result.study;
    result.sorterName = result.sorter;
    result.snr = 0.0;
    delete result.study;
  });
  rawUnitResults.forEach(result => {
    // Match result.studyName && result.recordingName to a recording._id;
    const recordings = JSON.parse(
      fs.readFileSync(__dirname + "/cleanedData/recordings.json", "utf-8")
    );
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

    // Match result.sorter to the sorter._id;
    const sorters = JSON.parse(
      fs.readFileSync(__dirname + "/cleanedData/sorters.json", "utf-8")
    );
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
  });

  return rawUnitResults;
}

async function fetchUnitResultsWithSNR(cleanUnitResults) {
  // loop through every true unit
  // filter the clean unit results where the recordingName, studyName, and unitID match
  // for each of those unit result matches, add the snr property to match the true unit
  const trueunits = JSON.parse(
    fs.readFileSync(__dirname + "/cleanedData/trueunits.json", "utf-8")
  );
  let unitResultsWithSNR = [];
  for (let i = 0; i < trueunits.length; i++) {
    for (let index = 0; index < cleanUnitResults.length; index++) {
      if (
        cleanUnitResults[index].recordingName === trueunits[i].recordingName &&
        cleanUnitResults[index].studyName === trueunits[i].studyName &&
        cleanUnitResults[index].unitId === trueunits[i].unitId
      ) {
        cleanUnitResults[index].snr = trueunits[i].snr;
        unitResultsWithSNR.push(cleanUnitResults[index]);
        console.log("🥞", cleanUnitResults[index].length, trueunits[i].length);
      }
    }
  }
  if (unitResultsWithSNR.length !== cleanUnitResults.length) {
    console.log(
      "\n 🛑🛑🛑🛑🛑🛑 Error! \n\n\t Unmatched unit results without SNR \n"
    );
    process.exit();
  }
  return unitResultsWithSNR;
  console.log("\t 🌱 Unit Results formatted.");
}

async function loadUnitResults(unitResultsWithSNR) {
  try {
    await UnitResult.insertMany(unitResultsWithSNR);
    console.log(" 😎 😎 😎 Unit Results in DB...");
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t yarn run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}

async function writeCleanUnitResults() {
  const unitResultsPromise = UnitResult.find();
  const [unitresults] = await Promise.all([unitResultsPromise]);
  await writeNewFile("unitresults", unitresults);
}

async function formatAndLoadData() {
  // Sorters
  await loadSorters();
  await writeCleanSorters();
  const sorters = JSON.parse(
    fs.readFileSync(__dirname + "/cleanedData/sorters.json", "utf-8")
  );
  // Study Sets
  await loadStudySets();
  await writeCleanStudySets();

  // Studies
  let cleanStudies = await formatStudies();
  await loadStudies(cleanStudies);
  await writeCleanStudies();

  // True Units
  let cleanTrueUnits = await formatTrueUnits();
  await loadTrueUnits(cleanTrueUnits);
  await writeCleanTrueUnits();

  // Recordings
  let cleanRecordings = await formatRecordings();
  await loadRecordings(cleanRecordings);
  await writeCleanRecordings();

  // Sorting Results
  let cleanSortingResults = await formatSortingResults();
  await loadSortingResults(cleanSortingResults);
  await writeCleanSortingResults();

  // Unit Results
  let cleanUnitResults = await formatUnitResults();
  let unitResultsWithSNR = await fetchUnitResultsWithSNR(cleanUnitResults);
  await loadUnitResults(unitResultsWithSNR);
  await writeCleanUnitResults();

  console.log(
    "\n 👍👍👍👍👍👍👍👍 it's Done! \n\n 🐧 Data formatted and loaded.🐧"
  );
  process.exit();
}

formatAndLoadData();
