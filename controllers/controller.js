const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({ share_ids: ["spikeforest.spikeforest1"] });
kbclient.setPairioConfig({ collections: ["spikeforest"] });

exports.getStudiesProcessed = async (req, res, next) => {
  let obj = await kbclient.loadObject(null, {
    key: { name: "spikeforest_studies_processed" }
  });
  if (!obj) {
    console.log("Problem loading spikeforest_studies_processed object.");
    return;
  }
  res.send(obj);
};

exports.getSortingResults = async (req, res, next) => {
  let obj = await kbclient.loadObject(null, {
    key: {
      name: "spikeforest_sorting_results",
      study: "magland_synth_noise10_K10_C4"
    }
  });
  if (!obj) {
    console.error("Problem loading spikeforest_sorting_results object.");
    return;
  }
  res.send(obj);
};
// TODO: Send name and study key as req.body
