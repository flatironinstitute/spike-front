import React from "react";
import ReactGA from "react-ga";

// import router dependencies
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import Routes from "./routes";

const gaTag = process.env.REACT_APP_GA;

ReactGA.initialize(gatag);

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

export default App;
