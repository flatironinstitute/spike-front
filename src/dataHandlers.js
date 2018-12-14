const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({ share_ids: ["spikeforest.spikeforest1"] });
kbclient.setPairioConfig({ collections: ["spikeforest"] });

// New data handling functions as of 11/16/18
export async function getRecordings() {
  let obj = await kbclient.loadObject(null, {
    key: { target: "spikeforest_website_dev_12_13_2018", name: "recordings" }
  });
  if (!obj) {
    console.log("Problem loading recordings object.");
    return;
  }
  return obj;
}

export async function getStudies() {
  let obj = await kbclient.loadObject(null, {
    key: { target: "spikeforest_website_dev_12_13_2018", name: "studies" }
  });
  if (!obj) {
    console.log("Problem loading studies object.");
    return;
  }
  return obj;
}

export async function getSorters() {
  let obj = await kbclient.loadObject(null, {
    key: { target: "spikeforest_website_dev_12_13_2018", name: "sorters" }
  });
  if (!obj) {
    console.log("Problem loading sorters object.");
    return;
  }
  return obj;
}

export async function getTrueUnits() {
  let obj = await kbclient.loadObject(null, {
    key: { target: "spikeforest_website_dev_12_13_2018", name: "true_units" }
  });
  if (!obj) {
    console.log("Problem loading true units object.");
    return;
  }
  return obj;
}

export function flattenUnits(trueUnits, studies) {
  let newUnits = [];
  trueUnits.forEach(unit => {
    const myStudy = studies.filter(study => study.name === unit.study);
    const mySorters = myStudy[0].sorters ? myStudy[0].sorters : [];
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
          accuracy: floatie
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
          accuracy: 0
        };
        newUnits.push(blankSorterObj);
      }
    }
  });
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
      let newObj = {
        study: study,
        sorter: sorted,
        y: study,
        x: sorted,
        true_units: allSorted[sorted],
        accuracies: accuracies,
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
    let obj = { [study]: summedAcc };
    bySorter.push(obj);
  }
  return bySorter;
}
