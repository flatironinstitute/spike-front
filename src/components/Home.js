import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import Error from "./Error";
import HeatmapContainer from "./HeatmapContainer";
import { isEmpty } from "../utils";
import { getBatchResults, getSortingResults } from "../dataHandlers";

// TODO: Remove when JSON is done being used
// import ReactJson from "react-json-view";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingResults: {},
      recordings: {},
      accuracy: 0.8,
      errors: []
    };
  }

  componentDidMount() {
    this.fetchBatchData();
  }

  async fetchBatchData() {
    const allBatches = await getBatchResults();
    if (allBatches.length && isEmpty(this.state.sortingResults)) {
      this.setSortingResults(allBatches);
    }
  }

  async setSortingResults(allBatches) {
    const sortingResults = await getSortingResults(allBatches);
    this.filterAccuracy(sortingResults);
  }

  // TODO: Separate filter accuracy in the lifecycle to allow for re-render
  filterAccuracy(sortingResults) {
    let filtered = sortingResults.map(result => {
      let above = result.accuracies.filter(accu => accu >= this.state.accuracy);
      result.in_range = above.length;
      return result;
    });
    this.setState({
      sortingResults: filtered
    });
  }

  getStudies() {
    return this.state.sortingResults
      .map(item => item.study)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  getSorters() {
    return this.state.sortingResults
      .map(item => item.sorter)
      .filter((value, index, self) => self.indexOf(value) === index);
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
            <div className="container container__heatmap">
              <HeatmapContainer
                results={this.state.sortingResults}
                studies={this.getStudies()}
                sorters={this.getSorters()}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Home;
