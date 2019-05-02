import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import recordings from "./recordings";
import selectedRecording from "./selectedRecording";
import selectedStudySortingResult from "./selectedStudySortingResult";
import pairing from "./pairing";
import recordingDetails from "./recordingDetails";
// V2 Data: Reducers
import contactSent from "./contactSent";
import cpus from "./cpus";
import groupedURs from "./groupedURs";
import loading from "./loading";
import unitResults from "./unitResults";
import sorters from "./sorters";
import algorithms from "./algorithms";
import studies from "./studies";
import stats from "./stats";
import studysets from "./studysets";

const rootReducer = history =>
  combineReducers({
    recordings,
    selectedRecording,
    pairing,
    recordingDetails,
    // V2 Data: Reducers
    contactSent,
    cpus,
    groupedURs,
    loading,
    selectedStudySortingResult,
    stats,
    studies,
    studysets,
    sorters,
    algorithms,
    unitResults,
    router: connectRouter(history)
  });

export default rootReducer;
