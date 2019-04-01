import { RECEIVE_RECORDING_DETAILS } from "../actions/actionCreators";

const initialState = {
  selectedRecording: null,
  selectedStudy: null,
  recordings: null,
  sorters: null,
  units: null,
  pairing: null,
  recordingDetails: null,
  //V2 Data: States
  contactSent: null,
  cpus: null,
  groupedURs: null,
  loading: null,
  studies: null
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
