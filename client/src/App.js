import React from "react";
import ReactGA from "react-ga";

// import router dependencies
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import Routes from "./routes";

const gaTag = 'UA-138500572-1';

ReactGA.initialize(gaTag);

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
