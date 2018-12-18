import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";

// import components
import Home from "../components/Home";
import About from "../components/About";
import Recordings from "../components/Recordings";
import Studies from "../components/Studies";
import Algos from "../components/Algos";
import Navbar from "../components/Navbar";
import SingleStudy from "../components/SingleStudy";
import headerCopy from "../header-copy";
// import {
//   fetchRecordings,
//   fetchSorters,
//   fetchStudies,
//   fetchUnits
// } from "../actions/actionCreators";

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStudies();
    this.props.fetchRecordings();
    this.props.fetchSorters();
    this.props.fetchUnits();
  }

  // async fetchRecordings() {
  //   const recordings = await getRecordings();
  //   if (recordings && recordings.length && isEmpty(this.state.recordings)) {
  //     this.setState({
  //       recordings: recordings
  //     });
  //   }
  // }

  // async fetchStudies() {
  //   const studies = await getStudies();
  //   if (studies && studies.length && isEmpty(this.state.studies)) {
  //     this.setState({
  //       studies: studies
  //     });
  //   }
  // }

  // TODO: Move this to redux
  // getStudySets() {
  //   const uniques = [
  //     ...new Set(this.state.studies.map(study => study.study_set))
  //   ];
  //   const sets = [];
  //   uniques.forEach(set => {
  //     sets.push({
  //       name: set
  //     });
  //   });
  //   this.setState({
  //     studySets: sets
  //   });
  // }

  // async fetchSorters() {
  //   const sorters = await getSorters();
  //   if (sorters && sorters.length && isEmpty(this.state.sorters)) {
  //     this.setState({
  //       sorters: sorters
  //     });
  //   }
  // }

  // async fetchUnits() {
  //   const units = await getTrueUnits();
  //   if (units && units.length && isEmpty(this.state.units)) {
  //     this.setState({
  //       units: units
  //     });
  //   }
  // }

  render() {
    return (
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
            path="/recordings"
            render={props => (
              <Recordings {...props} header={headerCopy.recordings} />
            )}
          />
          <Route
            path="/studies"
            render={props => <Studies {...props} header={headerCopy.studies} />}
          />
          <Route
            path="/study/:studyId"
            render={props => <SingleStudy {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Routes;
