import { RECEIVE_SORTING_RESULTS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const sortingResults = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SORTING_RESULTS:
      return action.sortingResults;
    default:
      return state;
  }
};

export default sortingResults;
