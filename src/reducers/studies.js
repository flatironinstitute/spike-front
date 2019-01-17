import { RECEIVE_STUDIES } from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  selectedRecording: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: null
};

const studies = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_STUDIES:
      return action.studies;
    default:
      return state;
  }
};

export default studies;
