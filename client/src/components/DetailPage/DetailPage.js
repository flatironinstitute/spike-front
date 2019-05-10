import React, { Component } from "react";
// import * as Sentry from "@sentry/browser";

// Components
import { Card, Col, Container, Row } from "react-bootstrap";
import HeatmapOptionsCol from "../Heatmap/HeatmapOptionsCol";
import Preloader from "../Preloader/Preloader";
import DetailPageRow from "./DetailPageRow";
import ScatterplotCard from "../ScatterplotBits/ScatterplotCard";
import SpikeSpray from "./SpikeSpray";
import HeatmapViz from "../Heatmap/HeatmapViz";

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
      sorterName: "",
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

  handleSorterChange = sorterName => {
    this.setState({
      sorterName: sorterName
    });
    this.props.selectSorterName(sorterName);
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
    this.setState({ selectedUnit: value });
  };

  getSpikeSprayCard() {
    return 'nodata';
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

    let format = this.getSpikeSprayCard();

    let heatmapTitle = this.getFormatCopy();
    let unitId = this.state.selectedUnit ? this.state.selectedUnit.u._id : "";
    let divStyle = {
      backgroundColor: "#fffdc0",
      borderRadius: "5px",
      display: "inline-block"
    };

    let studyAnalysisResult = {};
    this.props.studyAnalysisResults.forEach(sar => {
      if (sar.studyName === this.props.studyName)
        studyAnalysisResult = sar;
    });

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
                        
                        {/* <DetailPageRow
                          {...this.props}
                          vizDatum={this.state.filteredData}
                          key={`hmrow${0}`}
                          index={0}
                          format={this.state.format}
                          // sorters={sorters.sort()}
                          selectedSorter={this.state.sorterName}
                          handleSorterChange={this.handleSorterChange}
                        /> */}
                        <HeatmapViz
                          groupByStudySets={false}
                          selectSorterName={sorterName => {this.setState({sorterName})}}
                          selectedStudyName={this.props.studyName}
                          selectedSorterName={this.state.sorterName}
                          studyAnalysisResults={[studyAnalysisResult]}
                          studies={this.props.studies}
                          studysets={this.props.studysets}
                          format={this.state.format}
                          metric={this.state.metric}
                          threshold={this.state.sliderValue}
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
                    studies={this.props.studies}
                    sorters={this.props.sorters}
                    studyAnalysisResults={[studyAnalysisResult]}
                    studyName={this.props.studyName}
                    sorterName={this.state.sorterName}
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
                          <strong>Unit Details: </strong>
                          {unitId}
                        </p>
                      </div>
                      {(() => {
                        switch (format) {
                          case "nounit":
                            return (
                              <div className="card__footer">
                                <hr />
                                <p style={divStyle}>
                                  Click on a mark in the scatterplot above to
                                  view a spikespray of the selected unit.
                                </p>
                              </div>
                            );
                          case "nodata":
                            return (
                              <div className="card__footer">
                                <hr />
                                <p>
                                  Sorry. Spike spray data for this unit has not
                                  yet been generated. Please check back for more
                                  sorting results information in the near
                                  future.
                                </p>
                              </div>
                            );
                          case "showspike":
                            return (
                              <div className="card__footer">
                                <hr />
                                <SpikeSpray
                                  {...this.props}
                                  unit={this.state.selectedUnit}
                                  spikeSprayData={this.props.spikespray}
                                />
                              </div>
                            );
                          default:
                            return null;
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
