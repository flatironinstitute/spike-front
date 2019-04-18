const express = require("express");
const router = express.Router();

const recordingController = require("./controllers/recordingController");
const sorterController = require("./controllers/sorterController");
const sortingResultController = require("./controllers/sortingResultController");
const studyController = require("./controllers/studyController");
const studySetController = require("./controllers/studySetController");
const trueUnitController = require("./controllers/trueUnitController");
const unitResultsController = require("./controllers/unitResultsController");

const recDetails = require("./stubData/recordingDetails.js");
const fakeResult = require("./stubData/fakeResult.js");

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
// Studies
router.get("/api/studies", studyController.getStudies);
// Study Sets
router.get("/api/studysets", studySetController.getStudySets);
// Summary Stats
router.get("/api/stats", sortingResultController.getStats);
// Unit Results
router.get("/api/unitresults", unitResultsController.getUnitResults);

// Contact Routes
router.post("/api/contact", (req, res) => {
  // TODO: Attach to mail server
  console.log("🗺️ Email sent fake", req.body);
  res.send({
    success: true
  });
});

/* Old Shiz & Existing Routes
–––––––––––––––––––––––––––––––––––––––––––––––––– */
router.get("/api/:study/:sorter", (req, res) => {
  let study = req.params.study;
  let sorter = req.params.sorter;
  res.send({ results: fakeResult });
});

router.get("/api/:study/:sorter/:recording", (req, res) => {
  let study = req.params.study;
  let sorter = req.params.sorter;
  let recording = req.params.recording;
  // TODO: Will I need to do this formatting from the server?
  let formatted = formatSpikes(recDetails);
  res.send({ recordingDetails: formatted });
});

// 4 spike columns - columns
// 20 spikes - line color groups
// 4 channels - 4lines of 50 xys
// 50 timepoints -> become 50 xy coordinates

function formatSpikes(recDetails) {
  const keys = Object.keys(recDetails);
  var formatted = new Object();
  for (const key of keys) {
    let newChannel = recDetails[key].map(spikeArr => {
      return spikeArr.map(timepoints => {
        return timepoints.map((timepoint, i) => {
          let timeVal = 1.67 * i;
          return { x: timeVal, y: timepoint };
        });
      });
    });
    formatted[key] = newChannel;
  }
  return formatted;
}
module.exports = router;

/* Route Stubs
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// // Recordings
// router.get("/api/recording/:id", recordingController.getRecordingById);

// // Sorters
// router.get("/api/sorters", sorterController.getSorters);
// router.get("/api/storter/:id", sorterController.getSorterById);

// // Sorting Results
// router.get("/api/sortingresults", sortingResultController.getSortingResults);
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
// router.get("/api/trueunits", trueUnitController.getTrueUnits);
// router.get("/api/trueunit/:id", trueUnitController.getTrueUnitById);

// // Unit Results
// router.get("/api/unitresults", unitResultsController.getUnitResults);
// router.get("/api/unitresult/:id", unitResultsController.getUnitResultById);
