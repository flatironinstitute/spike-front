require("dotenv").config({ path: __dirname + "/../.env" });
const fs = require("fs");

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

// const sorters = JSON.parse(
//   fs.readFileSync(__dirname + "/sorters.json", "utf-8")
// );
// const studysets = JSON.parse(
//   fs.readFileSync(__dirname + "/studysets.json", "utf-8")
// );
// const studies = JSON.parse(
//   fs.readFileSync(__dirname + "/studies.json", "utf-8")
// );
// const recordings = JSON.parse(
//   fs.readFileSync(__dirname + "/recordings.json", "utf-8")
// );
// const trueunits = JSON.parse(
//   fs.readFileSync(__dirname + "/trueunits.json", "utf-8")
// );
// const sortingresults = JSON.parse(
//   fs.readFileSync(__dirname + "/sortingresults.json", "utf-8")
// );
// const unitresults = JSON.parse(
//   fs.readFileSync(__dirname + "/unitresults.json", "utf-8")
// );

async function deleteData() {
  console.log("😢😢 Goodbye Data...");
  await Sorter.remove();
  await StudySet.remove();
  await Study.remove();
  await Recording.remove();
  await TrueUnit.remove();
  await SortingResult.remove();
  await UnitResult.remove();
  console.log(
    "Data Deleted. To load sample data, run\n\n\t yarn run sample\n\n"
  );
  process.exit();
}

async function loadData() {
  try {
    await Sorter.insertMany(sorters);
    await StudySet.insertMany(studysets);
    await Study.insertMany(studies);
    await Recording.insertMany(recordings);
    await TrueUnit.insertMany(trueunits);
    await SortingResult.insertMany(sortingresults);
    await UnitResult.insertMany(unitresults);

    console.log("👍👍👍👍👍👍👍👍 Done!");
    process.exit();
  } catch (e) {
    console.log(
      "\n👎👎👎👎👎👎👎👎 Error! The Error info is below but if you are importing sample data make sure to drop the existing database first with.\n\n\t yarn run blowitallaway\n\n\n"
    );
    console.log(e);
    process.exit();
  }
}

if (process.argv.includes("--delete")) {
  deleteData();
} else {
  loadData();
}
