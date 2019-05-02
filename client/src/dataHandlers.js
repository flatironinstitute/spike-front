import * as Sentry from "@sentry/browser";
Sentry.init({
  dsn: "https://a7b7f1b624b44a9ea537ec1069859393@sentry.io/1365884"
});

// Connect to Kbucket
const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({
  share_ids: ["spikeforest.spikeforest1"]
});
kbclient.setPairioConfig({
  collections: ["spikeforest"]
});

// Collect data from server ? Not sure why this is built this way? To make it async?
const axios = require("axios");
async function fetchBackupJSON(url) {
  let X = await axios.get(url, { responseType: "json" });
  return X.data;
}

const target_base = "spikeforest_website_12_20_2018";
const s_targets = [
  target_base + "_magland_synth",
  target_base + "_mearec",
  target_base + "_bionet8c",
  target_base + "_bionet32c",
  target_base + "_paired",
  target_base + "_manual"
];

async function loadData(targets, name, fieldname) {
  Sentry.addBreadcrumb({
    category: "dataHandlers",
    message: "Start loading " + name,
    level: "info"
  });

  let returnArr = [];
  for (let i = 0; i < targets.length; i++) {
    let obj;
    // TODO: Should I remove the local env key?
    if (
      process.env.REACT_APP_USE_LOCAL_DATA &&
      process.env.REACT_APP_TEST_SERVER_URL
    ) {
      let backupUrl =
        process.env.REACT_APP_TEST_SERVER_URL + `/${targets[i]}/${name}.json`;
      Sentry.addBreadcrumb({
        category: "dataHandlers",
        message: "Loading backup data from" + backupUrl,
        level: "info"
      });
      obj = await fetchBackupJSON(backupUrl);
    } else {
      obj = await kbclient.loadObject(null, {
        key: {
          target: targets[i],
          name: name
        }
      });
    }

    let list = obj ? obj[fieldname] : {};
    for (let j in list) {
      returnArr.push(list[j]);
    }

    if (obj) {
      Sentry.addBreadcrumb({
        category: "dataHandlers",
        message: `Success loaded ${targets[i]}-${name} (${returnArr.length})`,
        level: "info"
      });
    } else {
      Sentry.captureException(
        new Error(`Failed to load ${targets[i]}-${name}`)
      );
    }
  }
  let returnObj = {};
  returnObj[fieldname] = returnArr;
  return returnObj;
}

// New data handling functions as of 1/7/19
export async function getRecordings() {
  return await loadData(s_targets, "recordings", "recordings");
}

export async function getStudies() {
  let studies = await loadData(s_targets, "studies", "studies");
  return studies;
}

export async function getSorters() {
  return await loadData(s_targets, "sorters", "sorters");
}

export async function getTrueUnits() {
  return await loadData(s_targets, "true_units", "true_units");
}

export async function formatUnitResultsByStudy(ursByStudy) {
  function groupBySorters(list, keyGetter) {
    const map = {};
    list.forEach(item => {
      const key = keyGetter(item);
      map[key] = item;
    });
    return map;
  }

  function sumAccuracies(allSorted, study) {
    let formattedSorted = [];
    for (var sorted in allSorted) {
      let accuracies = allSorted[sorted].unitResults.map(
        unit => unit.checkAccuracy
      );
      let snrs = allSorted[sorted].unitResults.map(unit => unit.snr);
      let recalls = allSorted[sorted].unitResults.map(unit => unit.checkRecall);
      let precisions = allSorted[sorted].unitResults.map(
        unit => unit.precision
      );
      let newObj = {
        study: study,
        sorter: sorted,
        y: study,
        x: sorted,
        true_units: allSorted[sorted].unitResults,
        accuracies: accuracies,
        snrs: snrs,
        precisions: precisions,
        recalls: recalls,
        in_range: 0,
        color: 0,
        is_applied: true
      };
      formattedSorted.push(newObj);
    }
    return formattedSorted;
  }

  let allSortered = await groupBySorters(ursByStudy, unit => unit._id.sorterName);
  let summedAccs = sumAccuracies(allSortered, ursByStudy[0]._id.studyName);
  return summedAccs;
}

