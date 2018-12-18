import { SELECT_STUDY } from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: false
};

const selectedStudy = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STUDY:
      return { ...state, selectedStudy: action.study };
    default:
      return state;
  }
};

export default selectedStudy;
