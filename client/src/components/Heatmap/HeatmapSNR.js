import React, { Component } from "react";
import { isEmpty } from "../../utils";

// Components
import Preloader from "../Preloader/Preloader";
import { Col, Container, Row } from "react-bootstrap";
import HeatmapViz from "./HeatmapViz";
import ScatterplotCard from "../ScatterplotBits/ScatterplotCard";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

// Stylin'
import "./heatmap.css";

class HeatmapSNR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      builtData: [],
      snrMin: 5
    };
  }

  componentDidMount() {
    if (this.props.unitsMap.length) {
      this.filterSNRMap();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.unitsMap !== prevProps.unitsMap ||
      this.props.snrMin !== prevProps.snrMin
    ) {
      this.filterSNRMap();
    }
  }

  getMetricKey() {
    let metricKey;
    switch (this.props.metric) {
      case "accuracy":
        metricKey = "accuracies";
        break;
      case "recall":
        metricKey = "recalls";
        break;
      case "precision":
        metricKey = "precisions";
        break;
      default:
        metricKey = "accuracies";
        break;
    }
    return metricKey;
  }

  // Average functions for 'Average accuracy of groundtruth units above SNR threshold'
  filterAccuracy(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let overMin = [];
      sorter.true_units.forEach(unit => {
        if (unit.snr > this.props.snrMin) {
          overMin.push(unit.checkAccuracy);
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

  filterRecall(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let overMin = [];
      sorter.true_units.forEach(unit => {
        if (unit.snr > this.props.snrMin) {
          overMin.push(unit.checkRecall);
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

  filterPrecision(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let overMin = [];
      sorter.true_units.forEach(unit => {
        if (unit.snr > this.props.snrMin) {
          overMin.push(unit.precision);
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

  filterSNRMap() {
    let built = this.props.unitsMap.map(study => {
      let values = Object.values(study)[0];
      let key = Object.keys(study)[0];
      let filtered;
      switch (this.props.metric) {
        case "accuracy":
          filtered = this.filterAccuracy(values);
          break;
        case "recall":
          filtered = this.filterRecall(values);
          break;
        case "precision":
          filtered = this.filterPrecision(values);
          break;
        default:
          filtered = this.filterAccuracy(values);
          break;
      }
      return { [key]: filtered };
    });
    this.setState({ builtData: built });
  }

  render() {
    let loading = isEmpty(this.state.builtData);
    return (
      <div>
        {loading ? (
          <Container>
            <Preloader />
          </Container>
        ) : (
          <Container className="container__heatmap">
            <Row className="container__heatmap--row">
              <Col lg={6} sm={12}>
                <HeatmapViz
                  selectStudySortingResult={this.props.selectStudySortingResult}
                  selectedStudySortingResult={this.props.selectedStudySortingResult}
                  studiesWithResults={this.state.builtData}
                  format={this.props.format}
                  metric={this.props.metric}
                  threshold={this.props.snrMin}
                />
              </Col>
              <Col lg={6} sm={12}>
                <ScatterplotCard
                  {...this.props}
                  sliderValue={this.props.snrMin}
                />
              </Col>
            </Row>
          </Container>
        )}
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
)(HeatmapSNR);
