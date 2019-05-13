const express = require("express");
const router = express.Router();

const recordingController = require("./controllers/recordingController");
const sorterController = require("./controllers/sorterController");
const algorithmController = require("./controllers/algorithmController");
const sortingResultController = require("./controllers/sortingResultController");
const studyController = require("./controllers/studyController");
const studySetController = require("./controllers/studySetController");
const trueUnitController = require("./controllers/trueUnitController");
const unitResultsController = require("./controllers/unitResultsController");
const studyAnalysisResultController = require("./controllers/studyAnalysisResultController");
const mailer = require("./email/mailer.js");

/* V2 Data: New Routes
–––––––––––––––––––––––––––––––––––––––––––––––––– */

// CPU Routes
router.get("/api/cpus", sortingResultController.getCPUs);
// Grouped Unit Results
router.get("/api/groupedurs", unitResultsController.getGroupedUnitResults);
// Recordings
router.get("/api/recordings", recordingController.getRecordings);
// Sorters
router.get("/api/sorters", sorterController.getSorters);
// Algorithms
router.get("/api/algorithms", algorithmController.getAlgorithms);
// Sorting Results
router.get("/api/sortingresults", sortingResultController.getSortingResults);
// Studies
router.get("/api/studies", studyController.getStudies);
// Study Sets
router.get("/api/studysets", studySetController.getStudySets);
// Summary Stats
router.get("/api/stats", sortingResultController.getStats);
// True Units
router.get("/api/trueunits", trueUnitController.getTrueUnits);
// Unit Results
router.get("/api/unitresults", unitResultsController.getUnitResults);
router.get(
  "/api/ursbystudy/:name",
  unitResultsController.getUnitResultsByStudy
);
// Study analysis results
router.get("/api/studyanalysisresults", studyAnalysisResultController.getStudyAnalysisResults);
// Contact Routes
router.post("/api/contact", async (req, res) => {
  try {
    let sent = await mailer.send(req.body);
    res.send({
      success: true
    });
  } catch (e) {
    //TODO: Add Sentry logging
    console.log("Error", e);
  }
});

module.exports = router;

/* Unused Route Stubs
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// // Recordings
// router.get("/api/recording/:id", recordingController.getRecordingById);

// // Sorters
// router.get("/api/sorters", sorterController.getSorters);
// router.get("/api/storter/:id", sorterController.getSorterById);

// // Sorting Results
// router.get(
//   "/api/sortingresult/:id",
//   sortingResultController.getSortingResultById
// );

// // Studies
// router.get("/api/studies", studyController.getStudies);
// router.get("/api/study/:id", studyController.getStudyById);

// // Study Sets
// router.get("/api/studyset/:id", studySetController.getStudySetById);

// // True Units
// router.get("/api/trueunit/:id", trueUnitController.getTrueUnitById);

// // Unit Results
// router.get("/api/unitresults", unitResultsController.getUnitResults);
// router.get("/api/unitresult/:id", unitResultsController.getUnitResultById);
