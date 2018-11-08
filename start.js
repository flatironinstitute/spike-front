const express = require("express");
const path = require("path");
const routes = require("./routes/index");
const errorHandlers = require("./handlers/errorHandlers");
const controller = require("./controllers/controller");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Endpoint returns a complete list of studies processed and datasets.
app.get(
  "/api/getStudiesProcessed",
  errorHandlers.catchErrors(controller.getStudiesProcessed)
);

// Endpoint returns a results of sorting algos on a study (or a set)
app.get(
  "/api/getSortingResults",
  errorHandlers.catchErrors(controller.getSortingResults)
);

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// otherwise this was a really bad error we didn't expect! eek
if (app.get("env") === "development") {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`🏃‍🤸‍ Express running → PORT ${server.address().port} 🏃‍🤸‍`);
});

module.exports = app;
