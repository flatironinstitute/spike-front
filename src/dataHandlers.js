const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({ share_ids: ["spikeforest.spikeforest1"] });
kbclient.setPairioConfig({ collections: ["spikeforest"] });

// New data handling functions as of 11/16/18
export async function getRecordings() {
  let obj = await kbclient.loadObject(null, {
    key: { target: "spikeforest_website", name: "recordings" }
  });
  if (!obj) {
    console.log("Problem loading recordings object.");
    return;
  }
  return obj;
}

export async function getStudies() {
  let obj = await kbclient.loadObject(null, {
    key: { target: "spikeforest_website", name: "studies" }
  });
  if (!obj) {
    console.log("Problem loading studies object.");
    return;
  }
  return obj;
}

export async function getSorters() {
  let obj = await kbclient.loadObject(null, {
    key: { target: "spikeforest_website", name: "sorters" }
  });
  if (!obj) {
    console.log("Problem loading sorters object.");
    return;
  }
  return obj;
}

export async function getTrueUnits() {
  let obj = await kbclient.loadObject(null, {
    key: { target: "spikeforest_website", name: "true_units" }
  });
  if (!obj) {
    console.log("Problem loading true units object.");
    return;
  }
  return obj;
}

export function flattenUnits(trueUnits, sorters) {
  const sorterKeys = sorters.map(sorter => sorter.name);
  // TODO: turn ids and other results into arrays to represent the group.
  let newUnits = [];
  trueUnits.forEach(unit => {
    for (const key of sorterKeys) {
      if (unit.sorting_results[key]) {
        let floatie = [parseFloat(unit.sorting_results[key].Accuracy)];
        let sorterObj = {
          firing_rate: unit.firing_rate,
          num_events: unit.num_events,
          peak_channel: unit.peak_channel,
          recording: unit.recording,
          snr: unit.snr,
          study: unit.study,
          unit_id: unit.unit_id,
          sorter: key,
          sorting_results: unit.sorting_results[key],
          accuracies: floatie
        };
        newUnits.push(sorterObj);
      } else {
        let blankSorterObj = {
          firing_rate: unit.firing_rate,
          num_events: unit.num_events,
          peak_channel: unit.peak_channel,
          recording: unit.recording,
          snr: unit.snr,
          study: unit.study,
          unit_id: unit.unit_id,
          sorter: key,
          sorting_results: {
            num_matches: 0,
            Accuracy: "0",
            best_unit: 0,
            matched_unit: 0,
            unit_id: 0,
            f_n: "0",
            f_p: "0"
          },
          accuracies: [0]
        };
        newUnits.push(blankSorterObj);
      }
    }
  });
  return newUnits;
}

export function groupUnitsWithAccuracy(allUnits) {
  let groupedUnits = Object.values(
    allUnits.reduce(function(r, e) {
      let key = e.study + "|" + e.sorter;
      if (!r[key]) {
        r[key] = e;
      } else {
        let floatie = parseFloat(e.sorting_results.Accuracy);
        r[key].accuracies.push(floatie);
      }
      return r;
    }, {})
  );

  return groupedUnits;
}

/* Prior data handling functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */
const batchArr = [
  "ms4_magland_synth_dev3",
  "irc_magland_synth_dev3",
  "sc_magland_synth_dev3"
];

export async function getANewBatchResult(batch) {
  let result = await kbclient.loadObject(null, {
    key: { batch_name: batch, name: "job_results" }
  });
  // TODO: add proper error function
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
    let floaties = accuracies.map(ac => parseFloat(ac));
    return {
      study: group[0].study_name,
      sorter: group[0].sorter_name,
      accuracies: floaties,
      in_range: floaties.length
    };
  });
  return flattened;
}
