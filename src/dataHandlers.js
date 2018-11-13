const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({ share_ids: ["spikeforest.spikeforest1"] });
kbclient.setPairioConfig({ collections: ["spikeforest"] });

const batchArr = [
  "summarize_recordings",
  "ms4_magland_synth_dev",
  "ironclust_magland_synth_dev"
];

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

export async function getABatchResult(batch) {
  let result = await kbclient.loadObject(null, {
    key: { batch_name: batch }
  });
  return result;
}

export async function getBatchResults() {
  const promises = batchArr.map(getABatchResult);
  let allBatches = await Promise.all(promises);

  if (!allBatches) {
    // TODO: how to return an error as blank?
    return;
  }

  return allBatches;
}

export async function getSortingResults(allBatches) {
  const sortingResults = allBatches.map(batch => batch.sorting_results).flat();
  const withAccuracy = await this.getAccuracy(sortingResults);
  return this.organizeSortingResults(withAccuracy);
}

export async function getAccuracy(sortingResults) {
  const urlPromises = sortingResults.map(this.getAccuracyUrl);
  let withAccuracyUrl = await Promise.all(urlPromises);
  const jsonPromises = withAccuracyUrl.map(this.getAccuracyJSON);
  let withAccuracyJSON = await Promise.all(jsonPromises);
  return withAccuracyJSON;
}

export async function getAccuracyUrl(sortingResult) {
  let accuracy = await kbclient.findFile(
    sortingResult.comparison_with_truth.json
  );

  const withAccuracyUrl = Object.assign(
    { accuracy: { url: accuracy, json: {} } },
    sortingResult
  );
  return withAccuracyUrl;
}

export async function getAccuracyJSON(withAccuracyUrl) {
  let accuracyJSON = await fetch(withAccuracyUrl.accuracy.url)
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
      // this.setState({
      //   errors: [
      //     ...this.state.errors,
      //     "🤦‍ an individual accuracy json failed to load"
      //   ]
      // });
    });
  withAccuracyUrl.accuracy.json = accuracyJSON;
  return withAccuracyUrl;
}

export function organizeSortingResults(unsorted) {
  let sortedByStudy = unsorted.reduce((r, a) => {
    r[a.study_name] = r[a.study_name] || [];
    r[a.study_name].push(a);
    return r;
  }, {});
  this.subSortByAlgo(sortedByStudy);
}

export function subSortByAlgo(sortedByStudy) {
  for (const study in sortedByStudy) {
    sortedByStudy[study] = sortedByStudy[study].reduce((r, a) => {
      r[a.sorter_name] = r[a.sorter_name] || [];
      r[a.sorter_name].push(a);
      return r;
    }, []);
  }
  return sortedByStudy;
}
