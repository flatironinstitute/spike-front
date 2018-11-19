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
import * as cache from "../cache";

// TODO: Remove when JSON is done being used
import ReactJson from "react-json-view";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingResults: {},
      recordingSummary: {},
      accuracy: 0.9,
      errors: []
    };
  }

  componentDidMount() {
    let existingResults = cache.get("sortingResults");
    let existingRecordings = cache.get("recordingSummary");
    if (existingResults) {
      this.setState({ sortingResults: existingResults });
    } else {
      this.fetchBatchData();
    }
    if (existingRecordings) {
      this.setState({ recordingSummary: existingRecordings });
    } else {
      this.fetchRecordingsSummary();
    }
  }

  async fetchRecordingsSummary() {
    const summary = await getRecordingsSummary();
    if (summary.job_results.length && isEmpty(this.state.recordingSummary)) {
      cache.set("recordingSummary", summary);
      this.setState({ recordingSummary: summary });
    }
  }

  async fetchBatchData() {
    const allBatches = await getBatchResults();
    if (allBatches.length && isEmpty(this.state.sortingResults)) {
      this.setSortingResults(allBatches);
    }
  }

  async setSortingResults(allBatches) {
    const sortingResults = await getSortingResults(allBatches);
    this.setState({
      sortingResults
    });
    this.filterAccuracy();
  }

  // TODO: Separate filter accuracy in the lifecycle to allow for re-render
  filterAccuracy() {
    let filtered = this.state.sortingResults.map(result => {
      let above = result.accuracies.filter(accu => accu >= this.state.accuracy);
      result.in_range = above.length;
      return result;
    });
    this.setState({
      sortingResults: filtered
    });
    cache.set("sortingResults", filtered);
  }

  getStudies() {
    return this.state.sortingResults
      .map(item => item.study)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  // TODO: remove if unused
  getSorters() {
    return this.state.sortingResults
      .map(item => item.sorter)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  render() {
    let loading = isEmpty(this.state.sortingResults);
    if (!loading) {
      console.log("🏆 SORTING RESULTS 🐯", this.state.sortingResults);
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
                <Heatmap
                  results={this.state.sortingResults}
                  studies={this.getStudies()}
                />
              </div>
              <div className="container">
                <h3>Sorting Results</h3>
                <ReactJson src={this.state.sortingResults} />
              </div>
              <div className="container">
                <h3>Recording Results</h3>
                <ReactJson src={this.state.recordingSummary} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Home;
