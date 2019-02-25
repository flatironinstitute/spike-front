import React, { Component } from "react";
import HeatmapViz from "./HeatmapViz";
import { isEmpty } from "../../utils";

// Components
import Preloader from "../Preloader/Preloader";
import StudySorterSummary from "../ScatterplotBits/StudySorterSummary";
import { Col, Container, Row } from "react-bootstrap";
// import { ContinuousColorLegend } from "react-vis";

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
      this.props.accuracy !== prevProps.accuracy
    ) {
      this.filterAccuracyMap();
    }
  }

  // Count functions for 'Number of groundtruth units above accuracy threshold'
  filterAccuracy(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let above = sorter.accuracies.filter(accu => {
        return accu >= this.props.accuracy;
      });
      sorter.in_range = above.length;
      sorter.color = above.length;
      return sorter;
    });
    return newArr;
  }

  filterAccuracyMap() {
    let built = this.props.unitsMap.map(study => {
      let values = Object.values(study)[0];
      let key = Object.keys(study)[0];
      let filtered = this.filterAccuracy(values);
      return { [key]: filtered };
    });
    this.setState({ builtData: built });
  }

  render() {
    let loading = isEmpty(this.state.builtData);
    let largeCols = this.props.selectedStudy ? 6 : 12;
    return (
      <div>
        {loading ? (
          <Container>
            <Preloader />
          </Container>
        ) : (
          <Container className="container__heatmap">
            {/* TODO: Add Scrollytelling formatting */}
            <Row className="container__heatmap--row">
              <Col lg={largeCols} sm={12}>
                <HeatmapViz
                  {...this.props}
                  filteredData={this.state.builtData}
                  sorters={this.props.shortSorters}
                  format={this.props.format}
                  metric={this.props.metric}
                />
              </Col>
              <Col lg={6} sm={12}>
                <StudySorterSummary
                  {...this.props}
                  sliderValue={this.props.accuracy}
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
    selectedStudy: state.selectedStudy,
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
