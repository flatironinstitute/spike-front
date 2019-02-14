import { RECEIVE_UNITS } from '../actions/actionCreators';

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

const units = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_UNITS:
      return action.units;
    default:
      return state;
  }
};

export default units;
