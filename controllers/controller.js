const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({ share_ids: ["spikeforest.spikeforest1"] });
kbclient.setPairioConfig({ collections: ["spikeforest"] });

exports.getStudiesProcessed = async (req, res, next) => {
  let obj = await kbclient.loadObject(null, {
    key: { name: "spikeforest_studies_processed" }
  });
  if (!obj) {
    // req.flash("error", "Problem loading datasets object.");
    return;
  }
  // req.flash("success", "Successfully loaded spikesorted datasets 👋");
  res.send(obj);
};
