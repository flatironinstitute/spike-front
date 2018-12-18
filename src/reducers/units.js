import { REQUEST_UNITS, RECEIVE_UNITS } from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: false
};

const units = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_UNITS:
      return { ...state, loading: true };
    case RECEIVE_UNITS:
      return { ...state, units: action.units, loading: false };
    default:
      return state;
  }
};

export default units;
