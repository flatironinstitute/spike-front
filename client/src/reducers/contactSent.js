import {
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_FAILURE
} from "../actions/actionCreators";

const initialState = {
  selectedRecording: null,
  selectedStudy: null,
  recordings: null,
  sorters: null,
  units: null,
  pairing: null,
  recordingDetails: null,
  //V2 Data: States
  contactSent: null,
  cpus: null,
  groupedURs: null,
  loading: null,
  studies: null
};

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
