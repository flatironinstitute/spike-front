import {
  createStore,
  compose
} from "redux";

// import the root reducer
import rootReducer from "./reducers/index";

// create an object for the default data
const defaultState = {
  selectedStudy: null,
  selectedSorter: null
};

// TODO: look at redux-async-intitial-state for handling async initial state and local storage
const store = createStore(rootReducer, defaultState);

export default store;