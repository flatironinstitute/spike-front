import { RECEIVE_UNIT_DETAIL } from "../actions/actionCreators";
import { initialState } from "./initialState";

const unitDetail = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_UNIT_DETAIL:
      let ud = action.unitDetail;
      let a = state.unitDetail || {};
      a[`${ud.studyName}/${ud.recordingName}/${ud.sorterName}/${ud.trueUnitId}`] = action.unitDetail;
      return a;
    default:
      return state;
  }
};

export default unitDetail;
