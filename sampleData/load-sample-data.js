require("dotenv").config({ path: __dirname + "/../.env" });
const fs = require("fs");

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// import all of our models - they need to be imported only once
const Sorter = require("../models/Sorter");
const Study = require("../models/Study");
const StudySet = require("../models/StudySet");
// const Recording = require("../models/Recording");
// const Unit = require("../models/Unit");
// const UnitResult = require("../models/UnitResult");

const sorters = JSON.parse(
  fs.readFileSync(__dirname + "/sorters.json", "utf-8")
);
const studies = JSON.parse(
  fs.readFileSync(__dirname + "/studies.json", "utf-8")
);
const studysets = JSON.parse(
  fs.readFileSync(__dirname + "/studysets.json", "utf-8")
);
// const recordings = JSON.parse(
//   fs.readFileSync(__dirname + "/recordings.json", "utf-8")
// );
// const units = JSON.parse(fs.readFileSync(__dirname + "/units.json", "utf-8"));
// const unitresults = JSON.parse(
//   fs.readFileSync(__dirname + "/unitresults.json", "utf-8")
// );

async function deleteData() {
  console.log("😢😢 Goodbye Data...");
  await Sorter.remove();
  await Study.remove();
  await StudySet.remove();
  //   await Recording.remove();
  //   await Unit.remove();
  //   await UnitResult.remove();
  console.log(
    "Data Deleted. To load sample data, run\n\n\t yarn run sample\n\n"
  );
  process.exit();
}

async function loadData() {
  try {
    await Sorter.insertMany(sorters);
    await Study.insertMany(studies);
    await StudySet.insertMany(studysets);
    //   await Recording.insertMany(recordings);
    //   await Unit.insertMany(units);
    //   await UnitResult.insertMany(unitresults);

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
