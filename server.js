const Sentry = require("@sentry/node");

const IS_DEBUG = true;
Sentry.init({
  dsn: "https://a7b7f1b624b44a9ea537ec1069859393@sentry.io/1365884",
  beforeSend: (event, hint) => {
    if (IS_DEBUG) {
      console.error(hint.originalException || hint.syntheticException);
      return null; // this drops the event and nothing will be send to sentry
    }
    return event;
  }
});
// import environmental variables from our variables.env file
require("dotenv").config({ path: ".env" });

/* Express Isomorphic
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const apiroutes = require("./apiroutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  // Allow isomorphic requests
  let clientUri = process.env.CLIENT_URI || "http://localhost:3000";
  res.setHeader("Access-Control-Allow-Origin", clientUri);

  // Request methods
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  // Request headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Include cookies in the requests sent to the API (sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // onward
  next();
});

/* API
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// Handle all the api routing!
app.use("/", apiroutes);

/* Client Server
–––––––––––––––––––––––––––––––––––––––––––––––––– */
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.listen(port, () => console.log(`🖥️  Server listening on port ${port}`));
