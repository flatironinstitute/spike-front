import {
  getRecordings,
  getStudies,
  getSorters,
  getTrueUnits
} from "../dataHandlers";

export const SELECT_STUDY = "SELECT_STUDY";
export const SELECT_RECORDING = "SELECT_RECORDING";
export const RECEIVE_RECORDINGS = "RECEIVE_RECORDINGS";
export const RECEIVE_SORTERS = "RECEIVE_SORTERS";
export const RECEIVE_UNITS = "RECEIVE_UNITS";
export const RECEIVE_STUDIES = "RECEIVE_STUDIES";
export const START_LOADING = "START_LOADING";
export const END_LOADING = "END_LOADING";

// select study
export const selectStudy = study => ({
  type: SELECT_STUDY,
  study
});

export const selectRecording = recording => {
  console.log("IN THE SELECT RECORDING", recording);
  return {
    type: SELECT_RECORDING,
    recording
  };
};

// Recordings
export const receiveRecordings = recordings => {
  return {
    type: RECEIVE_RECORDINGS,
    recordings: recordings
  };
};

export const fetchRecordings = () => {
  return function(dispatch) {
    dispatch(startLoading());
    return getRecordings()
      .then(res => {
        return res.recordings;
      })
      .then(recordings => {
        dispatch(receiveRecordings(recordings));
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
};

// Sorters
export const receiveSorters = sorters => ({
  type: RECEIVE_SORTERS,
  sorters
});

export const fetchSorters = () => {
  return function(dispatch) {
    dispatch(startLoading());
    return getSorters()
      .then(res => {
        return res.sorters;
      })
      .then(sorters => {
        dispatch(receiveSorters(sorters));
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
};

// Studies
export const receiveStudies = studies => ({
  type: RECEIVE_STUDIES,
  studies
});

export const fetchStudies = () => {
  return function(dispatch) {
    dispatch(startLoading());
    return getStudies()
      .then(res => {
        return res.studies;
      })
      .then(studies => {
        dispatch(receiveStudies(studies));
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
};

// Units
export const receiveUnits = units => {
  return {
    type: RECEIVE_UNITS,
    units
  };
};

export const fetchUnits = () => {
  return function(dispatch) {
    dispatch(startLoading());
    return getTrueUnits()
      .then(res => {
        return res.true_units;
      })
      .then(units => {
        dispatch(receiveUnits(units));
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
};

// loading
export const startLoading = () => ({
  type: START_LOADING,
  loading: true
});

export const endLoading = () => ({
  type: END_LOADING,
  loading: false
});
