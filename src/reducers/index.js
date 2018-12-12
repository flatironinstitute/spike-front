import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import selectedSorter from "./selectedSorter";
import selectedStudy from "./selectedStudy";

const rootReducer = history =>
  combineReducers({
    selectedSorter,
    selectedStudy,
    router: connectRouter(history)
  });

export default rootReducer;
