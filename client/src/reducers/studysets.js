import { RECEIVE_STUDY_SETS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const studySets = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_STUDY_SETS:
      return action.studySets;
    default:
      return state;
  }
};

export default studySets;
