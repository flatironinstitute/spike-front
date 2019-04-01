import { RECEIVE_CPUS } from "../actions/actionCreators";

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

const cpus = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CPUS:
      return action.cpus;
    default:
      return state;
  }
};

export default cpus;
