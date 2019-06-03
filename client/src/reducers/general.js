import { RECEIVE_GENERAL } from "../actions/actionCreators";
import { initialState } from "./initialState";

const general = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_GENERAL:
      return action.general;
    default:
      return state;
  }
};

export default general;
