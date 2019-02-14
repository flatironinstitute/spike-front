import * as Sentry from '@sentry/browser';
Sentry.init({
  dsn: 'https://a7b7f1b624b44a9ea537ec1069859393@sentry.io/1365884',
});

// Connect to Kbucket
const KBucketClient = require('@magland/kbucket').KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({
  share_ids: ['spikeforest.spikeforest1'],
});
kbclient.setPairioConfig({
  collections: ['spikeforest'],
});

// Collect data from server ? Not sure why this is built this way? To make it async?
const axios = require('axios');
async function fetchBackupJSON(url) {
  let X = await axios.get(url, { responseType: 'json' });
  return X.data;
}

const target_base = 'spikeforest_website_12_20_2018';
const s_targets = [
  target_base + '_magland_synth',
  target_base + '_mearec',
  target_base + '_bionet8c',
  target_base + '_bionet32c',
  target_base + '_paired',
  target_base + '_manual',
];

async function loadData(targets, name, fieldname) {
  Sentry.addBreadcrumb({
    category: 'dataHandlers',
    message: 'Start loading ' + name,
    level: 'info',
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
        category: 'dataHandlers',
        message: 'Loading backup data from' + backupUrl,
        level: 'info',
      });
      obj = await fetchBackupJSON(backupUrl);
    } else {
      obj = await kbclient.loadObject(null, {
        key: {
          target: targets[i],
          name: name,
        },
      });
    }

    let list = obj ? obj[fieldname] : {};
    for (let j in list) {
      returnArr.push(list[j]);
    }

    if (obj) {
      Sentry.addBreadcrumb({
        category: 'dataHandlers',
        message: `Success loaded ${targets[i]}-${name} (${returnArr.length})`,
        level: 'info',
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
  return await loadData(s_targets, 'recordings', 'recordings');
}

export async function getStudies() {
  let studies = await loadData(s_targets, 'studies', 'studies');
  return studies;
}

export async function getSorters() {
  return await loadData(s_targets, 'sorters', 'sorters');
}

export async function getTrueUnits() {
  return await loadData(s_targets, 'true_units', 'true_units');
}

export function flattenUnits(trueUnits, studies) {
  let newUnits = [];
  // TODO: Add new static list to replace sorters below
  // TODO: Add this to redux and find a way to get rid of the need for studies?
  if (studies.length) {
    trueUnits.forEach(unit => {
      const myStudy = studies.filter(study => study.name === unit.study);
      const mySorters = myStudy[0].sorters
        ? myStudy[0].sorters
        : ['IronClust-tetrode', 'MountainSort4-thr3', 'SpykingCircus'];
      for (const key of mySorters) {
        if (unit.sorting_results[key]) {
          let floatie = parseFloat(
            unit.sorting_results[key].Accuracy ||
              unit.sorting_results[key].accuracy
          );
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
            accuracy: floatie,
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
              Accuracy: '0',
              best_unit: 0,
              matched_unit: 0,
              unit_id: 0,
              f_n: '0',
              f_p: '0',
            },
            accuracy: 0,
          };
          newUnits.push(blankSorterObj);
        }
      }
    });
  }
  return newUnits;
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
        is_applied: true,
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
        is_applied: false,
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
      [study]: summedAcc,
    };
    bySorter.push(obj);
  }
  return bySorter;
}
