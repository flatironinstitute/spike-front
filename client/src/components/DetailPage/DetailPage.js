import React, { Component } from "react";
import * as Sentry from "@sentry/browser";

// Components
import { Card, Col, Container, Row } from "react-bootstrap";
import HeatmapOptionsCol from "../Heatmap/HeatmapOptionsCol";
import Preloader from "../Preloader/Preloader";
import DetailPageRow from "./DetailPageRow";
import ScatterplotCard from "../ScatterplotBits/ScatterplotCard";
import SpikeSprayV2 from "./SpikeSprayV2";
// import ReactJson from "react-json-view";

import "./detailpage.css";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

// Utilities 💡
import { isEmpty, toTitleCase } from "../../utils";
import { formatUnitResultsByStudy } from "../../dataHandlers";

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      study: "",
      format: "count",
      metric: "accuracy",
      sliderValue: 0.8,
      sorter: "",
      unitsMap: [],
      filteredData: []
    };
  }

  componentDidMount() {
    this.getStudyAndSorter();
  }

  getStudyAndSorter() {
    let study,
      sorter = "";
    if (this.props.selectedStudySortingResult) {
      study = this.props.selectedStudySortingResult.study;
      sorter = this.props.selectedStudySortingResult.sorter;
    } else {
      let activeRoute = this.props.router.location.pathname;
      let activeArr = activeRoute.split("/").filter(item => item);
      study = activeArr[1];
    }
    this.setState({
      study,
      sorter
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.study !== prevState.study) {
      // Fetch the unit results for this study and all sorters
      this.props.fetchURsByStudy(this.state.study);
    }

    if (this.props.ursByStudy !== prevProps.ursByStudy) {
      this.mapUnits();
    }

    if (this.state.unitsMap !== prevState.unitsMap) {
      this.applyResultFilters();
    }

    let optionsChanged =
      this.state.format !== prevState.format ||
      this.state.metric !== prevState.metric ||
      this.state.sliderValue !== prevState.sliderValue;
    if (optionsChanged) {
      this.applyResultFilters();
    }
  }

  async mapUnits() {
    let unitsMap = await formatUnitResultsByStudy(this.props.ursByStudy);
    let sorter = this.state.sorter ? this.state.sorter : unitsMap[0].sorter;
    this.setState({ unitsMap: unitsMap, sorter: sorter });
  }

  applyResultFilters() {
    var filteredData;
    switch (this.state.format) {
      case "count":
        filteredData = this.filterCountMap();
        break;
      case "average":
        filteredData = this.filterAverageMap();
        break;
      default:
        filteredData = this.state.unitsMap;
    }
    this.setState({ filteredData: filteredData });
  }

  filterAverageMap() {
    let property;
    switch (this.state.metric) {
      case "accuracy":
        property = "checkAccuracy";
        break;
      case "recall":
        property = "checkRecall";
        break;
      case "precision":
        property = "checkPrecision";
        break;
      default:
        property = "checkAccuracy";
        break;
    }
    let filteredData = this.filterAverage(this.state.unitsMap, property);
    return filteredData;
  }

  filterCountMap() {
    let property;
    switch (this.state.metric) {
      case "accuracy":
        property = "accuracies";
        break;
      case "recall":
        property = "recalls";
        break;
      case "precision":
        property = "precisions";
        break;
      default:
        property = "accuracies";
        break;
    }
    let filteredData = this.filterCount(this.state.unitsMap, property);
    return filteredData;
  }

  filterAverage(sorterArray, property) {
    let newArr = sorterArray.map(sorter => {
      let overMin = [];
      sorter.true_units.forEach(unit => {
        if (unit.snr > this.state.sliderValue) {
          overMin.push(unit[property]);
        }
      });
      let aboveAvg = 0;
      if (overMin.length) {
        let sum = overMin.reduce((a, b) => a + b);
        aboveAvg = sum / overMin.length;
      }
      // This just prints the output to 2 digits
      sorter.in_range = Math.round(aboveAvg * 100) / 100;
      sorter.color = Math.round(aboveAvg * 100) / 100;
      return sorter;
    });
    return newArr;
  }

  filterCount(sorterArray, property) {
    let newArr = sorterArray.map(sorter => {
      if (!sorter[property]) {
        Sentry.captureMessage("No accuracy values for this sorter: ", sorter);
        return sorter;
      } else {
        let above = sorter[property].filter(accu => {
          return accu >= this.state.sliderValue;
        });
        sorter.in_range = above.length;
        sorter.color = above.length;
        return sorter;
      }
    });
    return newArr;
  }

  filterRecallCount(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      if (!sorter.recalls) {
        Sentry.captureMessage("No recall values for this sorter: ", sorter);
        sorter.in_range = 0;
        sorter.color = 0;
        return sorter;
      } else {
        let above = sorter.recalls.filter(accu => {
          return accu >= this.state.sliderValue;
        });
        sorter.in_range = above.length;
        sorter.color = above.length;
        return sorter;
      }
    });
    return newArr;
  }

  filterPrecisionCount(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      if (!sorter.precisions) {
        Sentry.captureMessage("No precision values for this sorter: ", sorter);
        sorter.in_range = 0;
        sorter.color = 0;
        return sorter;
      } else {
        let above = sorter.precisions.filter(accu => {
          return accu >= this.state.sliderValue;
        });
        sorter.in_range = above.length;
        sorter.color = above.length;
        return sorter;
      }
    });
    return newArr;
  }

  handleSorterChange = value => {
    this.setState({
      sorter: value.sorter
    });
    this.props.selectStudySortingResult(value);
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
        copy = `Number of units found above ${this.state.metric} threshold`;
        break;
      case "average":
        copy = `Average ${this.state.metric} above SNR threshold`;
        break;
      default:
        copy = "";
    }
    return copy;
  }

  handleScatterplotClick = value => {
    console.log("scatterplot click", value);
    // URL: /api/spikespray/:studyName/:recordingName/:sorterName/:trueUnitId/:bestSortedUnitId
    // this.props.fetchSpikeSpray(
    //   studyName, => studyId REMOVE STUDY
    //   recordingName, => recordingId
    //   sorterName, => sorterId
    //   trueUnitId, => trueUnitId
    //   bestSortedUnitId => bestbestSortedUnitId
    // );
  };

  render() {
    let sorters = this.state.unitsMap
      ? this.state.unitsMap.map(result => result.sorter)
      : [];
    let loading =
      isEmpty(this.state.study) ||
      isEmpty(this.state.sorter) ||
      isEmpty(this.state.filteredData);

    let heatmapTitle = this.getFormatCopy();
    let pageTitle = toTitleCase(this.state.study.replace(/_/g, " "));

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
                <Col lg={6} sm={12}>
                  <div className="card card--stats">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          <b>{heatmapTitle}</b>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <DetailPageRow
                          {...this.props}
                          vizDatum={this.state.filteredData}
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
                  <HeatmapOptionsCol
                    showCPU={false}
                    handleFormatChange={this.handleFormatChange}
                    handleSliderChange={this.handleSliderChange}
                    handleMetricChange={this.handleMetricChange}
                    format={this.state.format}
                    metric={this.state.metric}
                    sliderValue={this.state.sliderValue}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <ScatterplotCard
                    {...this.props}
                    sliderValue={this.state.sliderValue}
                    format={this.state.format}
                    metric={this.state.metric}
                    handleScatterplotClick={this.handleScatterplotClick}
                  />
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--heatmap">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          <strong>Spike Spray:</strong> Recording ID
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
    selectedStudySortingResult: state.selectedStudySortingResult
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPage);
