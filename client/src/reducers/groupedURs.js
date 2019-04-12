import { RECEIVE_GROUPED_URS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const groupedURs = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_GROUPED_URS:
      return action.groupedURs;
    default:
      return state;
  }
};

export default groupedURs;
