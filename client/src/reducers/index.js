import { combineReducers } from "redux";

// V2 Data: Reducers
import algorithms from "./algorithms";
import contactSent from "./contactSent";
import cpus from "./cpus";
import loading from "./loading";
import recordings from "./recordings";
import sortingResults from "./sortingResults";
import selectedStudySortingResult from "./selectedStudySortingResult";
import selectedStudyName from "./selectedStudyName";
import selectedSorterName from "./selectedSorterName";
import sorters from "./sorters";
import stats from "./stats";
import studies from "./studies";
import studysets from "./studysets";
import studyAnalysisResults from "./studyanalysisresults";

const rootReducer = history =>
  combineReducers({
    algorithms,
    contactSent,
    cpus,
    loading,
    recordings,
    sortingResults,
    selectedStudySortingResult,
    selectedStudyName,
    selectedSorterName,
    sorters,
    stats,
    studies,
    studysets,
    studyAnalysisResults
  });

export default rootReducer;
