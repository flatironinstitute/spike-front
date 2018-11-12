import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import Error from "./Error";
import { isEmpty } from "../utils";
import { getBatchResults } from "../dataHandlers";
// TODO: Remove when JSON is done being used
import ReactJson from "react-json-view";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingResults: {},
      recordingResults: {},
      errors: []
    };
  }

  componentDidMount() {
    this.getBatchResults();
  }

  render() {
    return (
      <div>
        {this.state.errors.length ? <Error errors={this.state.errors} /> : null}
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {isEmpty(this.state.sortingResults) ? (
            <Preloader />
          ) : (
            <div className="container">
              <h3>Recording Results</h3>
              <ReactJson src={this.state.recordingResults} />
              <h3>Sorting Results</h3>
              <ReactJson src={this.state.sortingResults} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Home;
