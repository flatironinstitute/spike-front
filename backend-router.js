const express = require("express");
const router = express.Router();

const recordingController = require("./controllers/recordingController");
const sorterController = require("./controllers/sorterController");
const sortingResultController = require("./controllers/sortingResultController");
const studyController = require("./controllers/studyController");
const studySetController = require("./controllers/studySetController");
const trueUnitController = require("./controllers/trueUnitController");
const unitResultsController = require("./controllers/unitResultsController");

// Recordings
router.get("/recordings", recordingController.getRecordings);
router.get("/recording/:id", recordingController.getRecordingById);

// Sorters
router.get("/sorters", sorterController.getSorters);
router.get("/storter/:id", sorterController.getSorterById);

// Sorting Results
router.get("/sortingresults", sortingResultController.getSortingResults);
router.get("/sortingresult/:id", sortingResultController.getSortingResultsById);
// TODO: write pairing routes
// router.get(
//   "/results/:studyId/:sorterId",
//   sortingResultController(
//     sortingResultController.getSortingResultsByStudySorter
//   )
// );

// Studies
router.get("/studies", studyController.getStudies);
router.get("/study/:id", studyController.getStudyById);

// Study Sets
router.get("/studysets", studySetController.getStudySets);
router.get("/studyset/:id", studySetController.getStudySetById);

// True Units
router.get("/trueunits", trueUnitController.getTrueUnits);
router.get("/trueunit/:id", trueUnitController.getTrueUnitById);
// TODO:
// router.get("/units/:studyId", trueUnitController.getTrueUnitsByStudy);

// Unit Results
router.get("/unitresults", unitResultsController.getUnitResults);
router.get("/unitresult/:id", unitResultsController.getUnitResultById);

module.exports = router;
