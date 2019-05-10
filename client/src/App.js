import React, { Component } from "react";

// import router dependencies
import PropTypes from "prop-types";
import { Router, withRouter } from "react-router";
import Routes from "./routes";

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return this.props.children;
  }
}

const Scroll = withRouter(ScrollToTop);
const Routes1 = withRouter(Routes);

const App = ({ history }) => {
  return (
    <Router history={history}>
      <Scroll>
        <Routes1 />
      </Scroll>
    </Router>
  );
};

App.propTypes = {
  history: PropTypes.object
};

export default App;
