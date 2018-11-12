const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({ share_ids: ["spikeforest.spikeforest1"] });
kbclient.setPairioConfig({ collections: ["spikeforest"] });

const batchArr = [
  "summarize_recordings",
  "ms4_magland_synth_dev",
  "ironclust_magland_synth_dev"
];

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

async function getABatchResult(batch) {
  let result = await kbclient.loadObject(null, {
    key: { batch_name: batch }
  });
  return result;
}

exports.getBatchResults = async (req, res, next) => {
  const promises = batchArr.map(getABatchResult);
  let allBatches = await Promise.all(promises);

  if (!allBatches) {
    return;
  }

  res.send(allBatches);
};

// Steps to get data
// 1. Get all 3 batches ✅
// 2. Get the sorting results from each batch ✅
// 3. Group the sorting results by study name and note the sorter name ✅
// 4. Make an object for each study with sub-objects for each sorter and sub-sub objects for each recording ✅
// 5. Convert the comparison with truth on each recording into a http url ✅
// 6. Make an http request to get each comparison with truth
// 7. Get the accuracy of all the firings that were sorted from this JSON and make into an array.
// 8. Add this array to the study object under the storer and recording.
