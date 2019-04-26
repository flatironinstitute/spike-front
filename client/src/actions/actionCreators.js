const fetch = require("node-fetch");
var baseurl;
if (process.env.NODE_ENV === "production") {
  baseurl = "https://spikeforestfront.herokuapp.com"
} else {
  baseurl = "http://localhost:5000";
}

/* V2 Data: New Actions
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const RECEIVE_CPUS = "RECEIVE_CPUS";
export const RECEIVE_GROUPED_URS = "RECEIVE_GROUPED_URS";
export const RECEIVE_STUDIES = "RECEIVE_STUDIES";
export const RECEIVE_SORTERS = "RECEIVE_SORTERS";
export const RECEIVE_UNIT_RESULTS = "RECEIVE_UNIT_RESULTS";
export const RECEIVE_STATS = "RECEIVE_STATS";
export const RECEIVE_STUDY_SETS = "RECEIVE_STUDY_SETS";
export const RECEIVE_RECORDINGS = "RECEIVE_RECORDINGS";

export const START_LOADING = "START_LOADING";
export const END_LOADING = "END_LOADING";
export const SEND_CONTACT = "SEND_CONTACT";
export const SEND_CONTACT_SUCCESS = "SEND_CONTACT_SUCCESS";
export const SEND_CONTACT_FAILURE = "SEND_CONTACT_FAILURE";

/* Old Shiz
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const SELECT_RECORDING = "SELECT_RECORDING";
export const SELECT_STUDY_SORTING_RESULT = "SELECT_STUDY_SORTING_RESULT";
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
  return function (dispatch) {
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
  return function (dispatch) {
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
  return function (dispatch) {
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
  return function (dispatch) {
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

// Unit Results
export const receiveUnitResults = unitresults => {
  return {
    type: RECEIVE_UNIT_RESULTS,
    unitresults
  };
};

export const fetchUnitResults = () => {
  let url = `/api/unitresults`;
  return function (dispatch) {
    dispatch(startLoading());
    return createFetch(url)
      .then(unitresults => {
        dispatch(receiveUnitResults(unitresults));
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
  let url = `/api/sorters`;
  return function (dispatch) {
    dispatch(startLoading());
    return createFetch(url)
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

// Loading
export const startLoading = () => ({
  type: START_LOADING,
  loading: true
});

export const endLoading = () => ({
  type: END_LOADING,
  loading: false
});

// Summary Stats
export const recieveStats = stats => {
  return {
    type: RECEIVE_STATS,
    stats
  };
};

export const fetchStats = () => {
  let url = `/api/stats`;
  return function (dispatch) {
    dispatch(startLoading());
    return createFetch(url)
      .then(stats => {
        dispatch(recieveStats(stats));
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
};

// Study Sets
export const recieveStudySets = studysets => {
  return {
    type: RECEIVE_STUDY_SETS,
    studysets
  };
};

export const fetchStudySets = () => {
  let url = `/api/studysets`;
  return function (dispatch) {
    dispatch(startLoading());
    return createFetch(url)
      .then(studysets => {
        dispatch(recieveStudySets(studysets));
      })
      .then(() => {
        dispatch(endLoading());
      });
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
  let url = `/api/recordings`;
  return function (dispatch) {
    dispatch(startLoading());
    return createFetch(url)
      .then(recordings => {
        dispatch(receiveRecordings(recordings));
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
};

// Selected Study for Scatterplot
export const selectStudy = study => ({
  type: SELECT_STUDY_SORTING_RESULT,
  study
});

/* Old Shiz
–––––––––––––––––––––––––––––––––––––––––––––––––– */

export const selectRecording = recording => {
  return {
    type: SELECT_RECORDING,
    recording
  };
};

// Pairing
export const receivePairing = pairing => ({
  type: RECEIVE_PAIRING,
  pairing
});

export const fetchPairing = (study, sorter) => {
  let url = `/api/${study}/${sorter}`;
  return function (dispatch) {
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
  return function (dispatch) {
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
