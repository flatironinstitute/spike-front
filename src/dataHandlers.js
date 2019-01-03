//import recordings from "./data/recordings";
//import sorters from "./data/sorters";
//import studies from "./data/studies";
//import units from "./data/units";

const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({
  share_ids: ["spikeforest.spikeforest1"]
});
kbclient.setPairioConfig({
  collections: ["spikeforest"]
});

const axios=require('axios');
async function http_get_json(url) {
  let X=await axios.get(url,{responseType:'json'});
  return X.data;
}

const target_base='spikeforest_website_12_20_2018';
const s_targets=[
  target_base+'_magland_synth',
  target_base+'_mearec',
  target_base+'_bionet8c',
  target_base+'_bionet32c',
  target_base+'_paired'
]

async function load_data_jfm(targets,name,fieldname) {
  console.log(':::::::::::::::::: loading',targets,name,fieldname,process.env.REACT_APP_TEST_SERVER_URL);
  let ret=[]
  for (let i=0; i<targets.length; i++) {
    let obj;
    if (process.env.REACT_APP_TEST_SERVER_URL) {
      let url0=process.env.REACT_APP_TEST_SERVER_URL+`/${targets[i]}/${name}.json`;
      console.info('Loading from: '+url0);
      obj = await http_get_json(url0);
      console.log(obj);
    }
    else {
      obj = await kbclient.loadObject(null, {
        key: {
          target: targets[i],
          name: name
        }
      });
    }
    let list=obj[fieldname];
    for (let j in list) {
      ret.push(list[j]);
    }
  }
  console.log(':::::::::::::::::: loaded',targets,name,fieldname,ret.length);
  let ret2={};
  ret2[fieldname]=ret;
  return ret2;
}

export async function asyncReturn(json) {
  return json;
}

// New data handling functions as of 11/16/18
export async function getRecordings() {
  return await load_data_jfm(s_targets,'recordings','recordings');

  /*
  let obj = null;

  if (process.env.REACT_APP_USE_LOCAL_DATA) {
    obj = await asyncReturn(recordings);
  } else {
    obj = await kbclient.loadObject(null, {
      key: {
        target: "spikeforest_website_dev_12_19_2018",
        name: "recordings"
      }
    });
  }
  if (!obj) {
    console.log("Problem loading recordings object.");
  }
  return obj;
  */
}

export async function getStudies() {
  return await load_data_jfm(s_targets,'studies','studies');

  /*
  let obj = null;
  if (process.env.REACT_APP_USE_LOCAL_DATA) {
    obj = await asyncReturn(studies);
  } else {
    obj = await kbclient.loadObject(null, {
      key: {
        target: "spikeforest_website_dev_12_19_2018",
        name: "studies"
      }
    });
  }
  if (!obj) {
    console.log("Problem loading studies object.");
  }
  return obj;
  */
}

export async function getSorters() {
  return await load_data_jfm(s_targets,'sorters','sorters');

  /*
  let obj = null;
  if (process.env.REACT_APP_USE_LOCAL_DATA) {
    obj = await asyncReturn(sorters);
  } else {
    obj = await kbclient.loadObject(null, {
      key: {
        target: "spikeforest_website_dev_12_19_2018",
        name: "sorters"
      }
    });
  }
  if (!obj) {
    console.log("Problem loading sorters object.");
  }
  return obj;
  */
}

export async function getTrueUnits() {
  return await load_data_jfm(s_targets,'true_units','true_units');

  /*
  let obj = null;
  if (process.env.REACT_APP_USE_LOCAL_DATA) {
    obj = await asyncReturn(units);
  } else {
    obj = await kbclient.loadObject(null, {
      key: {
        target: "spikeforest_website_dev_12_18_2018",
        name: "true_units"
      }
    });
  }
  if (!obj) {
    console.log("Problem loading true units object.");
  }
  return obj;
  */
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
        : ["IronClust-tetrode", "MountainSort4-thr3", "SpykingCircus"];
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
    let obj = {
      [study]: summedAcc
    };
    bySorter.push(obj);
  }
  return bySorter;
}
