import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Recordings from "./components/Recordings";
import Algos from "./components/Algos";
import Navbar from "./components/Navbar";
import headerCopy from "./header-copy";
import { getRecordings, getStudies } from "./dataHandlers";
import { isEmpty } from "./utils";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordings: [],
      studies: [],
      studySets: []
    };
  }

  componentDidMount() {
    this.fetchRecordings();
    this.fetchStudies();
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
    // TODO: Add more properties of the study sets
    uniques.forEach(set => {
      sets.push({name: set});
    })
    this.setState({studySets:sets});
  }

  render() {
    console.log('studySets 🐌', this.state.studySets);
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
            path="/Recordings"
            render={props => (
              <Recordings
                {...props}
                header={headerCopy.recordings}
                recordings={this.state.recordings}
                studies={this.state.studies}
                studySets={this.state.studySets}
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
