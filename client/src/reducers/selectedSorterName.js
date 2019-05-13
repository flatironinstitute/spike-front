import { SELECT_SORTER_NAME } from "../actions/actionCreators";
import { initialState } from "./initialState";

const selectedSorterName = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_SORTER_NAME:
      return action.sorterName;
    default:
      return state;
  }
};

export default selectedSorterName;
