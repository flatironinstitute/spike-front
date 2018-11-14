import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import Error from "./Error";
import Heatmap from "./Heatmap";
import { isEmpty } from "../utils";
import {
  getRecordingsSummary,
  getBatchResults,
  getSortingResults
} from "../dataHandlers";
// TODO: Remove when JSON is done being used
import ReactJson from "react-json-view";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batches: {},
      sortingResults: {},
      recordingSummary: {},
      accuracy: 0.8,
      errors: []
    };
  }

  componentDidMount() {
    this.fetchBatchData();
    this.fetchRecordingsSummary();
  }

  async fetchRecordingsSummary() {
    const summary = await getRecordingsSummary();
    if (summary.length && isEmpty(this.state.recordingSummary)) {
      this.setState({ recordingSummary: summary });
    }
  }

  async fetchBatchData() {
    const allBatches = await getBatchResults();
    this.setState({ batches: allBatches });
    if (allBatches.length && isEmpty(this.state.sortingResults)) {
      this.setSortingResults(allBatches);
    }
  }

  async setSortingResults(allBatches) {
    const sortingResults = await getSortingResults(allBatches);
    this.setState({
      sortingResults
    });
  }

  render() {
    let loading = isEmpty(this.state.sortingResults);
    return (
      <div>
        {this.state.errors.length ? <Error errors={this.state.errors} /> : null}
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {loading ? (
            <Preloader />
          ) : (
            <div>
              <div className="container">
                <Heatmap />
              </div>
              <div className="container">
                <h3>Sorting Results</h3>
                <ReactJson src={this.state.sortingResults} />
              </div>
              <div className="container">
                <h3>Recording Results</h3>
                <ReactJson src={this.state.recordingSummary} />
              </div>
              <div className="container">
                <h3>Batch Results</h3>
                <ReactJson src={this.state.batches} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Home;
