import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import Error from "./Error";
// TODO: Remove when JSON is done being used
import ReactJson from "react-json-view";

// TODO: Can I put these on the controller instead?
const KBucketClient = require("@magland/kbucket").KBucketClient;
let kbclient = new KBucketClient();
kbclient.setConfig({ share_ids: ["spikeforest.spikeforest1"] });
kbclient.setPairioConfig({ collections: ["spikeforest"] });

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      sortingResults: {},
      recordingResults: {},
      errors: []
    };
  }

  componentDidMount() {
    this.getBatchResults();
  }

  // TODO: Move this into a data handling JS file?
  getBatchResults = () => {
    fetch("/api/getBatchResults")
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.length > 1) {
          this.organizeBatchResults(json);
          this.setState({
            results: json
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errors: [...this.state.errors, "🤦‍ spikeforest_batch failed to load"]
        });
      });
  };

  async organizeBatchResults(allBatches) {
    const recordingResults = allBatches
      .map(batch => batch.summarize_recording_results)
      .flat();
    const sortingResults = allBatches
      .map(batch => batch.sorting_results)
      .flat();
    this.getAccuracyData(sortingResults);
    this.organizeSortingResults(sortingResults);
    this.setState({
      recordingResults
    });
  }

  async getAccuracyData(sortingResults) {
    const promises = sortingResults.map(this.getAccuracyUrl);
    let allAccuracy = await Promise.all(promises);
    console.log("accuracyData 🐔", allAccuracy);
  }

  async getAccuracyUrl(sortingResult) {
    let accuracy = await kbclient.findFile(
      sortingResult.comparison_with_truth.json
    );
    sortingResult = sortingResult[accuracy] = accuracy;
    return sortingResult;
  }

  organizeSortingResults(unsorted) {
    let sortedByStudy = unsorted.reduce((r, a) => {
      r[a.study_name] = r[a.study_name] || [];
      r[a.study_name].push(a);
      return r;
    }, {});
    this.subSortByAlgo(sortedByStudy);
  }

  subSortByAlgo(sortedByStudy) {
    for (const study in sortedByStudy) {
      sortedByStudy[study] = sortedByStudy[study].reduce((r, a) => {
        r[a.sorter_name] = r[a.sorter_name] || [];
        r[a.sorter_name].push(a);
        return r;
      }, []);
    }
    console.log("subsortedByAlgo 🙉", sortedByStudy);
    this.setState({
      sortingResults: sortedByStudy
    });
  }

  render() {
    console.log("🛴", this.state.results);
    return (
      <div>
        {this.state.errors.length ? <Error errors={this.state.errors} /> : null}
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {this.state.results.length && this.state.results.length > 1 ? (
            <div className="container">
              <h3>Recording Results</h3>
              <ReactJson src={this.state.recordingResults} />
              <h3>Sorting Results</h3>
              <ReactJson src={this.state.sortingResults} />
            </div>
          ) : (
            <Preloader />
          )}
        </div>
      </div>
    );
  }
}
export default Home;
