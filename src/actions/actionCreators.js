import {
  getRecordings,
  getStudies,
  getSorters,
  getTrueUnits
} from "../dataHandlers";

export const SELECT_STUDY = "SELECT_STUDY";
export const REQUEST_RECORDINGS = "REQUEST_RECORDINGS";
export const RECEIVE_RECORDINGS = "RECEIVE_RECORDINGS";
export const REQUEST_SORTERS = "REQUEST_SORTERS";
export const RECEIVE_SORTERS = "RECEIVE_SORTERS";
export const REQUEST_UNITS = "REQUEST_UNITS";
export const RECEIVE_UNITS = "RECEIVE_UNITS";
export const REQUEST_STUDIES = "REQUEST_STUDIES";
export const RECEIVE_STUDIES = "RECEIVE_STUDIES";

// select study
export const selectStudy = study => ({
  type: SELECT_STUDY,
  study
});

// Recordings
export const requestRecordings = () => ({
  type: REQUEST_RECORDINGS
});

export const receiveRecordings = recordings => {
  console.log("in receive recordings", recordings.recordings);
  return {
    type: RECEIVE_RECORDINGS,
    recordings: recordings.recordings
  };
};

export const fetchRecordings = dispatch => {
  requestRecordings();
  let recordings = getRecordings();
  dispatch(receiveRecordings(recordings));
};

// Sorters
export const requestSorters = () => ({
  type: REQUEST_SORTERS
});

export const receiveSorters = sorters => ({
  type: RECEIVE_SORTERS,
  sorters
});

export const fetchSorters = () => {
  requestSorters();
  let sorters = getSorters();
  receiveSorters(sorters);
};

// Studies
export const requestStudies = () => ({
  type: REQUEST_STUDIES
});

export const receiveStudies = studies => ({
  type: RECEIVE_STUDIES,
  studies
});

export const fetchStudies = () => {
  requestStudies();
  let studies = getStudies();
  receiveStudies(studies);
};

// Units
export const requestUnits = () => ({
  type: REQUEST_UNITS
});

export const receiveUnits = units => ({
  type: RECEIVE_UNITS,
  units
});

export const fetchUnits = () => {
  requestUnits();
  let units = getTrueUnits();
  receiveUnits(units);
};
