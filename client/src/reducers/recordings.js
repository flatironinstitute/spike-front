import { RECEIVE_RECORDINGS } from "../actions/actionCreators";

const initialState = {
  selectedRecording: null,
  selectedStudy: null,
  recordings: null,
  pairing: null,
  recordingDetails: null,
  //V2 Data: States
  contactSent: null,
  cpus: null,
  groupedURs: null,
  loading: null,
  studies: null,
  sorters: null,
  unitResults: null
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
