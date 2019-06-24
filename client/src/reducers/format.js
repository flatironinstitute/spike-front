import { SET_FORMAT } from "../actions/actionCreators";
import { initialState } from "./initialState";

const setFormat = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORMAT:
      return action.format;
    default:
      return state;
  }
};

export default setFormat;
