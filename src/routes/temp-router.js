const express = require("express");
const router = express.Router();
const sorterController = require("../controllers/sorterController");
const sortingResultController = require("../controllers/sortingResultController");
const unitsController = require("../controllers/unitsController");
const studyController = require("../controllers/studyController");
const { catchErrors } = require("../handlers/errorHandlers");

// Sorters
router.get("/sorters", catchErrors(sorterController.getSorters));
router.get("/storter/:id", catchErrors(sorterController.getSorterById));

// Studies
router.get("/studies", catchErrors(studyController.getStudies));
router.get("/study/:id", catchErrors(studyController.getStudyById));

// Sorting Results
router.get(
  "/results/:studyId/:sorterId",
  catchErrors(
    sortingResultController(
      sortingResultController.getSortingResultsByStudySorter
    )
  )
);

// Units
router.get("/units/:studyId", catchErrors(unitsController.getUnitsByStudy));
router.get("/unit/:id", catchErrors(unitsController.getUnitById));

module.exports = router;
