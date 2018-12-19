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

class Routes extends Component {
  async componentDidMount() {
    this.props.fetchStudies();
    this.props.fetchSorters();
    this.props.fetchRecordings();
    this.props.fetchUnits();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...this.props} header={headerCopy.home} />}
          />
          <Route
            path="/algos"
            render={props => (
              <Algos {...this.props} header={headerCopy.algos} />
            )}
          />
          <Route
            path="/about"
            render={props => (
              <About {...this.props} header={headerCopy.about} />
            )}
          />
          <Route
            path="/recordings"
            render={props => (
              <Recordings {...this.props} header={headerCopy.recordings} />
            )}
          />
          <Route
            path="/studies"
            render={props => (
              <Studies {...this.props} header={headerCopy.studies} />
            )}
          />
          <Route
            path="/study/:studyId"
            render={props => <SingleStudy {...this.props} />}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recordings: state.recordings,
    studies: state.studies,
    sorters: state.sorters,
    units: state.units,
    loading: state.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
