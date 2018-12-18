import { REQUEST_STUDIES, RECEIVE_STUDIES } from "../actions/actionCreators";

const studies = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_STUDIES:
      return { ...state, loading: true };
    case RECEIVE_STUDIES:
      return { ...state, studies: action.studies, loading: false };
    default:
      return state;
  }
};

export default studies;
