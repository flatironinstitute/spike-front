import { RECEIVE_STATS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const sorters = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_STATS:
      return action.stats;
    default:
      return state;
  }
};

export default sorters;
