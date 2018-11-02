const express = require("express");
const path = require("path");
// import { KBucketClient } from "@magland/kbucket";

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// An api endpoint that returns a short list of items
app.get("/api/getDatasets", (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log("Sent list of items");
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);

// const kbclient = new KBucketClient();
// kbclient.setConfig({ share_ids: ["spikeforest.spikeforest1"] });
// kbclient.setPairioConfig({ collections: ["spikeforest"] });

// componentDidMount() {
//   this.fetchKBData()
//     .then(res => {
//       console.log(res.json);
//       return;
//     })
//     .catch(err => console.log(err));
// }

// fetchKBData = async () => {
//   let obj = await kbclient.loadObject(null, {
//     key: { name: "spikeforest_studies_processed" }
//   });
//   if (!obj) {
//     console.error("Problem loading object.");
//     return;
//   }
//   console.log("in the fetch");
//   return obj;
// };
