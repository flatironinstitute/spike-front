import { SET_IMPUTE_MISSING_VALUES } from "../actions/actionCreators";
import { initialState } from "./initialState";

const setImputeMissingValues = (state = initialState, action) => {
  switch (action.type) {
    case SET_IMPUTE_MISSING_VALUES:
      return action.imputeMissingValues;
    default:
      return state;
  }
};

export default setImputeMissingValues;
