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
  algorithms: null,
  contactSent: null,
  cpus: null,
  fetchFailure: false,
  format: "average",
  general: null,
  loading: null,
  metric: "accuracy",
  imputeMissingValues: true,
  newsPosts: null,
  selectedUnit: null,
  selectedSorterName: null,
  selectedStudyName: null,
  selectedStudySortingResult: null,
  sliderValue: { average: 8, count: 0.8 },
  sorters: null,
  sortingResults: null,
  stats: null,
  studySets: null,
  studyAnalysisResults: null
};

export const history = createBrowserHistory();
history.listen(location => ReactGA.pageview(location.pathname));

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer(history),
  defaultState,
  composeEnhancer(applyMiddleware(thunk, routerMiddleware(history)))
);

export default store;
