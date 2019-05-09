import * as Sentry from "@sentry/browser";
Sentry.init({
  dsn: "https://a7b7f1b624b44a9ea537ec1069859393@sentry.io/1365884"
});

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
      unit => unit.checkPrecision
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

export async function formatUnitResultsByStudy(ursByStudy) {
  let allSortered = await groupBySorters(
    ursByStudy,
    unit => unit._id.sorterName
  );
  let summedAccs = sumAccuracies(allSortered, ursByStudy[0]._id.studyName);
  return summedAccs;
}

export async function formatUnitResults(groupedURs, sorters) {
  function sumAccuraciesAddBlanks(allSorted, study) {
    let formattedSorted = [];
    for (var sorted in allSorted) {
      let accuracies = allSorted[sorted].unitResults.map(
        unit => unit.checkAccuracy
      );
      let snrs = allSorted[sorted].unitResults.map(unit => unit.snr);
      let recalls = allSorted[sorted].unitResults.map(unit => unit.checkRecall);
      let precisions = allSorted[sorted].unitResults.map(
        unit => unit.checkPrecision
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
    let summedAcc = sumAccuraciesAddBlanks(allSorted, study);
    let obj = {
      [study]: summedAcc
    };
    bySorter.push(obj);
  }
  return bySorter;
}
