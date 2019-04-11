import { RECEIVE_STUDY_SETS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const studysets = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_STUDY_SETS:
      return action.studysets;
    default:
      return state;
  }
};

export default studysets;
