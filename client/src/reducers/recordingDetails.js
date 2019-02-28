import { RECEIVE_RECORDING_DETAILS } from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  selectedRecording: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: null,
  pairing: null,
  recordingDetails: null
};

const recordingDetails = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RECORDING_DETAILS:
      return action.recordingDetails;
    default:
      return state;
  }
};

export default recordingDetails;
