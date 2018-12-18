import { SELECT_STUDY } from "../actions/actionCreators";

const selectedStudy = (state = {}, action) => {
  switch (action.type) {
    case SELECT_STUDY:
      return { ...state, selectedStudy: action.study };
    default:
      return state;
  }
};

export default selectedStudy;
