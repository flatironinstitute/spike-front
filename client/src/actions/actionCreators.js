import * as Sentry from "@sentry/browser";
const axios = require("axios");

var baseurl;
if (process.env.NODE_ENV === "production") {
  baseurl = "";
} else {
  baseurl = "http://localhost:5000";
}

/* V2 Data Actions
–––––––––––––––––––––––––––––––––––––––––––––––––– */
export const RECEIVE_CPUS = "RECEIVE_CPUS";
export const RECEIVE_RECORDINGS = "RECEIVE_RECORDINGS";
export const RECEIVE_SORTING_RESULTS = "RECEIVE_SORTING_RESULTS";
export const RECEIVE_SORTERS = "RECEIVE_SORTERS";
export const RECEIVE_ALGORITHMS = "RECEIVE_ALGORITHMS";
export const RECEIVE_STATS = "RECEIVE_STATS";
export const RECEIVE_STUDY_SETS = "RECEIVE_STUDY_SETS";
export const RECEIVE_STUDIES = "RECEIVE_STUDIES";
export const RECEIVE_STUDY_ANALYSIS_RESULTS = "RECEIVE_STUDY_ANALYSIS_RESULTS";
export const RECEIVE_GENERAL = "RECEIVE_GENERAL";
export const RECEIVE_NEWS_POSTS = "RECEIVE_NEWS_POSTS";

export const SELECT_STUDY_SORTING_RESULT = "SELECT_STUDY_SORTING_RESULT";
export const SELECT_SORTER_NAME = "SELECT_SORTER_NAME";
export const SELECT_STUDY_NAME = "SELECT_STUDY_NAME";
export const SET_FORMAT = "SET_FORMAT";
export const SET_SLIDER_VALUE = "SET_SLIDER_VALUE";
export const SET_METRIC = "SET_METRIC";
export const SET_IMPUTE_MISSING_VALUES = "SET_IMPUTE_MISSING_VALUES";
export const SET_SELECTED_UNIT = "SET_SELECTED_UNIT";

export const START_LOADING = "START_LOADING";
export const END_LOADING = "END_LOADING";
export const SEND_CONTACT = "SEND_CONTACT";
export const SEND_CONTACT_SUCCESS = "SEND_CONTACT_SUCCESS";
export const SEND_CONTACT_FAILURE = "SEND_CONTACT_FAILURE";

export const FETCH_FAILURE = "FETCH_FAILURE";

/* V2 Data Fetch Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */

// Utilities
export const createFetchAPI = async url => {
  const newUrl = baseurl + url;
  try {
    const response = await axios.get(newUrl);
    const returned = await response.data;

    let returnsNull = false;
    Object.values(returned).forEach(val => {
      if (val == null) {
        returnsNull = true;
      }
    });

    if (response.status !== 200 || returnsNull) {
      return new Error(response);
    }

    return returned;
  } catch (err) {
    return new Error(err);
  }
};

export const createFetchPost = async (url, options) => {
  try {
    const newUrl = baseurl + url;
    const response = await axios.post(newUrl, options);
    const returned = await response.data;
    if (response.status !== 200) {
      return new Error(response);
    }
    return returned;
  } catch (error) {
    return error;
  }
};

// Generic Failure condition
export function sendFetchFailure(error) {
  Sentry.captureException(error);
  return {
    type: FETCH_FAILURE,
    fetchFailure: true
  };
}

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
      .catch(err => {
        dispatch(sendFetchFailure(err));
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
      })
      .catch(err => {
        dispatch(sendFetchFailure(err));
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
      })
      .catch(err => {
        dispatch(sendFetchFailure(err));
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
      })
      .catch(err => {
        dispatch(sendFetchFailure(err));
      });
  };
};

// Study Sets
export const recieveStudySets = studySets => {
  return {
    type: RECEIVE_STUDY_SETS,
    studySets
  };
};

export const fetchStudySets = () => {
  let url = `/api/studysets`;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
      .then(studySets => {
        dispatch(recieveStudySets(studySets));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => {
        dispatch(sendFetchFailure(err));
      });
  };
};

// Sorting results
export const receiveSortingResults = sortingResults => {
  return {
    type: RECEIVE_SORTING_RESULTS,
    sortingResults: sortingResults
  };
};

export const fetchSortingResults = () => {
  let url = `/api/sortingresults`;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
      .then(sortingResults => {
        dispatch(receiveSortingResults(sortingResults));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => {
        dispatch(sendFetchFailure(err));
      });
  };
};

// Study analysis results
export const receiveStudyAnalysisResults = studyAnalysisResults => {
  return {
    type: RECEIVE_STUDY_ANALYSIS_RESULTS,
    studyAnalysisResults
  };
};

export const fetchStudyAnalysisResults = studySetName => {
  let url = `/api/studyanalysisresults/${studySetName}`;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
      .then(res => {
        dispatch(receiveStudyAnalysisResults(res.studyAnalysisResults));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => {
        dispatch(sendFetchFailure(err));
      });
  };
};

// Study analysis results
export const receiveGeneral = general => {
  return {
    type: RECEIVE_GENERAL,
    general
  };
};

export const fetchGeneral = () => {
  let url = `/api/general`;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
      .then(res => {
        dispatch(receiveGeneral(res.general));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => {
        dispatch(sendFetchFailure(err));
      });
  };
};

// News posts
export const receiveNewsPosts = newsPosts => {
  return {
    type: RECEIVE_NEWS_POSTS,
    newsPosts
  };
};

export const fetchNewsPosts = () => {
  let url = `/api/newsposts`;
  return function(dispatch) {
    dispatch(startLoading());
    return createFetchAPI(url)
      .then(res => {
        dispatch(receiveNewsPosts(res.newsPosts));
      })
      .then(() => {
        dispatch(endLoading());
      })
      .catch(err => {
        dispatch(sendFetchFailure(err));
      });
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

export const setFormat = format => ({
  type: SET_FORMAT,
  format
});

export const setSliderValue = (format, value) => ({
  type: SET_SLIDER_VALUE,
  format,
  value
});

export const setMetric = metric => ({
  type: SET_METRIC,
  metric
});

export const setImputeMissingValues = imputeMissingValues => ({
  type: SET_IMPUTE_MISSING_VALUES,
  imputeMissingValues
});

export const setSelectedUnit = selectedUnit => {
  return {
    type: SET_SELECTED_UNIT,
    selectedUnit
  };
};
