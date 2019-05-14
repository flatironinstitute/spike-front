import { combineReducers } from "redux";

// V2 Data: Reducers
import algorithms from "./algorithms";
import contactSent from "./contactSent";
import cpus from "./cpus";
// import groupedURs from "./groupedURs";
import loading from "./loading";
import recordings from "./recordings";
import selectedStudySortingResult from "./selectedStudySortingResult";
import selectedStudyName from "./selectedStudyName";
import selectedSorterName from "./selectedSorterName";
import sorters from "./sorters";
import spikespray from "./spikespray";
import stats from "./stats";
import studies from "./studies";
import studysets from "./studysets";
import unitResults from "./unitResults";
import ursByStudy from "./ursByStudy";
import studyAnalysisResults from "./studyanalysisresults";
import unitDetail from "./unitdetail";

const rootReducer = history =>
  combineReducers({
    algorithms,
    contactSent,
    cpus,
    // groupedURs,
    loading,
    recordings,
    selectedStudySortingResult,
    selectedStudyName,
    selectedSorterName,
    sorters,
    spikespray,
    stats,
    studies,
    studysets,
    unitResults,
    studyAnalysisResults,
    ursByStudy,
    unitDetail
  });

export default rootReducer;
