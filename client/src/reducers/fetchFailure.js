import { FETCH_FAILURE } from "../actions/actionCreators";

import { initialState } from "./initialState";

const contactSent = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAILURE:
      return action.fetchFailure;
    default:
      return state;
  }
};

export default fetchFailure;
