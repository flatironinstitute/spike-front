import React, { Component } from "react";
import Header from "./Header";
import Preloader from "./Preloader";
import Error from "./Error";
import { isEmpty } from "../utils";
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
      rawResults: {},
      sortingResults: {},
      recordingResults: {},
      errors: []
    };
  }

  componentDidMount() {
    this.getBatchResults();
  }

  // TODO: Move all these functions into a data handling JS file?
  getBatchResults = () => {
    fetch("/api/getBatchResults")
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.length > 1) {
          this.organizeBatchResults(json);
          this.setState({
            rawResults: json
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
    const withAccuracy = await this.getAccuracy(sortingResults);
    this.organizeSortingResults(withAccuracy);
    this.setState({
      recordingResults
    });
  }

  async getAccuracy(sortingResults) {
    const urlPromises = sortingResults.map(this.getAccuracyUrl);
    let withAccuracyUrl = await Promise.all(urlPromises);
    const jsonPromises = withAccuracyUrl.map(this.getAccuracyJSON);
    let withAccuracyJSON = await Promise.all(jsonPromises);
    return withAccuracyJSON;
  }

  async getAccuracyUrl(sortingResult) {
    let accuracy = await kbclient.findFile(
      sortingResult.comparison_with_truth.json
    );

    const withAccuracyUrl = Object.assign(
      { accuracy: { url: accuracy, json: {} } },
      sortingResult
    );
    return withAccuracyUrl;
  }

  async getAccuracyJSON(withAccuracyUrl) {
    let accuracyJSON = await fetch(withAccuracyUrl.accuracy.url)
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errors: [
            ...this.state.errors,
            "🤦‍ an individual accuracy json failed to load"
          ]
        });
      });
    withAccuracyUrl.accuracy.json = accuracyJSON;
    return withAccuracyUrl;
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
    this.setState({
      sortingResults: sortedByStudy
    });
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
