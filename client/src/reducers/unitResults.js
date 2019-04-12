import { RECEIVE_UNIT_RESULTS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const unitResults = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_UNIT_RESULTS:
      return action.unitResults;
    default:
      return state;
  }
};

export default unitResults;
