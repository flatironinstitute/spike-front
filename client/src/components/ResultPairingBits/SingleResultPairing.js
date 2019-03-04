import React, { Component } from "react";
import { isEmpty } from "../../utils";
import Preloader from "../Preloader/Preloader";
import { Card, Col, Container, Row } from "react-bootstrap";
import ReactJson from "react-json-view";

import HeatmapOptionsRow from "../Heatmap/HeatmapOptionsRow";

// import spikeforestwidgets from "./SpikeforestWidgets";

class SingleResultPairing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      study: "",
      sorter: "",
      format: "count",
      metric: "accuracy",
      sliderValue: 0,
      activeSorter: 0
    };
  }

  componentDidMount() {
    this.getPageName();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.study !== prevState.study) {
      this.props.fetchPairing(this.state.study, this.state.sorter);
    }
  }

  getPageName() {
    let activeRoute = this.props.router.location.pathname;
    let activeArr = activeRoute.split("/").filter(item => item);
    // TODO: Make this less fixed!
    let study = activeArr[1];
    let sorter = activeArr[2];
    this.setState({
      study,
      sorter
    });
  }

  handleFormatChange = value => {
    this.setState({
      format: value,
      sliderValue: 0
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

  render() {
    let results = isEmpty(this.props.pairing)
      ? { results: "NADA" }
      : this.props.pairing;
    let loading = isEmpty(this.state.study) || isEmpty(this.state.sorter);
    // TODO: Does largeCols make sense here?
    let largeCols = this.state.format === "cpu" ? 6 : 4;
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
                <Col lg={12} sm={12}>
                  <div className="card card--stats">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          Study: <strong>{this.state.study}</strong>
                        </p>
                        <p>
                          Sorter: <strong>{this.state.sorter}</strong>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <p>
                          Hello what goes here?{" "}
                          <span role="img" aria-label="tropical drink">
                            🍹
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <HeatmapOptionsRow
                handleFormatChange={this.handleFormatChange}
                handleSliderChange={this.handleSliderChange}
                handleMetricChange={this.handleMetricChange}
                format={this.state.format}
                metric={this.state.metric}
                sliderValue={this.state.sliderValue}
              />
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--heatmap">
                    <ReactJson src={results} />
                  </div>
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--heatmap text-center">
                    <h2>
                      <span role="img" aria-label="wave">
                        🌊
                      </span>
                      Thar be monsters{" "}
                      <span role="img" aria-label="squid">
                        🦑
                      </span>
                    </h2>
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

export default SingleResultPairing;

// NOTES:
// Sample url : http://localhost:3000/results/magland-synth-noise10-K10-C4/MountainSort4-thr3
//
// TODO:
// Pairing Page -> Study Results Page
// Links to the other sorters on the study (button row)
// Row of the heatmap with toolbar from heatmap
// Scatterplot
// spike sprays from each unit on click (// Channels as a separate row)
// Table of data on each unit
