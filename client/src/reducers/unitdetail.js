import { RECEIVE_UNIT_DETAIL } from "../actions/actionCreators";
import { initialState } from "./initialState";

const unitDetail = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_UNIT_DETAIL:
      return action.unitDetail;
    default:
      return state;
  }
};

export default unitDetail;
