import React, { Component } from "react";
import { Link } from "react-router-dom";

// Components
import { Card, Col, Container, Row } from "react-bootstrap";
import HeatmapOptionsCol from "../Heatmap/HeatmapOptionsCol";
import Preloader from "../Preloader/Preloader";
import ScatterplotCard from "../ScatterplotBits/ScatterplotCard";
import HeatmapViz from "../Heatmap/HeatmapViz";
import UnitDetail from "./UnitDetail";

import "./detailpage.css";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

// Utilities 💡
import { isEmpty } from "../../utils";

class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorterName: this.props.sorterName,
      recordingName: null,
      selectedStudyName: props.selectedStudyName,
      selectedRecordingName: props.selectedRecordingName,
      selectedSorterName: props.selectedSorterName
    };
    this.handleCellSelected = this.handleCellSelected.bind(this);
    this.handleScatterplotClick = this.handleScatterplotClick.bind(this);
  }

  componentDidMount() {
    this.checkSelectedUnit();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.selectedSorterName !== prevProps.selectedSorterName ||
      this.state.selectedSorterName !== prevState.selectedSorterName
    ) {
      this.checkSelectedUnit();
    }
  }

  checkSelectedUnit() {
    if (this.props.selectedUnit) {
      let su = this.props.selectedUnit;
      if (
        su.sorterName !== this.state.sorterName ||
        su.studyName !== this.props.studyName
      ) {
        // The selected unit is not relevant to this view. Unselecting.
        console.warn('The selected unit is not relevant to this view. Unselecting.')
        this.props.setSelectedUnit(null);
      }
    }
  }

  handleFormatChange = value => {
    this.props.setFormat(value);
  };

  handleMetricChange = metric => {
    this.props.setMetric(metric);
  };

  handleImputeMissingValuesChange = val => {
    this.props.setImputeMissingValues(val);
  };

  handleSliderChange = value => {
    let round = Math.round(value * 100) / 100;
    this.props.setSliderValue(this.props.format, round);
  };

  getFormatCopy() {
    let copy;
    switch (this.props.format) {
      case "count":
        copy = `Number of units found above ${this.props.metric} threshold`;
        break;
      case "average":
        copy = `Average ${this.props.metric} above SNR threshold`;
        break;
      default:
        copy = "";
    }
    return copy;
  }

  handleScatterplotClick(value) {
    if (!isEmpty(value)) {
      this.props.setSelectedUnit(value);
    }
  }

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

  getSpikeSprayCard() {
    if (isEmpty(this.props.selectedUnit)) {
      return "nounit";
    } else if (isEmpty(this.props.spikespray)) {
      return "nodata";
    } else {
      return "showspike";
    }
  }

  render() {
    let loading =
      isEmpty(this.props.studyName) || isEmpty(this.props.studyAnalysisResults);

    let heatmapTitle = this.getFormatCopy();

    let studyAnalysisResult = null;
    this.props.studyAnalysisResults.allResults.forEach(sar => {
      if (sar.studyName === this.props.studyName) studyAnalysisResult = sar;
    });

    if (!studyAnalysisResult) {
      loading = true;
    }

    let recordingName = "";
    if (this.props.selectedUnit) {
      recordingName =
        studyAnalysisResult.recordingNames[
          studyAnalysisResult.trueRecordingIndices[
            this.props.selectedUnit.unitIndex
          ]
        ];
    }

    let sortingResult = null;
    let su = this.props.selectedUnit;
    if (!su) {
      console.warn('No selected unit.');
      return <span>No selected unit.</span>;
    }
    if (this.props.selectedUnit && this.props.sortingResults) {
      for (let sr of this.props.sortingResults) {
        if (
          sr.studyName === su.studyName &&
          sr.recordingName === su.recordingName &&
          sr.sorterName === su.sorterName
        ) {
          sortingResult = sr;
        }
      }
    }

    if (!sortingResult) {
      console.warn('Sorting result not found.', su);
      return <span>No sorting result found: {su.studyName} {su.recordingName} {su.sorterName}</span>;
    }

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
              <Row className="">
                <Col style={{ minWidth: 700, flexGrow: 1, overflow: "auto" }}>
                  <div className="card card__std-col">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          <b>{heatmapTitle}</b>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <HeatmapViz
                          format={this.props.format}
                          groupByStudySets={false}
                          handleCellSelected={this.handleCellSelected}
                          metric={this.props.metric}
                          imputeMissingValues={this.props.imputeMissingValues}
                          selectRecordingName={recordingName => {
                            this.setState({ recordingName });
                          }}
                          selectSorterName={sorterName => {
                            this.props.setSelectedUnit(null);
                            this.setState({ sorterName });
                          }}
                          selectedStudyName={this.props.studyName}
                          selectedSorterName={this.state.sorterName}
                          sorters={this.props.sorters}
                          studyAnalysisResults={{
                            allResults: [studyAnalysisResult]
                          }}
                          studySets={this.props.studySets}
                          threshold={this.props.sliderValue[this.props.format]}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col style={{ minWidth: 400, flexGrow: 1 }}>
                  <HeatmapOptionsCol
                    showCPU={false}
                    handleFormatChange={this.handleFormatChange}
                    handleSliderChange={this.handleSliderChange}
                    handleMetricChange={this.handleMetricChange}
                    handleImputeMissingValuesChange={this.handleImputeMissingValuesChange}
                    format={this.props.format}
                    metric={this.props.metric}
                    imputeMissingValues={this.props.imputeMissingValues}
                    sliderValue={this.props.sliderValue[this.props.format]}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={{ minWidth: 700, flexGrow: 1, overflow: "auto" }}>
                  <ScatterplotCard
                    sorters={this.props.sorters}
                    studyAnalysisResults={{ allResults: [studyAnalysisResult] }}
                    studyName={this.props.studyName}
                    sorterName={this.props.sorterName}
                    recordingName={this.state.recordingName}
                    sliderValue={this.props.sliderValue[this.props.format]}
                    format={this.props.format}
                    metric={this.props.metric}
                    imputeMissingValues={this.props.imputeMissingValues}
                    selectedUnitCode={
                      (this.props.selectedUnit || {}).unitCode || null
                    }
                    handleScatterplotClick={this.handleScatterplotClick}
                  />
                </Col>
                <Col style={{ minWidth: 400, flexGrow: 1 }}>
                  <div className="card card__std-col">
                    <div className="content">
                      <div className="card__label">
                        {this.props.selectedUnit ? (
                          <table>
                            <thead />
                            <tbody>
                              <tr>
                                <th>Study:</th>
                                <td>
                                  {
                                    <Link to={`/study/${this.props.studyName}`}>
                                      {this.props.studyName}
                                    </Link>
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th>Recording:</th>
                                <td>
                                  {
                                    <Link
                                      to={`/recording/${
                                        this.props.studyName
                                      }/${recordingName}`}
                                    >
                                      {recordingName}
                                    </Link>
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th>Sorter:</th>
                                <td>
                                  {
                                    <Link to={`/algorithms`}>
                                      {this.props.selectedUnit.sorterName}
                                    </Link>
                                  }
                                </td>
                              </tr>
                              <tr>
                                <th>Unit ID:</th>
                                <td>{this.props.selectedUnit.unitIndex}</td>
                              </tr>
                              <tr>
                                <th>Sorting result:</th>
                                <td>
                                  <Link
                                    to={`/sortingresult/${
                                      this.props.studyName
                                    }/${recordingName}/${
                                      this.props.selectedUnit.sorterName
                                    }`}
                                  >
                                    [More details...]{" "}
                                  </Link>
                                </td>
                              </tr>
                              <tr>
                                {sortingResult.returnCode === 0 ? (
                                  <td />
                                ) : (
                                  <td>
                                    Return code: {sortingResult.returnCode}{" "}
                                    {sortingResult.timedOut ? "timed out" : ""}{" "}
                                  </td>
                                )}
                              </tr>
                            </tbody>
                          </table>
                        ) : (
                          <p>
                            <strong>Unit Details</strong>
                          </p>
                        )}
                      </div>
                      {(() => {
                        if (this.props.selectedUnit) {
                          return (
                            <div className="card__footer">
                              <hr />
                              <UnitDetail
                                sorters={this.props.sorters}
                                sortingResults={this.props.sortingResults}
                                studyAnalysisResult={studyAnalysisResult}
                                unitIndex={this.props.selectedUnit.unitIndex}
                                sorterName={this.props.selectedUnit.sorterName}
                              />
                            </div>
                          );
                        } else {
                          return (
                            <div className="card__footer">
                              <hr />
                              <p>
                                Click a marker in the scatterplot to view
                                details of the corresponding unit.
                              </p>
                            </div>
                          );
                        }
                      })()}
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
    format: state.format,
    sliderValue: state.sliderValue,
    metric: state.metric,
    imputeMissingValues: state.imputeMissingValues,
    selectedUnit: state.selectedUnit
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPage);
