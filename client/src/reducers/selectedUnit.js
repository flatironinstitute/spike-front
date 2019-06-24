import { SET_SELECTED_UNIT } from "../actions/actionCreators";
import { initialState } from "./initialState";

const setSelectedUnit = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_UNIT:
      return action.selectedUnit;
    default:
      return state;
  }
};

export default setSelectedUnit;
