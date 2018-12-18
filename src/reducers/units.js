import { REQUEST_UNITS, RECEIVE_UNITS } from "../actions/actionCreators";

const units = (state = {}, action) => {
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
