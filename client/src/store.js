import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";

import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

// create an object for the default data
const defaultState = {
  selectedRecording: null,
  selectedStudy: null,
  recordings: null,
  pairing: null,
  recordingDetails: null,
  //V2 Data: States
  loading: null,
  contactSent: null,
  cpus: null,
  groupedURs: null,
  studies: null,
  sorters: null,
  unitResults: null
};

export const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer(history),
  defaultState,
  composeEnhancer(applyMiddleware(thunk, routerMiddleware(history)))
);

export default store;
