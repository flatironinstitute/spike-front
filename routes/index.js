const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const { catchErrors } = require("../handlers/errorHandlers");

// Endpoint returns a complete list of studies processed and datasets.
router.get(
  "/api/getStudiesProcessed",
  catchErrors(controller.getStudiesProcessed)
);

// Endpoint returns a results of sorting algos on a study (or a set)
router.get("/api/getSortingResults", catchErrors(controller.getSortingResults));

// Endpoint returns a results of sorting algos on a study (or a set)
router.get("/api/getBatchResults", catchErrors(controller.getBatchResults));

module.exports = router;
