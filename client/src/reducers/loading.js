import { START_LOADING, END_LOADING } from "../actions/actionCreators";

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

const loading = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return action.loading;
    case END_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export default loading;
