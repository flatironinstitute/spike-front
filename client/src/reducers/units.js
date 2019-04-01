import { RECEIVE_UNITS } from "../actions/actionCreators";

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

const units = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_UNITS:
      return action.units;
    default:
      return state;
  }
};

export default units;
