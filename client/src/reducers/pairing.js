import { RECEIVE_PAIRING } from "../actions/actionCreators";

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
  sorters: null,
  stats: null,
  studies: null,
  unitResults: null
};

const pairing = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PAIRING:
      return action.pairing;
    default:
      return state;
  }
};

export default pairing;
