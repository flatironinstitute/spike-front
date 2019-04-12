import { SELECT_RECORDING } from "../actions/actionCreators";
import { initialState } from "./initialState";

const selectedRecording = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_RECORDING:
      return action.recording;
    default:
      return state;
  }
};

export default selectedRecording;
