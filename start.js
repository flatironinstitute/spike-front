const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const promisify = require("es6-promisify");
const flash = require("connect-flash");
const controller = require("./controllers/controller");
const errorHandlers = require("./handlers/errorHandlers");

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// An api endpoint that returns a short list of items
app.get("/api/getDatasets", controller.getDatasets);

// Handles any requests that don't match the ones above
// router.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

// // Takes the raw requests and turns them into usable properties on req.body
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // flash middleware let's us use req.flash('error', 'Farts!'), which will then pass that message to the next page the user requests
// app.use(flash());

// // pass variables to our templates + all requests
// app.use((req, res, next) => {
//   res.locals.flashes = req.flash();
//   next();
// });

// // promisify some callback based APIs
// app.use((req, res, next) => {
//   req.login = promisify(req.login, req);
//   next();
// });

// // If that above routes didnt work, we 404 them and forward to error handler
// app.use(errorHandlers.notFound);

// // error handlers will see if these errors are just validation errors
// app.use(errorHandlers.flashValidationErrors);

// // otherwise this was a really bad error we didn't expect! eek
// if (app.get("env") === "development") {
//   /* Development Error Handler - Prints stack trace */
//   app.use(errorHandlers.developmentErrors);
// }

// // production error handler
// app.use(errorHandlers.productionErrors);

app.set("port", process.env.PORT || 5000);
const server = app.listen(app.get("port"), () => {
  console.log(`🏃‍🤸‍ Express running → PORT ${server.address().port} 🏃‍🤸‍`);
});

module.exports = app;
