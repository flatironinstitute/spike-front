import { SET_SLIDER_VALUE } from "../actions/actionCreators";
import { initialState } from "./initialState";

const setSliderValue = (state = initialState, action) => {
  switch (action.type) {
    case SET_SLIDER_VALUE:
      let x = {
          average: state.average,
          count: state.count
      }
      x[action.format] = action.value;
      return x;
    default:
      return state;
  }
};

export default setSliderValue;
