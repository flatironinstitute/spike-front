import { combineReducers } from "redux";

// V2 Data: Reducers
import algorithms from "./algorithms";
import contactSent from "./contactSent";
import cpus from "./cpus";
import fetchFailure from "./fetchFailure";
import format from "./format";
import general from "./general";
import imputeMissingValues from "./imputeMissingValues";
import loading from "./loading";
import metric from "./metric";
import newsPosts from "./newsPosts";
import selectedSorterName from "./selectedSorterName";
import selectedStudyName from "./selectedStudyName";
import selectedStudySortingResult from "./selectedStudySortingResult";
import selectedUnit from "./selectedUnit";
import sliderValue from "./sliderValue";
import sorters from "./sorters";
import sortingResults from "./sortingResults";
import stats from "./stats";
import studyAnalysisResults from "./studyanalysisresults";
import studySets from "./studysets";

const rootReducer = history =>
  combineReducers({
    algorithms,
    contactSent,
    cpus,
    fetchFailure,
    format,
    general,
    imputeMissingValues,
    loading,
    metric,
    newsPosts,
    selectedSorterName,
    selectedStudyName,
    selectedStudySortingResult,
    selectedUnit,
    sliderValue,
    sorters,
    sortingResults,
    stats,
    studyAnalysisResults,
    studySets
  });

export default rootReducer;
