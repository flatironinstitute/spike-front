import React from "react";
import ReactDOM from "react-dom";

// import redux and router deps
import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers";

// import css
import "normalize.css";
import "./index.css";

// import components
import App from "./App";

// import service worker from CRA
import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer(history),
  composeEnhancer(applyMiddleware(routerMiddleware(history)))
);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App history={history} />
    </Provider>,
    document.getElementById("root")
  );
};

render();
serviceWorker.register();
