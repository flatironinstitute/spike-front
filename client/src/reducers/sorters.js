import { RECEIVE_SORTERS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const sorters = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SORTERS:
      return action.sorters;
    default:
      return state;
  }
};

export default sorters;
