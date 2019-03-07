const Sentry = require("@sentry/node");
Sentry.init({
  dsn: "https://a7b7f1b624b44a9ea537ec1069859393@sentry.io/1365884"
});

/* Express Isomorphic
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
var fs = require("fs");
const port = process.env.PORT || 5000;
const recDetails = require("./stubData/recordingDetails.js");
const fakeResult = require("./stubData/fakeResult.js");
// const mail = require("./email/mail");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  // Allow isomorphic requests
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

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

// TODO: Move to a controller
/* KBucket  
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({
  share_ids: ["spikeforest.spikeforest1"]
});
kbclient.setPairioConfig({
  collections: ["spikeforest"]
});

/* API 
–––––––––––––––––––––––––––––––––––––––––––––––––– */
// TODO: Convert this to the actual request for data from KBUCKET on the results controller
// Currently pulling data from a stub data json
app.get("/api/:study/:sorter", (req, res) => {
  let study = req.params.study;
  let sorter = req.params.sorter;
  res.send({ results: fakeResult });
});

app.get("/api/:study/:sorter/:recording", (req, res) => {
  let study = req.params.study;
  let sorter = req.params.sorter;
  let recording = req.params.recording;
  // TODO: Will I need to do this formatting from the server?
  let formatted = formatSpikes(recDetails);
  res.send({ recordingDetails: formatted });
});

app.post("/api/contact", (req, res) => {
  // TODO: Attach to mail server when credit card is available.
  console.log("🗺️", req.body);
  res.send({
    success: true
  });
});

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

// spikes.forEach(timepoint, i) => {
//   console.log(🎭, timepoint, i);
// });
// let XYcoords = spikeArr.map((spike, i) => {
//   let timeVal = 1.67 * i;
//   return { x: timeVal, y: spike };
// });
// console.log("🤟", XYcoords);
