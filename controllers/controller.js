const KBucketClient = require("@magland/kbucket").KBucketClient; // Import KBucket and configure for spikeforest
let kbclient = new KBucketClient();
kbclient.setConfig({ share_ids: ["spikeforest.spikeforest2"] });
kbclient.setPairioConfig({ collections: ["spikeforest"] });

exports.getDatasets = async (req, res) => {
  const studiesProcessed = await kbclient.loadObject(null, {
    key: { name: "spikeforest_studies_processed" }
  });
  if (studiesProcessed) {
    console.log("success", `Successfully loaded studies`);
    res.send(studiesProcessed);
  } else {
    console.log("error", `did no load studies`);
    res.send("No studies!");
  }
  // req.flash('success', 'You are seeing a flash message 👋');
};
