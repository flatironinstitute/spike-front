import * as Sentry from "@sentry/browser";
const axios = require("axios");

var baseurl;
if (process.env.NODE_ENV === "production") {
  baseurl = "https://spikeforestfront.herokuapp.com";
} else {
  baseurl = "http://localhost:5000";
}

/* V2 Data Actions
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const RECEIVE_ALGORITHMS = "RECEIVE_ALGORITHMS";
export const RECEIVE_CPUS = "RECEIVE_CPUS";
export const RECEIVE_GROUPED_URS = "RECEIVE_GROUPED_URS";
export const RECEIVE_RECORDINGS = "RECEIVE_RECORDINGS";
export const RECEIVE_SPIKESPRAY = "RECEIVE_SPIKESPRAY";
export const RECEIVE_SORTERS = "RECEIVE_SORTERS";
export const RECEIVE_ALGORITHMS = "RECEIVE_ALGORITHMS";
export const RECEIVE_UNIT_RESULTS = "RECEIVE_UNIT_RESULTS";
export const RECEIVE_STATS = "RECEIVE_STATS";
export const RECEIVE_STUDY_SETS = "RECEIVE_STUDY_SETS";
export const RECEIVE_STUDIES = "RECEIVE_STUDIES";
export const RECEIVE_UNIT_RESULTS = "RECEIVE_UNIT_RESULTS";
export const RECEIVE_URS_BY_STUDY = "RECEIVE_URS_BY_STUDY";
export const SELECT_STUDY_SORTING_RESULT = "SELECT_STUDY_SORTING_RESULT";
export const RECEIVE_STUDY_ANALYSIS_RESULTS = "RECEIVE_STUDY_ANALYSIS_RESULTS";

export const START_LOADING = "START_LOADING";
export const END_LOADING = "END_LOADING";
export const SEND_CONTACT = "SEND_CONTACT";
export const SEND_CONTACT_SUCCESS = "SEND_CONTACT_SUCCESS";
export const SEND_CONTACT_FAILURE = "SEND_CONTACT_FAILURE";

/* V2 Data Fetch Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */

// Utilities
export const createFetchAPI = async url => {
  const newUrl = baseurl + url;
  try {
    const response = await axios.get(newUrl);
    const returned = await response.data;
    if (response.status !== 200) Sentry.captureException(returned.message);
    return returned;
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const createFetchPost = async (url, options) => {
  try {
    const newUrl = baseurl + url;
    const body = JSON.stringify(options);
    const response = await axios.post(newUrl, body);
    const returned = await response.data;
    if (response.status !== 200) Sentry.captureException(returned.message);
    return returned;
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const createFetchKBucket = async url => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      Sentry.captureException(response.message);
    } else {
      return response.data;
    }
  } catch (error) {
    Sentry.captureException(error);
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
    return createFetchAPI(url)
      .then(res => {
        dispatch(receiveStudies(res.studies));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => Sentry.captureException(err));
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
    return createFetchAPI(url)
      .then(res => {
        dispatch(receiveCPUs(res.cpus));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => Sentry.captureException(err));
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
    return createFetchAPI(url)
      .then(res => {
        dispatch(receiveGroupedURs(res.groupedURs));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => Sentry.captureException(err));
  };
};

// Unit Results By Study
export const receiveURsByStudy = ursByStudy => {
  return {
    type: RECEIVE_URS_BY_STUDY,
    ursByStudy: ursByStudy
  };
};

export const fetchURsByStudy = name => {
  let url = `/api/ursbystudy/` + name;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
      .then(res => {
        dispatch(receiveURsByStudy(res.ursByStudy));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => Sentry.captureException(err));
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
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
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
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
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

// Algorithms
export const receiveAlgorithms = algorithms => ({
  type: RECEIVE_ALGORITHMS,
  algorithms
});

export const fetchAlgorithms = () => {
  let url = `/api/algorithms`;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
      .then(res => {
        return res.algorithms;
      })
      .then(algorithms => {
        dispatch(receiveAlgorithms(algorithms));
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
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
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
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
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
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
      .then(recordings => {
        dispatch(receiveRecordings(recordings));
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
};

// Study analysis results
export const receiveStudyAnalysisResults = studyAnalysisResults => ({
  type: RECEIVE_STUDY_ANALYSIS_RESULTS,
  studyAnalysisResults
});

export const fetchStudyAnalysisResults = () => {
  let url = `/api/studyanalysisresults`;
  return function (dispatch) {
    dispatch(startLoading());
    return createFetch(url)
      .then(res => {
        dispatch(receiveStudyAnalysisResults(res.studyAnalysisResults));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => Sentry.captureException(err));
  };
};


// Selected Study for Scatterplot
export const selectStudySortingResult = studySortingResult => ({
  type: SELECT_STUDY_SORTING_RESULT,
  studySortingResult
});

export const selectStudyName = studyName => ({
  type: SELECT_STUDY_NAME,
  studyName
});

export const selectSorterName = sorterName => ({
  type: SELECT_SORTER_NAME,
  sorterName
});

// SpikeSpray
export const receiveSpikeSpray = spikespray => {
  return {
    type: RECEIVE_SPIKESPRAY,
    spikespray
  };
};

export const fetchSpikeSpray = url => {
  // TODO: Remove when other spikes are live and use passed in URL
  const defaultUrl =
    "http://kbucket.flatironinstitute.org/get/sha1/0aa39927530abed94f32c410f3a2226e2ee71c5e?signature=c516794c53257b327f39b8349cc39313f1a254e9";
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchKBucket(defaultUrl)
      .then(spikespray => {
        dispatch(receiveSpikeSpray(spikespray));
      })
      .then(() => {
        dispatch(endLoading());
      });
  };
};
