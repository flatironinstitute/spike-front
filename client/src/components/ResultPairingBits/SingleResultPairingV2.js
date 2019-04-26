import React, { Component } from "react";

// Components
import { Card, Col, Container, Row } from "react-bootstrap";
import HeatmapOptionsRow from "../Heatmap/HeatmapOptionsRow";
import Preloader from "../Preloader/Preloader";
import ReactJson from "react-json-view";
// import ScatterplotCard from "../ScatterplotBits/ScatterplotCard";
import SinglePairingRow from "./SinglePairingRow";
import SpikeSprayV2 from "./SpikeSprayV2";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

// Utilities 💡
import { isEmpty } from "../../utils";
import "./singleresults.css";

// TODO: Refactor class into smaller components please
class SingleResultPairingV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      study: "",
      sorter: "KiloSort",
      sorterParams: {},
      format: "count",
      metric: "accuracy",
      sliderValue: 0.8,
      activeSorter: 0,
      openIcon: false,
      builtData: [],
      selectedRecording: {}
    };
  }

  componentDidMount() {
    this.getPageName();
  }

  componentDidUpdate(prevProps, prevState) {
    // TODO: Swap selected study state for props
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
    var builtData;

    builtData = results

    switch (this.state.format) {
      case "count":
        builtData = this.filterAccuracy(results);
        break;
      case "average":
        builtData = this.filterSNR(results);
        break;
      default:
        builtData = results;
    }

    let selectedRecording = builtData.filter(
      recording => recording.sorter === this.state.sorter
    );
    // TODO: Swap this with selectedRecording everywhere
    // this.props.selectStudy(selectedRecording[0]);
    this.setState({ builtData: builtData });
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
    return newArr;
  }

  getPageName() {
    let activeRoute = this.props.router.location.pathname;
    let activeArr = activeRoute.split("/").filter(item => item);
    // TODO: Make this less fixed!
    let study = activeArr[1];
    let sorter = "KiloSort";
    this.setState({
      study,
      sorter
    });
  }

  handleSorterChange = value => {
    this.setState({
      sorter: value.sorter
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

  getFormatCopy() {
    let copy;
    switch (this.state.format) {
      case "count":
        copy = `Number units found above ${this.state.metric} threshold`;
        break;
      case "average":
        copy = `Average ${this.state.metric} above SNR threshold`;
        break;
      case "cpu":
        copy = "Estimated CPU Time";
        break;
      default:
        copy = "";
    }
    return copy;
  }

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
      isEmpty(this.state.builtData);

    let title = this.getFormatCopy();
    // let loadScatterplot = true;
    // isEmpty(this.props.studies) ||
    // isEmpty(this.props.sorters) ||
    // isEmpty(this.props.selectedStudySortingResult);
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
                          <p>{title}</p>
                        </div>
                        <div className="card__footer">
                          <hr />
                          <SinglePairingRow
                            {...this.props}
                            vizDatum={this.state.builtData}
                            key={`hmrow${0}`}
                            index={0}
                            format={this.state.format}
                            sorters={sorters.sort()}
                            selectedSorter={this.state.sorter}
                            handleSorterChange={this.handleSorterChange}
                          />
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
                          <SpikeSprayV2 {...this.props} />
                        </div>
                      </div>
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

function mapStateToProps(state) {
  return {
    selectedStudySortingResult: state.selectedStudySortingResult,
    selectedRecording: state.selectedRecording
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleResultPairingV2);
