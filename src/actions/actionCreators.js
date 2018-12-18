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
export function requestRecordings() {
  return {
    type: REQUEST_RECORDINGS
  };
}

export function receiveRecordings(recordings) {
  console.log("in recieve recordings", recordings.recordings);
  return {
    type: RECEIVE_RECORDINGS,
    recordings: recordings.recordings
  };
}

export async function fetchRecordings() {
  requestRecordings();
  let recordings = await getRecordings();
  receiveRecordings(recordings);
}

// Sorters
export function requestSorters() {
  return {
    type: REQUEST_SORTERS
  };
}

export function receiveSorters(sorters) {
  return {
    type: RECEIVE_SORTERS,
    sorters
  };
}

export async function fetchSorters() {
  requestSorters();
  let sorters = await getSorters();
  receiveSorters(sorters);
}

// Studies
export function requestStudies() {
  return {
    type: REQUEST_STUDIES
  };
}

export function receiveStudies(studies) {
  return {
    type: RECEIVE_STUDIES,
    studies
  };
}

export async function fetchStudies() {
  requestStudies();
  let studies = await getStudies();
  receiveStudies(studies);
}

// Units
export function requestUnits() {
  return {
    type: REQUEST_UNITS
  };
}

export function receiveUnits(units) {
  return {
    type: RECEIVE_UNITS,
    units
  };
}

export async function fetchUnits() {
  requestUnits();
  let units = await getTrueUnits();
  receiveUnits(units);
}
