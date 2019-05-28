import { RECEIVE_STUDY_ANALYSIS_RESULTS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const studyAnalysisResults = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_STUDY_ANALYSIS_RESULTS:
      let old = state || {
        resultsByStudySet: {},
        allResults:[]
      };
      let ret = {
        resultsByStudySet: old.resultsByStudySet,
        allResults: old.allResults
      };
      action.studyAnalysisResults.forEach(sar => {
        ret.allResults.push(sar);
      });
      ret.resultsByStudySet[action.studySetName] = action.studyAnalysisResults;
      return ret;
    default:
      return state;
  }
};

export default studyAnalysisResults;
