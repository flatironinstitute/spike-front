import { RECEIVE_STUDY_ANALYSIS_RESULTS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const studyAnalysisResults = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_STUDY_ANALYSIS_RESULTS:
      return action.studyAnalysisResults;
    default:
      return state;
  }
};

export default studyAnalysisResults;
