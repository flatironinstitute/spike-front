import { SELECT_RECORDING } from '../actions/actionCreators';

const initialState = {
  selectedStudy: null,
  selectedRecording: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: null,
  pairing: null,
};

const selectedRecording = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_RECORDING:
      return action.recording;
    default:
      return state;
  }
};

export default selectedRecording;
