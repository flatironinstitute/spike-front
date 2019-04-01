import { RECEIVE_GROUPED_URS } from "../actions/actionCreators";

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

const groupedURs = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_GROUPED_URS:
      return action.groupedURs;
    default:
      return state;
  }
};

export default groupedURs;