export async function formatUnitResults(groupedURs, sorters) {
  function groupBy(list, keyGetter) {
    const map = {};
    list.forEach(item => {
      const key = keyGetter(item);
      if (!map[key]) {
        map[key] = [item];
      } else {
        map[key].push(item);
      }
    });
    return map;
  }

  function groupBySorters(list, keyGetter) {
    const map = {};
    list.forEach(item => {
      const key = keyGetter(item);
      map[key] = item;
    });
    return map;
  }

  function sumAccuracies(allSorted, study) {
    let formattedSorted = [];
    for (var sorted in allSorted) {
      let accuracies = allSorted[sorted].unitResults.map(
        unit => unit.checkAccuracy
      );
      let snrs = allSorted[sorted].unitResults.map(unit => unit.snr);
      let recalls = allSorted[sorted].unitResults.map(unit => unit.checkRecall);
      let precisions = allSorted[sorted].unitResults.map(
        unit => unit.precision
      );
      let newObj = {
        study: study,
        sorter: sorted,
        y: study,
        x: sorted,
        true_units: allSorted[sorted].unitResults,
        accuracies: accuracies,
        snrs: snrs,
        precisions: precisions,
        recalls: recalls,
        in_range: 0,
        color: 0,
        is_applied: true
      };
      formattedSorted.push(newObj);
    }
    if (sorters.length !== formattedSorted.length) {
      sorters.forEach(sorter => {
        if (
          !formattedSorted.filter(
            formattedSort => formattedSort.sorter === sorter.name
          ).length
        ) {
          let dummyObj = {
            study: study,
            sorter: sorter.name,
            y: study,
            x: sorter.name,
            true_units: [],
            accuracies: [],
            snrs: [],
            color: 0,
            in_range: null,
            is_applied: false
          };
          formattedSorted.push(dummyObj);
        }
      });
    }
    return formattedSorted;
  }

  const byStudy = await groupBy(groupedURs, unit => unit._id.studyName);
  const bySorter = [];
  for (let study in byStudy) {
    let allSorted = groupBySorters(
      byStudy[study],
      study => study._id.sorterName
    );
    let summedAcc = sumAccuracies(allSorted, study);
    let obj = {
      [study]: summedAcc
    };
    bySorter.push(obj);
  }
  return bySorter;
}

export async function mapUnitsBySorterStudy(allUnits, sorters) {
  // Filter sortmatted
  function filterFormats(formattedSorted, sorters, sorter) {
    return formattedSorted.filter(
      formatted => formatted.sorter === sorters[sorter].name
    );
  }

  function sumAccuracies(allSorted, study) {
    let formattedSorted = [];
    for (var sorted in allSorted) {
      let accuracies = allSorted[sorted].map(unit => unit.accuracy);
      let snrs = allSorted[sorted].map(unit => unit.snr);
      let newObj = {
        study: study,
        sorter: sorted,
        y: study,
        x: sorted,
        true_units: allSorted[sorted],
        accuracies: accuracies,
        snrs: snrs,
        in_range: 0,
        color: 0,
        is_applied: true
      };
      formattedSorted.push(newObj);
    }
    for (var sorter in sorters) {
      let thisSorting = filterFormats(formattedSorted, sorters, sorter);
      let dummyObj = {
        study: study,
        sorter: sorters[sorter].name,
        y: study,
        x: sorters[sorter].name,
        true_units: [],
        accuracies: [],
        snrs: [],
        color: 0,
        in_range: null,
        is_applied: false
      };
      if (!thisSorting.length) {
        formattedSorted.push(dummyObj);
      }
    }
    return formattedSorted;
  }

  function groupBy(list, keyGetter) {
    const map = {};
    list.forEach(item => {
      const key = keyGetter(item);
      if (!map[key]) {
        map[key] = [item];
      } else {
        map[key].push(item);
      }
    });
    return map;
  }

  const byStudy = await groupBy(allUnits, unit => unit.study);
  const bySorter = [];
  for (let study in byStudy) {
    let allSorted = groupBy(byStudy[study], study => study.sorter);
    let summedAcc = sumAccuracies(allSorted, study);
    let obj = {
      [study]: summedAcc
    };
    bySorter.push(obj);
  }
  return bySorter;
}