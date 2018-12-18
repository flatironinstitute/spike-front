import { REQUEST_SORTERS, RECEIVE_SORTERS } from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: false
};

const sorters = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SORTERS:
      return { ...state, loading: true };
    case RECEIVE_SORTERS:
      return { ...state, sorters: action.sorters, loading: false };
    default:
      return state;
  }
};

export default sorters;
