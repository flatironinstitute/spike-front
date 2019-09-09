import React, { Component } from "react";
// import * as Sentry from "@sentry/browser";
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
      recordingName: null
      // selectedUnit: null
    };
  }

  componentDidMount() {
    this.checkSelectedUnit();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.selectedUnit !== prevState.selectedUnit) {
    //   // TODO: Remove conditional when default db is set.
    //   // let url = this.state.selectedUnit.u.spikesprayUrl || "";
    //   // this.props.fetchSpikeSpray(url);
    // }

    this.checkSelectedUnit();
  }

  checkSelectedUnit() {
    if (this.props.selectedUnit) {
      let su = this.props.selectedUnit;
      if (
        su.sorterName !== this.state.sorterName ||
        su.studyName !== this.props.studyName
      ) {
        // The selected unit is not relevant to this view. Unselecting.
        this.props.setSelectedUnit(null);
      }
    }
  }

  handleFormatChange = value => {
    // var sliderValue;
    // switch (value) {
    //   case "count":
    //     sliderValue = 0.8;
    //     break;
    //   case "average":
    //     sliderValue = 8;
    //     break;
    //   default:
    //     sliderValue = 0;
    // }
    this.props.setFormat(value);
    // this.setState({
    //   sliderValue: sliderValue
    // });
  };

  handleMetricChange = metric => {
    this.props.setMetric(metric);
    // this.setState({
    //   metric: value
    // });
  };

  handleSliderChange = value => {
    let round = Math.round(value * 100) / 100;
    this.props.setSliderValue(this.props.format, round);
    // this.setState({
    //   sliderValue: round
    // });
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

  handleScatterplotClick = value => {
    this.props.setSelectedUnit(value);
    // this.setState({ selectedUnit: value });
  };

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
    if (this.props.selectedUnit) {
      let su = this.props.selectedUnit;
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
                          groupByStudySets={false}
                          selectSorterName={sorterName => {
                            this.props.setSelectedUnit(null);
                            this.setState({ sorterName });
                          }}
                          selectRecordingName={recordingName => {
                            this.setState({ recordingName });
                          }}
                          selectedStudyName={this.props.studyName}
                          selectedSorterName={this.state.sorterName}
                          studyAnalysisResults={{
                            allResults: [studyAnalysisResult]
                          }}
                          studySets={this.props.studySets}
                          sorters={this.props.sorters}
                          format={this.props.format}
                          metric={this.props.metric}
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
                    format={this.props.format}
                    metric={this.props.metric}
                    sliderValue={this.props.sliderValue[this.props.format]}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={6} sm={12}>
                  <ScatterplotCard
                    sorters={this.props.sorters}
                    studyAnalysisResults={{ allResults: [studyAnalysisResult] }}
                    studyName={this.props.studyName}
                    sorterName={this.state.sorterName}
                    recordingName={this.state.recordingName}
                    sliderValue={this.props.sliderValue[this.props.format]}
                    format={this.props.format}
                    metric={this.props.metric}
                    selectedUnitCode={
                      (this.props.selectedUnit || {}).unitCode || null
                    }
                    handleScatterplotClick={this.handleScatterplotClick}
                  />
                </Col>
                <Col lg={6} sm={12}>
                  <div className="card card--heatmap">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          {this.props.selectedUnit ? (
                            <table>
                              <thead />
                              <tbody>
                                <tr>
                                  <th>Study:</th>
                                  <td>
                                    {
                                      <Link
                                        to={`/study/${this.props.studyName}`}
                                      >
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
                                  <span>
                                    {sortingResult.returnCode === 0 ? (
                                      <span />
                                    ) : (
                                      <span>
                                        Return code: {sortingResult.returnCode}{" "}
                                        {sortingResult.timedOut
                                          ? "timed out"
                                          : ""}{" "}
                                      </span>
                                    )}
                                  </span>
                                </tr>
                              </tbody>
                            </table>
                          ) : (
                            // <strong>Unit Details: {`${this.props.studyName}/${recordingName}/${this.props.selectedUnit.sorterName}/${studyAnalysisResult.trueUnitIds[this.props.selectedUnit.unitIndex]}`}</strong>
                            <strong>Unit Details:</strong>
                          )}
                        </p>
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
