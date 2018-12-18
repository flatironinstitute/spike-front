import {
  REQUEST_RECORDINGS,
  RECEIVE_RECORDINGS
} from "../actions/actionCreators";

const recordings = (state = {}, action) => {
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
