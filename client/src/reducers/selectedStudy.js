import { SELECT_STUDY } from "../actions/actionCreators";
import { initialState } from "./initialState";

const selectedStudy = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STUDY:
      return action.study;
    default:
      return state;
  }
};

export default selectedStudy;
