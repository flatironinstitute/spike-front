const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const { catchErrors } = require("../handlers/errorHandlers");

// An api endpoint that returns a complete list of studies processed and datasets.
router.get(
  "/api/getStudiesProcessed",
  catchErrors(controller.getStudiesProcessed)
);

module.exports = router;
