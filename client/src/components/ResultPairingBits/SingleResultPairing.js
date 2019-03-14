import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Preloader from "../Preloader/Preloader";
import HeatmapOptionsRow from "../Heatmap/HeatmapOptionsRow";
import SinglePairingRow from "./SinglePairingRow";
import ReactJson from "react-json-view";
import SpikeSprayV1 from "./SpikeSprayV1";

import { isEmpty } from "../../utils";

import "./singleresults.css";

// import spikeforestwidgets from "./SpikeforestWidgets";

class SingleResultPairing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      study: "",
      sorter: "",
      sorterParams: {},
      format: "count",
      metric: "accuracy",
      sliderValue: 0.8,
      activeSorter: 0,
      openIcon: false,
      builtData: []
    };
  }

  componentDidMount() {
    this.getPageName();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.study !== prevState.study) {
      this.props.fetchPairing(this.state.study, this.state.sorter);
      // TODO: Tie this call to the scatterplot clicks
      this.props.fetchRecordingDetails(
        this.state.study,
        this.state.sorter,
        "test"
      );
    }
    if (this.props.pairing !== prevProps.pairing) {
      this.filterResults();
    }
    let optionsChanged =
      this.state.format !== prevState.format ||
      this.state.metric !== prevState.metric ||
      this.state.sliderValue !== prevState.sliderValue;
    if (optionsChanged) {
      this.filterResults();
    }
  }

  filterResults() {
    let results = this.props.pairing.filter(result => {
      return result.sorter && result.is_applied;
    });
    switch (this.state.format) {
      case "count":
        this.filterAccuracy(results);
        break;
      case "average":
        this.filterSNR(results);
        break;
    }
  }

  // Count functions for 'Number of groundtruth units above accuracy threshold'
  filterAccuracy(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let above = sorter.accuracies.filter(accu => {
        return accu >= this.state.sliderValue;
      });
      sorter.in_range = above.length;
      sorter.color = above.length;
      return sorter;
    });
    console.log("🌑", newArr, this.state.sliderValue);
    return newArr;
  }

  filterSNR(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let accs = [];
      sorter.true_units.forEach(unit => {
        if (unit.snr > this.state.sliderValue) {
          accs.push(unit.accuracy);
        }
      });
      let aboveAvg = 0;
      if (accs.length) {
        let sum = accs.reduce((a, b) => a + b);
        aboveAvg = sum / accs.length;
      }
      // This just prints the output to 2 digits
      sorter.in_range = Math.round(aboveAvg * 100) / 100;
      sorter.color = Math.round(aboveAvg * 100) / 100;
      return sorter;
    });
    console.log("🐌", newArr, this.state.sliderValue);
    return newArr;
  }

  getPageName() {
    let activeRoute = this.props.router.location.pathname;
    let activeArr = activeRoute.split("/").filter(item => item);
    // TODO: Make this less fixed!
    let study = activeArr[1];
    let sorter = activeArr[2];
    this.setState({
      study,
      sorter
    });
  }

  handleSorterChange = value => {
    this.setState({
      sorter: value
    });
  };

  handleFormatChange = value => {
    var sliderValue;
    switch (value) {
      case "count":
        sliderValue = 0.8;
        break;
      case "average":
        sliderValue = 5;
        break;
      default:
        sliderValue = 0;
    }
    this.setState({
      format: value,
      sliderValue: sliderValue
    });
  };

  handleMetricChange = value => {
    this.setState({
      metric: value
    });
  };

  handleSliderChange = value => {
    let round = Math.round(value * 100) / 100;
    this.setState({
      sliderValue: round
    });
  };

  render() {
    let results = isEmpty(this.props.pairing)
      ? []
      : this.props.pairing.filter(result => {
          return result.sorter && result.is_applied;
        });
    let sorters = results.length ? results.map(result => result.sorter) : [];

    let loading =
      isEmpty(this.state.study) ||
      isEmpty(this.state.sorter) ||
      isEmpty(results);

    console.log("👘", this.state.builtData);
    return (
      <div>
        <div className="page__body">
          {loading ? (
            <Container className="container__heatmap">
              <Card>
                <Card.Body>
                  <Preloader />
                </Card.Body>
              </Card>
            </Container>
          ) : (
            <Container className="container__heatmap">
              <Row className="container__sorter--row">
                <Col lg={5} sm={6}>
                  <div className="card card--stats">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          Study: <strong>{this.state.study}</strong>
                        </p>
                        <p>
                          Sorter: <strong>{this.state.sorter}</strong>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <p>Sorting Params:</p>
                        <p>
                          Adjacency radius: 50, Detect sign: -1, Detect
                          threshold: 3
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={7} sm={12}>
                  <div className="card card--stats">
                    <div className="content">
                      <div className="card__label">
                        <p>Number of Units</p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <SinglePairingRow
                          {...this.props}
                          vizDatum={results}
                          key={`hmrow${0}`}
                          index={0}
                          format={this.state.format}
                          sorters={sorters.sort()}
                          selectedSorter={this.state.sorter}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <HeatmapOptionsRow
                    handleFormatChange={this.handleFormatChange}
                    handleSliderChange={this.handleSliderChange}
                    handleMetricChange={this.handleMetricChange}
                    format={this.state.format}
                    metric={this.state.metric}
                    sliderValue={this.state.sliderValue}
                  />
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--stats">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          <strong>Scatterplot here</strong>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <p>
                          Hello Add a Scatterplot Liz{" "}
                          <span role="img" aria-label="fireworks">
                            🎆
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--heatmap">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          <strong>Spike Spray:</strong> What label details are
                          needed here?
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <SpikeSprayV1 {...this.props} />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--heatmap">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          Study + Sorter Result Pairing JSON Dump{" "}
                          <span role="img" aria-label="truck">
                            🚚
                          </span>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <ReactJson src={results} />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--heatmap">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          Recording Details JSON Dump{" "}
                          <span role="img" aria-label="truck">
                            🗃️
                          </span>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <div>
                          <span role="img" aria-label="watch">
                            ⏰
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--heatmap text-center">
                    <h2>
                      <span role="img" aria-label="wave">
                        🌊
                      </span>
                      Thar be monsters{" "}
                      <span role="img" aria-label="squid">
                        🦑
                      </span>
                    </h2>
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </div>
    );
  }
}

export default SingleResultPairing;

// NOTES:
// Sample url : http://localhost:3000/results/magland-synth-noise10-K10-C4/MountainSort4-thr3
//
// TODO:
// Pairing Page -> Study Results Page
// Links to the other sorters on the study (button row)
// Row of the heatmap with toolbar from heatmap
// Scatterplot
// spike sprays from each unit on click (// Channels as a separate row)
// Table of data on each unit
