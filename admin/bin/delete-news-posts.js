#!/usr/bin/env node

require("dotenv").config({ path: __dirname + "/../../.env" });

function print_usage() {
  // used below
  console.info("USAGE:");
  console.info("./delete-news-posts.js [database_url]");
  console.info(
    "If --database-from-env is specified, the DATABASE environment variable (from .env) will be used for the database url."
  );
  console.info(
    "If --database-from-env-prod is specified, the DATABASE_PROD environment variable (from .env) will be used for the database url."
  );
}

// parse the arguments
let arg1 = process.argv[2] || null;

let database_url = arg1;

if (process.argv.includes("--database-from-env")) {
  database_url = process.env.DATABASE;
}
if (process.argv.includes("--database-from-env-prod")) {
  database_url = process.env.DATABASE_PROD;
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
const NewsPost = require("../../models/NewsPost");

async function deleteData() {
  console.log("😢😢 Goodbye news posts...");
  await NewsPost.remove();
  console.log("News posts Deleted.\n");
  process.exit();
}

if (process.argv.includes("--delete")) {
  deleteData();
} else {
  console.log("You must pass the --delete flag. This is precautionary.");
}
