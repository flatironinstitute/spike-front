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

const sorters = JSON.parse(
  fs.readFileSync(__dirname + "/cleanedData/sorters.json", "utf-8")
);

async function writeNewFile(fileName, newData) {
  let newFileName = __dirname + `/cleanedData/${fileName}.json`;
  await fs_writeFile(newFileName, JSON.stringify(newData));
  console.log(`🗄️ 🗄️ 🗄️ Clean ${fileName}.json has been created`);
}

async function loadSorters() {
  try {
    await Sorter.insertMany(rawSorters);
    console.log("↪️↪️↪️ ️Sorters inserted into the DB!");
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
  const newSorters = await writeNewFile("sorters", sorters);
}

async function loadStudySets() {
  try {
    await StudySet.insertMany(rawStudySets);
    console.log("↪️↪️↪️ Study Sets inserted into the DB!");
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
  const newstudysets = await writeNewFile("studysets", studysets);
}

async function formatStudies() {
  rawStudies.forEach(study => {
    // Add studySet id
    let [setId] = studySets.filter(set => set.name === study.studySet);
    // Add sorter id array based on sorterNames property
    if (setId) {
      console.log(setId);
    } else {
      console.log("bogus no id");
    }
  });
}

async function loadStudies() {}

async function writeCleanStudies() {}

async function formatAndLoadData() {
  // Sorters
  await loadSorters();
  await writeCleanSorters();
  // Study Sets
  await loadStudySets();
  await writeCleanStudySets();
  // Studies
  await formatStudies();

  console.log("\n 👍👍👍👍👍👍👍👍 Done! \n\n\t Data formatted and loaded.");
  process.exit();
}

formatAndLoadData();
