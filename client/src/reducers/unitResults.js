import { RECEIVE_UNIT_RESULTS } from "../actions/actionCreators";

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

const unitResults = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_UNIT_RESULTS:
      return action.unitResults;
    default:
      return state;
  }
};

export default unitResults;
