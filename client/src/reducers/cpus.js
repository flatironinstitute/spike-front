import { RECEIVE_CPUS } from "../actions/actionCreators";
import { initialState } from "./initialState";

const cpus = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CPUS:
      return action.cpus;
    default:
      return state;
  }
};

export default cpus;
