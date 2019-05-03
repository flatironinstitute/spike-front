import { RECEIVE_URS_BY_STUDY } from "../actions/actionCreators";
import { initialState } from "./initialState";

const ursByStudy = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_URS_BY_STUDY:
            return action.ursByStudy;
        default:
            return state;
    }
};

export default ursByStudy;