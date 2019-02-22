import {
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_FAILURE
} from "../actions/actionCreators";

const initialState = {
  selectedStudy: null,
  selectedRecording: null,
  recordings: null,
  sorters: null,
  studies: null,
  units: null,
  loading: null,
  contactSent: null,
  pairing: null
};

const contactSent = (state = initialState, action) => {
  switch (action.type) {
    case SEND_CONTACT_SUCCESS:
      return action.contactSent;
    case SEND_CONTACT_SUCCESS:
      return action.contactSent;
    default:
      return state;
  }
};

export default contactSent;
