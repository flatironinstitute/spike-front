import React, { Component } from "react";
import { Route, Switch } from "react-router";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";

// import components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import Home from "../components/Pages/Home";
import About from "../components/Pages/About";
import Recordings from "../components/Pages/Recordings";
import Studies from "../components/Pages/Studies";
import Algorithms from "../components/Pages/Algorithms";
import Internals from "../components/Pages/Internals";
import Metrics from "../components/Pages/Metrics";
import Contact from "../components/Contact/Contact";
import DetailPage from "../components/DetailPage/DetailPage";
import FourOhFour from "../components/Pages/FourOhFour";
import RawData from "../components/Pages/RawData";

class Routes extends Component {
  async componentDidMount() {
    // V2 Data: Fetches
    this.props.fetchCPUs();
    this.props.fetchStudies();
    this.props.fetchGroupedURs();
    this.props.fetchSorters();
    this.props.fetchAlgorithms();
    this.props.fetchStats();
    this.props.fetchStudySets();
    this.props.fetchRecordings();
    // V1 Data: Fetches
    // TODO: REMOVE?
    // this.props.fetchUnitResults();
    // this.props.fetchUnits();
  }

  render() {
    return (
      <div className="wrapper">
        <Header router={this.props.router} />
        <Switch>
          <Route exact path="/" render={props => <Home {...this.props} />} />
          <Route path="/about" render={props => <About {...this.props} />} />
          <Route
            path="/contact"
            render={props => <Contact {...this.props} />}
          />
          <Route
            path="/internals"
            render={props => <Internals {...this.props} />}
          />
          <Route
            path="/metrics"
            render={props => <Metrics {...this.props} />}
          />
          <Route
            path="/rawdata"
            render={props => <RawData {...this.props} />}
          />
          <Route
            path="/recordings"
            render={props => <Recordings {...this.props} />}
          />
          <Route
            path="/sorters"
            render={props => <Algorithms algorithms={this.props.algorithms} />}
          />
          <Route
            path="/studies"
            render={props => <Studies {...this.props} />}
          />
          <Route
            path="/study/:studyName"
            render={props => <DetailPage {...this.props} />}
          />
          <Route render={props => <FourOhFour {...this.props} />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    router: state.router,
    pairing: state.pairing,
    recordingDetails: state.recordingDetails,
    // V2 Data: props
    contactSent: state.contactSent,
    cpus: state.cpus,
    groupedURs: state.groupedURs,
    loading: state.loading,
    recordings: state.recordings,
    sorters: state.sorters,
    algorithms: state.algorithms,
    stats: state.stats,
    studies: state.studies,
    studysets: state.studysets,
    selectedStudySortingResult: state.selectedStudySortingResult,
    unitResults: state.unitResults,
    ursByStudy: state.ursByStudy
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
