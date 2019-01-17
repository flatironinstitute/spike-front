import { START_LOADING, END_LOADING } from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  selectedRecording: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: null
};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return action.loading;
    case END_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export default loading;
