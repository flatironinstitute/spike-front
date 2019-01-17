import { RECEIVE_SORTERS } from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  selectedRecording: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: null
};

const sorters = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SORTERS:
      return action.sorters;
    default:
      return state;
  }
};

export default sorters;
