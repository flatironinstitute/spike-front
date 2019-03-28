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
    "Data Deleted. To load data, run\n\n\t yarn run cleanthenload\n\n"
  );
  process.exit();
}

async function loadData() {
  console.log(
      "\n👎👎👎👎👎👎👎👎 Error! This function has been depreciated. To format the raw spikeforest data and load the database run, \n\n\t yarn run cleanthenload\n\n\n"
    );
}

if (process.argv.includes("--delete")) {
  deleteData();
} else {
  loadData();
}
