import { RECEIVE_SORTERS } from "../actions/actionCreators";

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

const sorters = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SORTERS:
      return action.sorters;
    default:
      return state;
  }
};

export default sorters;
