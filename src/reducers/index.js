import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import recordings from "./recordings";
import selectedStudy from "./selectedStudy";
import sorters from "./sorters";
import studies from "./studies";
import units from "./units";

const rootReducer = history =>
  combineReducers({
    recordings,
    selectedStudy,
    sorters,
    studies,
    units,
    router: connectRouter(history)
  });

export default rootReducer;
