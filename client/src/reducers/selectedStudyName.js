import { SELECT_STUDY_NAME } from "../actions/actionCreators";
import { initialState } from "./initialState";

const selectedStudyName = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STUDY_NAME:
      return action.studyName;
    default:
      return state;
  }
};

export default selectedStudyName;
