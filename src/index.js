import React from "react";
import ReactDOM from "react-dom";

// import css
import "normalize.css";
import "./index.css";

// import components
import App from "./App";

// import react router deps
import { BrowserRouter } from "react-router-dom";

// import service worker from CRA
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want this app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
