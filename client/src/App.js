import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Datasets from "./components/Datasets";
import Algos from "./components/Algos";
import Navbar from "./components/Navbar";
import headerCopy from "./header-copy";

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} header={headerCopy.home} />}
          />
          <Route
            path="/algos"
            render={props => <Algos {...props} header={headerCopy.algos} />}
          />
          <Route
            path="/about"
            render={props => <About {...props} header={headerCopy.about} />}
          />
          <Route
            path="/datasets"
            render={props => (
              <Datasets {...props} header={headerCopy.datasets} />
            )}
          />
        </Switch>
      </div>
    );
    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;
