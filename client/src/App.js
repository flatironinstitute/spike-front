import React, { Component } from "react";

// import router dependencies
import PropTypes from "prop-types";
import { Route, Router, Switch, withRouter } from "react-router";
import Routes from "./routes";
import Landing from "./components/Landing/Landing";

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
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes1} />
        </Switch>
      </Scroll>
    </Router>
  );
};

App.propTypes = {
  history: PropTypes.object
};

export default App;
