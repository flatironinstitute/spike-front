import { RECEIVE_UNITS } from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: null
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
