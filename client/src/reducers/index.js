import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import recordings from "./recordings";
import selectedRecording from "./selectedRecording";
import selectedStudy from "./selectedStudy";
import sorters from "./sorters";
import studies from "./studies";
import units from "./units";
import pairing from "./pairing";
import recordingDetails from "./recordingDetails";
// V2 Data: Reducers
import contactSent from "./contactSent";
import cpus from "./cpus";
import groupedURs from "./groupedURs";
import loading from "./loading";

const rootReducer = history =>
  combineReducers({
    recordings,
    selectedRecording,
    selectedStudy,
    sorters,
    units,
    pairing,
    recordingDetails,
    // V2 Data: Reducers
    contactSent,
    cpus,
    groupedURs,
    loading,
    studies,
    router: connectRouter(history)
  });

export default rootReducer;
