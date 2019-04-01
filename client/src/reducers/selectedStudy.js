import { SELECT_STUDY } from "../actions/actionCreators";

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

const selectedStudy = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STUDY:
      return action.study;
    default:
      return state;
  }
};

export default selectedStudy;
