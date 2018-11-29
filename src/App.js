import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Recordings from "./components/Recordings";
import Algos from "./components/Algos";
import Navbar from "./components/Navbar";
import headerCopy from "./header-copy";
import { getRecordings, getStudies, getSorters, getTrueUnits } from "./dataHandlers";
import { isEmpty } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordings: [],
      studies: [],
      studySets: [],
      sorters: [],
      units: []
    };
  }

  componentDidMount() {
    this.fetchRecordings();
    this.fetchStudies();
    this.fetchSorters();
    this.fetchUnits();
  }

  async fetchRecordings() {
    const recordings = await getRecordings();
    if (recordings.recordings.length && isEmpty(this.state.recordings)) {
      this.setState(recordings: recordings.recordings);
    }
  }

  async fetchStudies() {
    const studies = await getStudies();
    if (studies.studies.length && isEmpty(this.state.studies)) {
      this.setState(studies: studies.studies);
    }
    this.getStudySets();
  }

  getStudySets() {
    const uniques = [...new Set(this.state.studies.map(study => study.study_set))];
    const sets = [];
    uniques.forEach(set => {
      sets.push({name: set});
    })
    this.setState({studySets:sets});
  }

  async fetchSorters() {
    const sorters = await getSorters();
    if (sorters.sorters.length && isEmpty(this.state.sorters)) {
      this.setState({sorters: sorters.sorters});
    }
  }

  async fetchUnits() {
    const units = await getTrueUnits();
    if (units.true_units.length && isEmpty(this.state.units)) {
      this.setState({units: units.true_units});
    }
  }

  render() {
    const App = () => (
      <div>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home 
                {...props} 
                header={headerCopy.home} 
                sorters={this.state.sorters} 
                studies={this.state.studies} 
                units={this.state.units}
              />
            )}
          />
          <Route
            path="/algos"
            render={props => <Algos {...props} header={headerCopy.algos} sorters={this.state.sorters} />}
          />
          <Route
            path="/about"
            render={props => <About {...props} header={headerCopy.about} />}
          />
          <Route
            path="/Recordings"
            render={props => (
              <Recordings
                {...props}
                header={headerCopy.recordings}
                recordings={this.state.recordings}
                studies={this.state.studies}
                studySets={this.state.studySets}
                sorters={this.state.sorters}
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
