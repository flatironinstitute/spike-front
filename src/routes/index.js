import React, { Component } from "react";
import { Route, Switch } from "react-router";

// import components
import Home from "../components/Home";
import About from "../components/About";
import Recordings from "../components/Recordings";
import Studies from "../components/Studies";
import Algos from "../components/Algos";
import Navbar from "../components/Navbar";
import SingleStudy from "../components/SingleStudy";
import headerCopy from "../header-copy";
import {
  getRecordings,
  getStudies,
  getSorters,
  getTrueUnits
} from "../dataHandlers";
import { isEmpty } from "../utils";

class Routes extends Component {
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
    this.fetchStudies();
    this.fetchRecordings();
    this.fetchSorters();
    this.fetchUnits();
  }

  async fetchRecordings() {
    const recordings = await getRecordings();
    if (
      recordings &&
      recordings.recordings.length &&
      isEmpty(this.state.recordings)
    ) {
      this.setState({
        recordings: recordings.recordings
      });
    }
  }

  async fetchStudies() {
    const studies = await getStudies();
    if (studies && studies.studies.length && isEmpty(this.state.studies)) {
      this.setState({
        studies: studies.studies
      });
    }
  }

  // TODO: Move this to redux
  getStudySets() {
    const uniques = [
      ...new Set(this.state.studies.map(study => study.study_set))
    ];
    const sets = [];
    uniques.forEach(set => {
      sets.push({
        name: set
      });
    });
    this.setState({
      studySets: sets
    });
  }

  async fetchSorters() {
    const sorters = await getSorters();
    if (sorters && sorters.sorters.length && isEmpty(this.state.sorters)) {
      this.setState({
        sorters: sorters.sorters
      });
    }
  }

  async fetchUnits() {
    const units = await getTrueUnits();
    if (units && units.true_units.length && isEmpty(this.state.units)) {
      this.setState({
        units: units.true_units
      });
    }
  }

  render() {
    return (
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
                recordings={this.state.recordings}
                studySets={this.state.studySets}
              />
            )}
          />
          <Route
            path="/algos"
            render={props => (
              <Algos
                {...props}
                header={headerCopy.algos}
                sorters={this.state.sorters}
              />
            )}
          />
          <Route
            path="/about"
            render={props => <About {...props} header={headerCopy.about} />}
          />
          <Route
            path="/recordings"
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
          <Route
            path="/studies"
            render={props => (
              <Studies
                {...props}
                header={headerCopy.studies}
                studies={this.state.studies}
                units={this.state.units}
              />
            )}
          />
          <Route
            path="/study/:studyId"
            render={props => (
              <SingleStudy
                {...props}
                studies={this.state.studies}
                units={this.state.units}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Routes;
