import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import Error from "./Error";
import { isEmpty } from "../utils";
import { getBatchResults, getSortingResults } from "../dataHandlers";
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
    this.fetchBatchData();
  }

  async fetchBatchData() {
    const allBatches = await getBatchResults();
    if (allBatches.length && isEmpty(this.state.recordingResults)) {
      this.setRecordingResults(allBatches);
      this.setSortingResults(allBatches);
    }
  }

  // TODO: These arrays are now empty.🤔
  async setRecordingResults(allBatches) {
    const recordingResults = allBatches
      .map(batch => batch.summarize_recording_results)
      .flat();
    this.setState({
      recordingResults
    });
  }

  async setSortingResults(allBatches) {
    const sortingResults = await getSortingResults(allBatches);
    this.setState({
      sortingResults
    });
  }

  render() {
    let loading = isEmpty(this.state.sortingResults);
    console.log(loading, this.state.sortingResults);
    return (
      <div>
        {this.state.errors.length ? <Error errors={this.state.errors} /> : null}
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {loading ? (
            <Preloader />
          ) : (
            <div className="container">
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
