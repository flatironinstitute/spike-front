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

// import all the blank clean data files
const sorters = JSON.parse(
  fs.readFileSync(__dirname + "/cleanedData/sorters.json", "utf-8")
);
const studysets = JSON.parse(
  fs.readFileSync(__dirname + "/cleanedData/studysets.json", "utf-8")
);
const studies = JSON.parse(
  fs.readFileSync(__dirname + "/cleanedData/studies.json", "utf-8")
);
const recordings = JSON.parse(
  fs.readFileSync(__dirname + "/cleanedData/recordings.json", "utf-8")
);
const trueunits = JSON.parse(
  fs.readFileSync(__dirname + "/cleanedData/trueunits.json", "utf-8")
);
const sortingresults = JSON.parse(
  fs.readFileSync(__dirname + "/cleanedData/sortingresults.json", "utf-8")
);
const unitresults = JSON.parse(
  fs.readFileSync(__dirname + "/cleanedData/unitresults.json", "utf-8")
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
  const trueUnitsPromise = Study.find();
  const [trueunits] = await Promise.all([trueUnitsPromise]);
  await writeNewFile("trueunits", trueunits);
}

async function formatRecordings() {
  rawRecordings.forEach(recording => {
    // Add study id from study name
    // Collect true units
  });
}

async function loadRecordings(cleanRecordings) {}
async function writeCleanRecordings() {}

async function formatAndLoadData() {
  // Sorters
  await loadSorters();
  await writeCleanSorters();
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
  // let cleanRecordings = await formatRecordings();
  // await loadRecordings(cleanRecordings);
  // await writeCleanRecordings();

  // Soring Resutlts

  // Unit Results

  console.log("\n 👍👍👍👍👍👍👍👍 Done! \n\n\t Data formatted and loaded.");
  process.exit();
}

formatAndLoadData();
