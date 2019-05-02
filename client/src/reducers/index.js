import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import recordings from "./recordings";
import selectedRecording from "./selectedRecording";
import pairing from "./pairing";
import recordingDetails from "./recordingDetails";
// V2 Data: Reducers
import contactSent from "./contactSent";
import cpus from "./cpus";
import groupedURs from "./groupedURs";
import loading from "./loading";
import selectedStudySortingResult from "./selectedStudySortingResult";
import sorters from "./sorters";
import stats from "./stats";
import studies from "./studies";
import studysets from "./studysets";
import unitResults from "./unitResults";
import ursByStudy from "./ursByStudy";

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
    sorters,
    stats,
    studies,
    studysets,
    unitResults,
    ursByStudy,
    router: connectRouter(history)
  });

export default rootReducer;
