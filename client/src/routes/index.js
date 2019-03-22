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
import Sorters from "../components/Pages/Sorters";
import Internals from "../components/Pages/Internals";
import Metrics from "../components/Pages/Metrics";
import Contact from "../components/Contact/Contact";
import SingleResultPairing from "../components/ResultPairingBits/SingleResultPairing";
import FourOhFour from "../components/Pages/FourOhFour";
import RawData from "../components/Pages/RawData";

class Routes extends Component {
  async componentDidMount() {
    this.props.fetchStudies();
    this.props.fetchSorters();
    this.props.fetchRecordings();
    this.props.fetchUnits();
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
            render={props => <Sorters {...this.props} />}
          />
          <Route
            path="/studies"
            render={props => <Studies {...this.props} />}
          />
          <Route
            path="/results/magland-synth-noise10-K10-C4/MountainSort4-thr3"
            render={props => <SingleResultPairing {...this.props} />}
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
    recordings: state.recordings,
    studies: state.studies,
    sorters: state.sorters,
    units: state.units,
    loading: state.loading,
    contactSent: state.contactSent,
    router: state.router,
    pairing: state.pairing,
    recordingDetails: state.recordingDetails
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
