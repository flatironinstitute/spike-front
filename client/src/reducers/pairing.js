import { RECEIVE_PAIRING } from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  selectedRecording: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: null,
  pairing: null
};

const pairing = (state = initialState, action) => {
  if (action.pairing) {
    console.log("🚣‍♂️, PAIRING IN REDUCER", action.pairing);
  }
  switch (action.type) {
    case RECEIVE_PAIRING:
      return action.pairing;
    default:
      return state;
  }
};

export default pairing;
