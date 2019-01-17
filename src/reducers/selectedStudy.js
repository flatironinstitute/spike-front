import { SELECT_STUDY } from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  selectedRecording: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: null
};

const selectedStudy = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STUDY:
      return action.study;
    default:
      return state;
  }
};

export default selectedStudy;
