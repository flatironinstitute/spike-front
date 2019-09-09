import React, { Component } from "react";
import { isEmpty } from "../../utils";
import { Redirect } from "react-router";
// import * as Sentry from "@sentry/browser";

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
      cardHeight: null,
      redirect: false
    };
  }

  handleCardHeightChange = value => {
    this.setState({
      cardHeight: value
    });
  };

  handleScatterplotClick = unit => {
    this.props.setSelectedUnit(unit);
    this.setState({
      redirect: true
    });
  };

  render() {
    let loading = isEmpty(this.props.studyAnalysisResults);
    let study = this.props.selectedStudyName || "";
    study = "/studyresults/" + study;
    if (this.state.redirect) {
      return <Redirect push to={study} />;
    }
    return (
      <div>
        {loading ? (
          <Container>
            <Preloader />
          </Container>
        ) : (
          <Container className="container__heatmap">
            <Row className="container__heatmap--row">
              <Col style={{ minWidth: 700, flexGrow: 1, overflow: "auto" }}>
                <HeatmapViz
                  groupByStudySets={true}
                  selectStudyName={this.props.selectStudyName}
                  selectSorterName={this.props.selectSorterName}
                  selectedStudyName={this.props.selectedStudyName}
                  selectedSorterName={this.props.selectedSorterName}
                  studyAnalysisResults={this.props.studyAnalysisResults}
                  studySets={this.props.studySets}
                  sorters={this.props.sorters}
                  format={this.props.format}
                  metric={this.props.metric}
                  threshold={this.props.sliderValue}
                  handleCardHeightChange={this.handleCardHeightChange}
                />
              </Col>
              {/* If this is not either  */}
              {this.props.format !== "cpu" ? (
                <Col style={{ minWidth: 400, flexGrow: 1 }}>
                  <ScatterplotCard
                    sorters={this.props.sorters}
                    studyAnalysisResults={this.props.studyAnalysisResults}
                    studyName={this.props.selectedStudyName}
                    sorterName={this.props.selectedSorterName}
                    sliderValue={this.props.sliderValue}
                    format={this.props.format}
                    metric={this.props.metric}
                    cardHeight={
                      this.props.selectedUnit ? this.state.cardHeight : 100
                    }
                    selectedUnitCode={
                      (this.props.selectedUnit || {}).unitCode || null
                    }
                    handleScatterplotClick={this.handleScatterplotClick}
                  />
                </Col>
              ) : (
                <span />
              )}
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
    selectedUnit: state.selectedUnit
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeatmapCount);
