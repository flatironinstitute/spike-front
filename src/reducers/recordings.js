import {
  REQUEST_RECORDINGS,
  RECEIVE_RECORDINGS
} from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: false
};

const recordings = (state = initialState, action) => {
  console.log("in the recordings reducer", state, action);
  switch (action.type) {
    case REQUEST_RECORDINGS:
      return { ...state, loading: true };
    case RECEIVE_RECORDINGS:
      return { ...state, recordings: action.recordings, loading: false };
    default:
      return state;
  }
};

export default recordings;
