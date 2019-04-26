import React, { Component } from "react";
import { isEmpty } from "../../utils";
import * as Sentry from "@sentry/browser";

// Components
import { Col, Container, Row } from "react-bootstrap";
import HeatmapViz from "./HeatmapViz";
import Preloader from "../Preloader/Preloader";
import ScatterplotCard from "../ScatterplotBits/ScatterplotCard";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

// Stylin'
import "./heatmap.css";

class HeatmapCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      builtData: []
    };
  }

  componentDidMount() {
    if (this.props.unitsMap.length) {
      this.filterAccuracyMap();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.unitsMap !== prevProps.unitsMap ||
      this.props.sliderValue !== prevProps.sliderValue ||
      this.props.metric !== prevProps.metric
    ) {
      this.filterAccuracyMap();
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

  // Count functions for 'Number of groundtruth units above metric threshold'
  filterAccuracy(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      if (!sorter.accuracies) {
        Sentry.captureMessage("No accuracy values for this sorter: ", sorter);
        return sorter;
      } else {
        let above = sorter.accuracies.filter(accu => {
          return accu >= this.props.sliderValue;
        });
        sorter.in_range = above.length;
        sorter.color = above.length;
        return sorter;
      }
    });
    return newArr;
  }

  filterRecall(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      if (!sorter.recalls) {
        Sentry.captureMessage("No recall values for this sorter: ", sorter);
        sorter.in_range = 0;
        sorter.color = 0;
        return sorter;
      } else {
        let above = sorter.recalls.filter(accu => {
          return accu >= this.props.sliderValue;
        });
        sorter.in_range = above.length;
        sorter.color = above.length;
        return sorter;
      }
    });
    return newArr;
  }

  filterPrecision(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      if (!sorter.precisions) {
        Sentry.captureMessage("No precision values for this sorter: ", sorter);
        sorter.in_range = 0;
        sorter.color = 0;
        return sorter;
      } else {
        let above = sorter.precisions.filter(accu => {
          return accu >= this.props.sliderValue;
        });
        sorter.in_range = above.length;
        sorter.color = above.length;
        return sorter;
      }
    });
    return newArr;
  }

  filterAccuracyMap() {
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
                    {...this.props}
                    filteredData={this.state.builtData}
                    sorters={this.props.shortSorters}
                    format={this.props.format}
                    metric={this.props.metric}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <ScatterplotCard
                    {...this.props}
                    sliderValue={this.props.sliderValue}
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
)(HeatmapCount);
