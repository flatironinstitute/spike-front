require("dotenv").config({ path: __dirname + "/../.env" });
const fs = require("fs");

const sorters = JSON.parse(
  fs.readFileSync(__dirname + "/sorters.json", "utf-8")
);
const studysets = JSON.parse(
  fs.readFileSync(__dirname + "/studysets.json", "utf-8")
);
const studies = JSON.parse(
  fs.readFileSync(__dirname + "/studies.json", "utf-8")
);
const idRecordings = JSON.parse(
  fs.readFileSync(__dirname + "/recordings_withId.json", "utf-8")
);
const recordings = JSON.parse(
  fs.readFileSync(__dirname + "/recordings.json", "utf-8")
);
const trueunits = JSON.parse(
  fs.readFileSync(__dirname + "/trueunits.json", "utf-8")
);
const sortingresults = JSON.parse(
  fs.readFileSync(__dirname + "/SortingResults.json", "utf-8")
);
const unitresults = JSON.parse(
  fs.readFileSync(__dirname + "/UnitResults.json", "utf-8")
);

function mapNewUnits() {
  return unitresults.map(result => {
    let sorterMatch = sorters.filter(sorter => {
      return sorter.name === result.sorter;
    });
    if (sorterMatch.length) {
      result.sorter = sorterMatch[0]._id;
    }
    let studyMatch = studies.filter(study => {
      return study.name === result.study;
    });
    if (studyMatch.length) {
      result.study = studyMatch[0]._id;
    }
    let recordingsMatch = recordings.filter(recording => {
      return (
        recording.name === result.recording &&
        recording.study.$oid === result.study
      );
    });
    if (recordingsMatch.length) {
      result.recording = recordingsMatch[0]._id.$oid;
    }
    return result;
  });
}

function AddIdsToUnits() {
  return recordings.map(recording => {
    let recordingsMatch = idRecordings.filter(idrecord => {
      return (
        idrecord.name === recording.name &&
        idrecord.study.$oid === recording.study
      );
    });
    if (recordingsMatch.length) {
      recording._id = recordingsMatch[0]._id.$oid;
    }
    return recording;
  });
}

function writeNewFile() {
  let newUnits = AddIdsToUnits();
  fs.writeFile("./recordings02.json", JSON.stringify(newUnits), err => {
    if (err) {
      console.log("😭👎😭", err);
      return;
    }
    console.log("🗄️🗄️🗄️  File has been created");
  });
  console.log("👍👍👍👍👍👍👍👍 Done!");
}

function validateUnits() {
  let boguses = [];
  trueunits.forEach(unit => {
    if (unit.study.length !== 24 && unit.recording.length !== 24) {
      let bogi = boguses.filter(bogus => bogus.study === unit.study);
      !bogi.length ? boguses.push(unit) : null;
    }
  });
  console.log(boguses);
}

writeNewFile();
// validateUnits();
