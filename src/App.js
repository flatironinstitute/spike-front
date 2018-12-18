import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "./actions/actionCreators";

// import router dependencies
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import Routes from "./routes";

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  );
};

App.propTypes = {
  history: PropTypes.object
};

function mapStateToProps(state) {
  return {
    recordings: state.recordings,
    studies: state.studies,
    sorters: state.sorters,
    units: state.units,
    loading: state.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
