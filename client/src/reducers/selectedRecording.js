import { SELECT_RECORDING } from "../actions/actionCreators";

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
  studies: null,
  loading: null
};

const selectedRecording = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_RECORDING:
      return action.recording;
    default:
      return state;
  }
};

export default selectedRecording;
