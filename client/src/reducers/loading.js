import { START_LOADING, END_LOADING } from "../actions/actionCreators";
import { initialState } from "./initialState";

const loading = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return action.loading;
    case END_LOADING:
      return action.loading;
    default:
      return state;
  }
};

export default loading;
