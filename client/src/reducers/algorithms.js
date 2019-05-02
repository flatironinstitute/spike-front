import { RECEIVE_ALGORITHMS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const algorithms = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALGORITHMS:
      return action.algorithms;
    default:
      return state;
  }
};

export default algorithms;
