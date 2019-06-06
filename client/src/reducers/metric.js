import { SET_METRIC } from "../actions/actionCreators";
import { initialState } from "./initialState";

const setMetric = (state = initialState, action) => {
  switch (action.type) {
    case SET_METRIC:
      return action.metric;
    default:
      return state;
  }
};

export default setMetric;
