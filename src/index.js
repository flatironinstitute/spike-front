import React from "react";
import ReactDOM from "react-dom";

// import redux and router deps
import { Provider } from "react-redux";
import store, { history } from "./store";

// import css
import "normalize.css";
import "./index.css";

// import components
import App from "./App";

// import service worker from CRA
import * as serviceWorker from "./serviceWorker";

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
