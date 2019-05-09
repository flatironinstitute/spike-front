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
      cardHeight: null
    };
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  handleCardHeightChange = value => {
    this.setState({
      cardHeight: value
    });
  };

  render() {
    let loading = isEmpty(this.props.studyAnalysisResults);
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
                  selectStudyName={this.props.selectStudyName}
                  selectSorterName={this.props.selectSorterName}
                  selectedStudyName={this.props.selectedStudyName}
                  selectedSorterName={this.props.selectedSorterName}
                  groupedUnitResults={this.state.builtData}
                  studyAnalysisResults={this.props.studyAnalysisResults}
                  studies={this.props.studies}
                  studysets={this.props.studysets}
                  format={this.props.format}
                  metric={this.props.metric}
                  threshold={this.props.sliderValue}
                  handleCardHeightChange={this.handleCardHeightChange}
                />
              </Col>
              <Col lg={6} sm={12}>
                <ScatterplotCard
                  {...this.props}
                  sliderValue={this.props.sliderValue}
                  cardHeight={this.state.cardHeight}
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
    selectedStudyName: state.selectedStudyName,
    selectedSorterName: state.selectedSorterName,
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
