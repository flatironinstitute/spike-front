import { RECEIVE_STUDIES } from "../actions/actionCreators";
import { initialState } from "./initialState";

const studies = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_STUDIES:
      return action.studies;
    default:
      return state;
  }
};

export default studies;
