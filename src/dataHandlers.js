const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({ share_ids: ["spikeforest.spikeforest1"] });
kbclient.setPairioConfig({ collections: ["spikeforest"] });

const batchArr = [
  "ms4_magland_synth_dev3",
  "irc_magland_synth_dev3",
  "sc_magland_synth_dev3"
];

// TODO: Do I need this?
export async function getStudiesProcessed() {
  let obj = await kbclient.loadObject(null, {
    key: { name: "spikeforest_studies_processed" }
  });
  if (!obj) {
    console.log("Problem loading spikeforest_studies_processed object.");
    return;
  }
  return obj;
}

export async function getRecordingsSummary() {
  let obj = await kbclient.loadObject(null, {
    key: { batch_name: "summarize_recordings", name: "job_results" }
  });
  if (!obj) {
    console.log("Problem loading summarize_recordings object.");
    return;
  }
  return obj;
}

export async function getANewBatchResult(batch) {
  let result = await kbclient.loadObject(null, {
    key: { batch_name: batch, name: "job_results" }
  });
  // TODO: add error function
  if (!result) {
    console.log(`🚒 Problem loading the batch ${batch}`);
  }
  return result;
}

export async function getBatchResults() {
  const promises = batchArr.map(getANewBatchResult);
  let allBatches = await Promise.all(promises);
  if (!allBatches) {
    console.log(`🚒 Problem loading all the batches`);
    return;
  }
  return allBatches;
}

export async function getSortingResults(allBatches) {
  const jobResults = allBatches.map(batch => batch.job_results).flat();
  const justResults = jobResults.map(job => job.result);
  const withAccuracy = await getAccuracy(justResults);
  const organized = await organizeSortingResults(withAccuracy);
  return organized;
}

export async function getAccuracy(jobResults) {
  const urlPromises = jobResults.map(getAccuracyUrl);
  let withAccuracyUrl = await Promise.all(urlPromises);
  const jsonPromises = withAccuracyUrl.map(getAccuracyJSON);
  let withAccuracyJSON = await Promise.all(jsonPromises);
  return withAccuracyJSON;
}

export async function getAccuracyUrl(jobResult) {
  let accuracy = await kbclient.findFile(jobResult.comparison_with_truth.json);

  const withAccuracyUrl = Object.assign(
    { accuracy: { url: accuracy, json: {} } },
    jobResult
  );
  return withAccuracyUrl;
}

export async function getAccuracyJSON(withAccuracyUrl) {
  // Fetch the contents of each Accuracy JSON
  let accuracyJSON = await fetch(withAccuracyUrl.accuracy.url)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
  withAccuracyUrl.accuracy.json = accuracyJSON;
  // Make an array of the accuracy values for easier visualization
  let accuracyArr = [];
  for (var item in accuracyJSON) {
    accuracyArr.push(accuracyJSON[item].Accuracy);
  }
  withAccuracyUrl.accuracy.accuracy_array = accuracyArr;
  return withAccuracyUrl;
}

export function organizeSortingResults(unsorted) {
  // Group and flatten the results data
  function groupBy(array, f) {
    var groups = {};
    array.forEach(function(o) {
      var group = JSON.stringify(f(o));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function(group) {
      return groups[group];
    });
  }

  let grouped = groupBy(unsorted, function(item) {
    return [item.study_name, item.sorter_name];
  });

  let flattened = grouped.map(group => {
    let accuracies = group.map(d => d.accuracy.accuracy_array);
    accuracies = accuracies.reduce((a, b) => a.concat(b), []);
    return {
      study: group[0].study_name,
      sorter: group[0].sorter_name,
      accuracy: accuracies
    };
  });
  return flattened;
}

// float number = Float.parseFloat(numberAsString);
