import { combineReducers } from "redux";

// V2 Data: Reducers
import algorithms from "./algorithms";
import contactSent from "./contactSent";
import cpus from "./cpus";
import format from "./format";
import loading from "./loading";
import metric from "./metric";
import newsPosts from "./newsPosts";
import sortingResults from "./sortingResults";
import selectedStudySortingResult from "./selectedStudySortingResult";
import selectedStudyName from "./selectedStudyName";
import selectedSorterName from "./selectedSorterName";
import selectedUnit from "./selectedUnit";
import sorters from "./sorters";
import sliderValue from "./sliderValue";
import stats from "./stats";
import studySets from "./studysets";
import studyAnalysisResults from "./studyanalysisresults";
import general from "./general"

const rootReducer = history =>
  combineReducers({
    algorithms,
    contactSent,
    cpus,
    format,
    loading,
    metric,
    newsPosts,
    sortingResults,
    selectedUnit,
    selectedStudySortingResult,
    selectedStudyName,
    selectedSorterName,
    sliderValue,
    sorters,
    stats,
    studySets,
    studyAnalysisResults,
    general
  });

export default rootReducer;
