import {
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_FAILURE
} from "../actions/actionCreators";

import { initialState } from "./initialState";

const contactSent = (state = initialState, action) => {
  switch (action.type) {
    case SEND_CONTACT_SUCCESS:
      return action.contactSent;
    case SEND_CONTACT_FAILURE:
      return action.contactSent;
    default:
      return state;
  }
};

export default contactSent;
