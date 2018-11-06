const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({ share_ids: ["spikeforest.spikeforest1"] });
kbclient.setPairioConfig({ collections: ["spikeforest"] });

// TODO: Rename these functions according to their process.

exports.loadDatasets = async (req, res) => {
  let obj = await kbclient.loadObject(null, {
    key: { name: "spikeforest_studies_processed" }
  });
  if (!obj) {
    // req.flash('error', 'Password reset is invalid or has expired');
    console.error("Problem loading datasets object.");
  }
  // req.flash('success', 'You are seeing a flash message 👋');
  res.send(obj);
};
