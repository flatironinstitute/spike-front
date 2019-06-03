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
      format: "count",
      metric: "accuracy",
      sliderValue: 0.8,
      sorterName: this.props.sorterName,
      selectedUnit: null
    };
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedUnit !== prevState.selectedUnit) {
      // TODO: Remove conditional when default db is set.
      // let url = this.state.selectedUnit.u.spikesprayUrl || "";
      // this.props.fetchSpikeSpray(url);
    }
  }

  handleFormatChange = value => {
    var sliderValue;
    switch (value) {
      case "count":
        sliderValue = 0.8;
        break;
      case "average":
        sliderValue = 8;
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
    this.setState({ selectedUnit: value });
  };

  getSpikeSprayCard() {
    if (isEmpty(this.state.selectedUnit)) {
      return "nounit";
    } else if (isEmpty(this.props.spikespray)) {
      return "nodata";
    } else {
      return "showspike";
    }
  }

  render() {
    let loading =
      isEmpty(this.props.studyName) ||
      isEmpty(this.props.studyAnalysisResults);

    let heatmapTitle = this.getFormatCopy();

    let studyAnalysisResult = null;
    this.props.studyAnalysisResults.allResults.forEach(sar => {
      if (sar.studyName === this.props.studyName)
        studyAnalysisResult = sar;
    });

    if (!studyAnalysisResult) {
      loading = true;
    }

    let recordingName = '';
    if (this.state.selectedUnit) {
      recordingName = studyAnalysisResult.recordingNames[studyAnalysisResult.trueRecordingIndices[this.state.selectedUnit.unitIndex]];
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
                          <HeatmapViz
                            groupByStudySets={false}
                            selectSorterName={sorterName => { this.setState({ sorterName, selectedUnit: null }) }}
                            selectedStudyName={this.props.studyName}
                            selectedSorterName={this.state.sorterName}
                            studyAnalysisResults={{allResults: [studyAnalysisResult]}}
                            studySets={this.props.studySets}
                            sorters={this.props.sorters}
                            format={this.state.format}
                            metric={this.state.metric}
                            threshold={this.state.sliderValue}
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} sm={12}>
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
                </Row>
                <Row>
                  <Col lg={6} sm={12}>
                    <ScatterplotCard
                      sorters={this.props.sorters}
                      studyAnalysisResults={{allResults: [studyAnalysisResult]}}
                      studyName={this.props.studyName}
                      sorterName={this.state.sorterName}
                      sliderValue={this.state.sliderValue}
                      format={this.state.format}
                      metric={this.state.metric}
                      handleScatterplotClick={this.handleScatterplotClick}
                    />
                  </Col>
                  <Col lg={6} sm={12}>
                    <div className="card card--heatmap">
                      <div className="content">
                        <div className="card__label">
                          <p>
                            {this.state.selectedUnit ?
                              (
                                <table>
                                  <thead></thead>
                                  <tbody>
                                    <tr>
                                      <th>Study:</th><td>{<Link to={`/study/${this.props.studyName}`}>{this.props.studyName}</Link>}</td>
                                    </tr>
                                    <tr>
                                      <th>Recording:</th><td>{<Link to={`/recording/${this.props.studyName}/${recordingName}`}>{recordingName}</Link>}</td>
                                    </tr>
                                    <tr>
                                      <th>Sorter:</th><td>{<Link to={`/algorithms`}>{this.state.selectedUnit.sorterName}</Link>}</td>
                                    </tr>
                                    <tr>
                                      <th>Unit ID:</th><td>{this.state.selectedUnit.unitIndex}</td>
                                    </tr>
                                    <tr>
                                      <th>Sorting result:</th><td><Link to={`/sortingresult/${this.props.studyName}/${recordingName}/${this.state.selectedUnit.sorterName}`}>{`/sortingresult/${this.props.studyName}/${recordingName}/${this.state.selectedUnit.sorterName}`}</Link></td>
                                    </tr>
                                  </tbody>
                                </table>
                                // <strong>Unit Details: {`${this.props.studyName}/${recordingName}/${this.state.selectedUnit.sorterName}/${studyAnalysisResult.trueUnitIds[this.state.selectedUnit.unitIndex]}`}</strong>
                              ) : (<strong>Unit Details:</strong>)
                            }
                          </p>
                        </div>
                        {(() => {
                          if (this.state.selectedUnit) {
                            return (
                              <div className="card__footer">
                                <hr />
                                <UnitDetail
                                  sorters={this.props.sorters}
                                  sortingResults={this.props.sortingResults}
                                  studyAnalysisResult={studyAnalysisResult}
                                  unitIndex={this.state.selectedUnit.unitIndex}
                                  sorterName={this.state.selectedUnit.sorterName}
                                />
                              </div>
                            )
                          }
                          else {
                            return (
                              <div className="card__footer">
                                <hr />
                                <p>
                                  Click a marker in the scatterplot to
                                  view details of the corresponding unit.
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
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPage);
