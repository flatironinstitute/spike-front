import ReactGA from "react-ga";
import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";

import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const gaTag = "UA-138500572-1";
ReactGA.initialize(gaTag);

// create an object for the default data
const defaultState = {
  pairing: null,
  recordingDetails: null,
  //V2 Data: States
  contactSent: null,
  cpus: null,
  // groupedURs: null,
  loading: null,
  recordings: null,
  selectedStudySortingResult: null,
  selectedStudyName: null,
  selectedSorterName: null,
  sorters: null,
  stats: null,
  studies: null,
  studysets: null,
  unitResults: null,
  ursByStudy: null,
  studyAnalysisResults: null
};

export const history = createBrowserHistory();
// history.listen(location => ReactGA.pageview(location.pathname));

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer(history),
  defaultState,
  composeEnhancer(applyMiddleware(thunk, routerMiddleware(history)))
);

export default store;
