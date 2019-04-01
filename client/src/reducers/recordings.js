import { RECEIVE_RECORDINGS } from "../actions/actionCreators";

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

const recordings = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RECORDINGS:
      return action.recordings;
    default:
      return state;
  }
};

export default recordings;
