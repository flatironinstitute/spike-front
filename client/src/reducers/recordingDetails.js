import { RECEIVE_RECORDING_DETAILS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const recordingDetails = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RECORDING_DETAILS:
      return action.recordingDetails;
    default:
      return state;
  }
};

export default recordingDetails;
