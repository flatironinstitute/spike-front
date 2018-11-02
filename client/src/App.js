import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Datasets from "./components/Datasets";
import Algos from "./components/Algos";
import Navbar from "./components/Navbar";
import headers from "./headers";

class App extends Component {
  render() {
    state = {
      headers: {}
    };

    loadHeaderCopy = () => {
      this.setState({ headers: headers });
    };

    const App = () => (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/algos" component={Algos} />
          <Route path="/about" component={About} />
          <Route path="/datasets" component={Datasets} />
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
