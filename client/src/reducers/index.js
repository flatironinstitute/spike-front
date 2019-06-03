import { combineReducers } from "redux";

// V2 Data: Reducers
import algorithms from "./algorithms";
import contactSent from "./contactSent";
import cpus from "./cpus";
import loading from "./loading";
import sortingResults from "./sortingResults";
import selectedStudySortingResult from "./selectedStudySortingResult";
import selectedStudyName from "./selectedStudyName";
import selectedSorterName from "./selectedSorterName";
import sorters from "./sorters";
import stats from "./stats";
import studySets from "./studysets";
import studyAnalysisResults from "./studyanalysisresults";
import general from "./general"

const rootReducer = history =>
  combineReducers({
    algorithms,
    contactSent,
    cpus,
    loading,
    sortingResults,
    selectedStudySortingResult,
    selectedStudyName,
    selectedSorterName,
    sorters,
    stats,
    studySets,
    studyAnalysisResults,
    general
  });

export default rootReducer;
