const express = require("express");
const router = express.Router();

const sorterController = require("./controllers/sorterController");
const algorithmController = require("./controllers/algorithmController");
const sortingResultController = require("./controllers/sortingResultController");
const studySetController = require("./controllers/studySetController");
const studyAnalysisResultController = require("./controllers/studyAnalysisResultController");
const generalController = require("./controllers/generalController");
const newsPostController = require("./controllers/newsPostController");
const mailer = require("./email/mailer.js");

const { catchErrors } = require("./errorHandlers");

const MountainClient = require("./mountainclient-js").MountainClient;

/* V2 Data: New Routes
–––––––––––––––––––––––––––––––––––––––––––––––––– */

let mt = new MountainClient();
mt.configDownloadFrom(["spikeforest.public", "spikeforest.public"]);

// CPU Routes
router.get("/api/cpus", catchErrors(sortingResultController.getCPUs));
// Sorters
router.get("/api/sorters", catchErrors(sorterController.getSorters));
// Algorithms
router.get("/api/algorithms", catchErrors(algorithmController.getAlgorithms));
// Sorting Results
router.get(
  "/api/sortingresults",
  catchErrors(sortingResultController.getSortingResults)
);
// Study Sets
router.get("/api/studysets", catchErrors(studySetController.getStudySets));
// Summary Stats
router.get("/api/stats", catchErrors(sortingResultController.getStats));
// News posts
router.get("/api/newsposts", newsPostController.getNewsPosts);
// Load object
router.get("/api/loadObject", async (req, res) => {
  let path = decodeURIComponent(req.query.path);

  let obj = await mt.loadObject(path);
  if (obj) {
    res.send({ success: true, object: obj });
  } else {
    res.send({ success: false });
  }
});
// Load text
router.get("/api/loadText", async (req, res) => {
  let path = decodeURIComponent(req.query.path);

  let txt = await mt.loadText(path);
  if (txt) {
    res.send({ success: true, text: txt });
  } else {
    res.send({ success: false });
  }
});
// Find file
router.get("/api/findFile", async (req, res) => {
  let path = decodeURIComponent(req.query.path);

  let url = await mt.findFile(path);
  if (url) {
    res.send({ success: true, url: url });
  } else {
    res.send({ success: false });
  }
});
// Study analysis results
router.get(
  "/api/studyanalysisresults",
  studyAnalysisResultController.getStudyAnalysisResults
);
// Study analysis result
router.get(
  "/api/studyanalysisresults/:studySetName",
  studyAnalysisResultController.getStudyAnalysisResultsForStudySet
);
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

// General
router.get("/api/general", generalController.getGeneral);

module.exports = router;
