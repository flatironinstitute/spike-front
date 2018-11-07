import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Datasets from "./components/Datasets";
import Algos from "./components/Algos";
import Navbar from "./components/Navbar";
import Error from "./components/Error";
import headerCopy from "./header-copy";

class App extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      datasets: [],
      studies: [],
      errors: ["testing errors 📓"]
    };
  }

  // Fetch the datasets on first mount
  componentDidMount() {
    this.getStudiesProcessed();
  }

  // Retrieves the list of datasets from the Express app
  getStudiesProcessed = () => {
    fetch("/api/getStudiesProcessed")
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          datasets: json.datasets,
          studies: json.studies,
          errors: ["#2 testing errors 🔖📓"]
        });
      })
      .catch(err => {
        this.setState({
          errors: [
            ...this.state.errors,
            "🤦‍ spikeforest_studies_processed failed to load"
          ]
        });
      });
  };

  render() {
    const App = () => (
      <div>
        <Navbar />
        {this.state.errors.length ? <Error errors={this.state.errors} /> : null}
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                header={headerCopy.home}
                studies={this.state.studies}
                datasets={this.state.datasets}
              />
            )}
          />
          <Route
            path="/algos"
            render={props => (
              <Algos
                {...props}
                header={headerCopy.algos}
                studies={this.state.studies}
                datasets={this.state.datasets}
              />
            )}
          />
          <Route
            path="/about"
            render={props => <About {...props} header={headerCopy.about} />}
          />
          <Route
            path="/datasets"
            render={props => (
              <Datasets
                {...props}
                header={headerCopy.datasets}
                studies={this.state.studies}
                datasets={this.state.datasets}
              />
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
