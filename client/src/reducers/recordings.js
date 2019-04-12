import { RECEIVE_RECORDINGS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const recordings = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RECORDINGS:
      return action.recordings;
    default:
      return state;
  }
};

export default recordings;
