import React, { Component } from "react";
import { isEmpty } from "../../utils";
import { Redirect } from "react-router";

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
      cardHeight: 686,
      redirect: false,
      selectedStudyName: props.selectedStudyName,
      selectedRecordingName: props.selectedRecordingName,
      selectedSorterName: props.selectedSorterName
    };
    this.handleCellSelected = this.handleCellSelected.bind(this);
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

  handleCellSelected(cell) {
    if (cell.selectable) {
      if (this.props.selectStudyName) {
        this.props.selectStudyName(cell.info.studyAnalysisResult.studyName);
      }
      if (this.props.selectRecordingName) {
        this.props.selectRecordingName(
          cell.info.studyAnalysisResult.recordingName || null
        );
      }
      if (this.props.selectSorterName) {
        this.props.selectSorterName(cell.info.sorterName);
      }
      this.setState({
        selectedStudyName: cell.info.studyAnalysisResult.studyName,
        selectedRecordingName:
          cell.info.studyAnalysisResult.recordingName || null,
        selectedSorterName: cell.info.sorterName
      });
    }
  }

  render() {
    let loading = isEmpty(this.props.studyAnalysisResults);
    let study = this.state.selectedStudyName || "";
    study = "/studyresults/" + study;
    if (this.state.redirect) {
      return <Redirect push to={study} />;
    }
    const noScatterplot =
      !this.state.selectedStudyName || !this.state.selectedSorterName;

    let leftCol = noScatterplot ? [12, 12, 12, 12] : [12, 12, 12, 6];
    let rightCol = [12, 12, 12, 6];
    return (
      <div>
        {loading ? (
          <Container>
            <Preloader />
          </Container>
        ) : (
          <Container className="container__heatmap">
            <Row className="container__heatmap--row">
              <Col
                sm={leftCol[0]}
                md={leftCol[1]}
                lg={leftCol[2]}
                xl={leftCol[3]}
              >
                <HeatmapViz
                  groupByStudySets={true}
                  selectStudyName={this.props.selectStudyName}
                  selectSorterName={this.props.selectSorterName}
                  selectedStudyName={this.state.selectedStudyName}
                  selectedSorterName={this.state.selectedSorterName}
                  studyAnalysisResults={this.props.studyAnalysisResults}
                  studySets={this.props.studySets}
                  sorters={this.props.sorters}
                  format={this.props.format}
                  metric={this.props.metric}
                  threshold={this.props.sliderValue}
                  handleCardHeightChange={this.handleCardHeightChange}
                  handleCellSelected={this.handleCellSelected}
                />
              </Col>
              {this.props.format !== "cpu" && !noScatterplot ? (
                <Col
                  sm={rightCol[0]}
                  md={rightCol[1]}
                  lg={rightCol[2]}
                  xl={rightCol[3]}
                >
                  <ScatterplotCard
                    sorters={this.props.sorters}
                    studyAnalysisResults={this.props.studyAnalysisResults}
                    studyName={this.state.selectedStudyName}
                    sorterName={this.state.selectedSorterName}
                    sliderValue={this.props.sliderValue}
                    format={this.props.format}
                    metric={this.props.metric}
                    cardHeight={noScatterplot ? 100 : this.state.cardHeight}
                    selectedUnitCode={
                      (this.props.selectedUnit || {}).unitCode || null
                    }
                    handleScatterplotClick={this.handleScatterplotClick}
                  />
                </Col>
              ) : null}
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
