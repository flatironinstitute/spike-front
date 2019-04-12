import { RECEIVE_PAIRING } from "../actions/actionCreators";
import { initialState } from "./initialState";

const pairing = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PAIRING:
      return action.pairing;
    default:
      return state;
  }
};

export default pairing;
