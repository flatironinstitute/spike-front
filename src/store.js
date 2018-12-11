import { createStore, compose } from "redux";

// import the root reducer
import rootReducer from "./reducers/index";

// import {
//   getRecordings,
//   getStudies,
//   getSorters,
//   getTrueUnits
// } from "./dataHandlers";

// const recordings = fetchRecordings();
// const studies = fetchStudies();
// const sorters = fetchSorters();
// const units = fetchUnits();
// const studySets = fetchStudySets();

// async fetchRecordings() {
//   const recordings = await getRecordings();
//   if (recordings.recordings.length) {
//     return recordings.recordings;
//   }
// }

// async fetchStudies() {
//   const studies = await getStudies();
//   if (studies.studies.length) {
//       return studies.studies;
//   }
// }

// fetchStudySets(studies) {
//   const uniques = [
//     ...new Set(studies.map(study => study.study_set))
//   ];
//   const sets = [];
//   uniques.forEach(set => {
//       sets.push({ name: set });
//   });
//   return sets;
// }

// async fetchSorters() {
//   const sorters = await getSorters();
//   if (sorters.sorters.length){
//       return sorters.sorters;
//   }
// }

// async fetchUnits() {
//   const units = await getTrueUnits();
//   if (units.true_units.length){
//     return units.true_units;
//   }
// }

// create an object for the default data
const defaultState = {
  selectedStudy: null,
  selectedSorter: null
};

// TODO: look at redux-async-intitial-state for handling async initial state and local storage
const store = createStore(rootReducer, defaultState);

export default store;
