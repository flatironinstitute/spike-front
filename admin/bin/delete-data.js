#!/usr/bin/env node

require("dotenv").config({ path: __dirname + "/../../.env" });
const fs = require("fs");

function print_usage() {
  // used below
  console.info('USAGE:');
  console.info('./delete-data.js [database_url]');
  console.info('If --database-from-env is specified, the DATABASE environment variable (from .env) will be used for the database url.')
}

// parse the arguments
let arg1 = process.argv[2] || null;

let database_url = arg1;

if (process.argv.includes('--database-from-env')) {
  database_url = process.env.DATABASE;
}

// print usage if insufficient args
if (!database_url) {
  print_usage();
  process.exit(-1);
}

console.info(`USING DATABASE: ${database_url}`);

const mongoose = require("mongoose");
mongoose.connect(database_url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// import all of our models - they need to be imported only once
const Sorter = require("../../models/Sorter");
const Algorithm = require("../../models/Algorithm");
const StudySet = require("../../models/StudySet");
const Study = require("../../models/Study");
const Recording = require("../../models/Recording");
const TrueUnit = require("../../models/TrueUnit");
const SortingResult = require("../../models/SortingResult");
const UnitResult = require("../../models/UnitResult");
const SpikeSpray = require("../../models/SpikeSpray");

async function deleteData() {
  console.log("😢😢 Goodbye Data...");
  await Sorter.remove();
  await Algorithm.remove();
  await StudySet.remove();
  await Study.remove();
  await Recording.remove();
  await TrueUnit.remove();
  await SortingResult.remove();
  await UnitResult.remove();
  await SpikeSpray.remove();
  console.log(
    "Data Deleted.\n"
  );
  process.exit();
}

if (process.argv.includes("--delete")) {
  deleteData();
} else {
  console.log('You must pass the --delete flag. This is precautionary.');
}
