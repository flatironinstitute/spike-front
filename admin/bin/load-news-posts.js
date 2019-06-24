#!/usr/bin/env node

require("dotenv").config({ path: __dirname + "/../../.env" });
const fs = require("fs");
const util = require("util");
const path = require("path");
const fs_writeFile = util.promisify(fs.writeFile);
// const fs_unlink = util.promisify(fs.unlinkSync);
const fs_readdir = util.promisify(fs.readdir);
const assert = require("assert");

function print_usage() {
  // used below
  console.info("USAGE:");
  console.info("./load-news-posts.js [data_directory] [database_url]");
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

let data_directory = arg1;
let database_url = arg2;

if (process.argv.includes("--database-from-env")) {
  database_url = process.env.DATABASE;
}
if (process.argv.includes("--database-from-env-prod")) {
  database_url = process.env.DATABASE_PROD;
}

// print usage if insufficient args
if (!data_directory || !database_url) {
  print_usage();
  process.exit(-1);
}

console.info(`USING DATABASE: ${database_url}`);

// checks
assert(
  fs.lstatSync(data_directory).isDirectory(),
  `Not a directory: ${data_directory}`
);

const mongoose = require("mongoose");
mongoose.connect(database_url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

// import all of the models
const NewsPost = require("../../models/NewsPost");

// import all the raw data
const newsPosts = JSON.parse(
  fs.readFileSync(data_directory + "/NewsPosts.json", "utf-8")
);

async function loadIntoDB(model, data, name) {
  try {
    await model.insertMany(data);
    console.log(` 😎 😎 😎 ${name} in DB...`);
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

async function formatAndLoadData() {
  // Sorters
  await loadIntoDB(NewsPost, newsPosts, "NewsPosts");

  console.log(
    "\n 👍👍👍👍👍👍👍👍 Data has been loaded into the DB.🐧"
  );
  process.exit();
}

formatAndLoadData();
