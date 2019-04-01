import { getRecordings, getSorters, getTrueUnits } from "../dataHandlers";
// TODO: Replace these with API calls

const fetch = require("node-fetch");
const baseurl = process.env.API_URL || "http://localhost:5000";

/* V2 Data: New Actions
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const RECEIVE_CPUS = "RECEIVE_CPUS";
export const RECEIVE_GROUPED_URS = "RECEIVE_GROUPED_URS";
export const RECEIVE_STUDIES = "RECEIVE_STUDIES";

export const START_LOADING = "START_LOADING";
export const END_LOADING = "END_LOADING";
export const SEND_CONTACT = "SEND_CONTACT";
export const SEND_CONTACT_SUCCESS = "SEND_CONTACT_SUCCESS";
export const SEND_CONTACT_FAILURE = "SEND_CONTACT_FAILURE";

/* Old Shiz
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const SELECT_RECORDING = "SELECT_RECORDING";
export const RECEIVE_RECORDINGS = "RECEIVE_RECORDINGS";
export const RECEIVE_SORTERS = "RECEIVE_SORTERS";
export const RECEIVE_UNITS = "RECEIVE_UNITS";
export const SELECT_STUDY = "SELECT_STUDY";
export const RECEIVE_PAIRING = "RECEIVE_PAIRING";
export const RECEIVE_RECORDING_DETAILS = "RECEIVE_RECORDING_DETAILS";

/* V2 Data: Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */

// Utilities
export const createFetch = async url => {
  const newUrl = baseurl + url;
  const response = await fetch(newUrl, {
    method: "GET",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);
  return body;
};

export const createFetchPost = async (url, options) => {
  const newUrl = baseurl + url;
  const body = JSON.stringify(options);
  const request = await fetch(newUrl, {
    method: "POST",
    mode: "same-origin",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: body
  });
  const response = await request.json();
  if (request.status !== 200) {
    throw Error(response.message);
  } else {
    return response;
  }
};

// Contacts
export function sendContactSuccess() {
  return {
    type: SEND_CONTACT_SUCCESS,
    contactSent: true
  };
}

export function sendContactFailure(error) {
  return {
    type: SEND_CONTACT_FAILURE,
    contactSent: false
  };
}

export const sendContact = options => {
  return function(dispatch) {
    return createFetchPost(`/api/contact`, options)
      .then(res => {
        dispatch(sendContactSuccess(res.success));
      })
      .catch(err => {
        dispatch(sendContactFailure(err));
      });
  };
};

// Studies
export const receiveStudies = studies => ({
  type: RECEIVE_STUDIES,
  studies
});

export const fetchStudies = () => {
  let url = `/api/studies`;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetch(url)
      .then(res => {
        dispatch(receiveStudies(res.studies));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => console.log(err));
  };
};

// CPUs
export const receiveCPUs = cpus => {
  return {
    type: RECEIVE_CPUS,
    cpus: cpus
  };
};

export const fetchCPUs = () => {
  let url = `/api/cpus`;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetch(url)
      .then(res => {
        dispatch(receiveCPUs(res.cpus));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => console.log(err));
  };
};

// Grouped Unit Results
export const receiveGroupedURs = groupedURs => {
  return {
    type: RECEIVE_GROUPED_URS,
    groupedURs: groupedURs
  };
};

export const fetchGroupedURs = () => {
  let url = `/api/groupedurs`;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetch(url)
      .then(res => {
        dispatch(receiveGroupedURs(res.groupedURs));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => console.log(err));
  };
};

// Loading
export const startLoading = () => ({
  type: START_LOADING,
  loading: true
});

export const endLoading = () => ({
  type: END_LOADING,
  loading: false
});

/* Old Shiz
–––––––––––––––––––––––––––––––––––––––––––––––––– */

// select study
export const selectStudy = study => ({
  type: SELECT_STUDY,
  study
});

export const selectRecording = recording => {
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

// Pairing
export const receivePairing = pairing => ({
  type: RECEIVE_PAIRING,
  pairing
});

export const fetchPairing = (study, sorter) => {
  let url = `/api/${study}/${sorter}`;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetch(url)
      .then(res => {
        // TODO: Change when no longer using
        dispatch(receivePairing(res.results.results));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => console.log(err));
  };
};

// Recording Details
export const receiveRecordingDetails = recordingDetails => ({
  type: RECEIVE_RECORDING_DETAILS,
  recordingDetails
});

export const fetchRecordingDetails = (study, sorter, recording) => {
  let url = `/api/${study}/${sorter}/${recording}`;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetch(url)
      .then(res => {
        dispatch(receiveRecordingDetails(res.recordingDetails));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => console.log(err));
  };
};
