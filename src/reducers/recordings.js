import { RECEIVE_RECORDINGS } from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  selectedRecording: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: null
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
