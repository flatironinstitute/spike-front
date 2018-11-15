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
// import ReactJson from "react-json-view";

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
    // TODO: FIND THE RIGHT LIFECYCLE EVENT FOR THIS
    this.filterAccuracy();
  }

  filterAccuracy() {
    let filtered = this.state.sortingResults.map(result => {
      let above = result.accuracies.filter(accu => accu >= this.state.accuracy);
      result.in_range = above.length;
      return result;
    });
    this.setState({
      sortingResults: filtered
    });
  }

  // TODO: update with filterAccuracy Function
  // shouldComponentUpdate(nextProps, nextState) {}

  render() {
    let loading = isEmpty(this.state.sortingResults);
    if (!loading) {
      console.log("⚱️ SORTING RESULTS 🕷️", this.state.sortingResults);
    }
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
                <svg width="1100" height="500">
                  <Heatmap />
                </svg>
              </div>
              {/* <div className="container">
                <h3>Sorting Results</h3>
                <ReactJson src={this.state.sortingResults} />
              </div> */}
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Home;
