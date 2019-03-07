import React, { Component } from "react";
import {
  Alert,
  Button,
  ButtonToolbar,
  Card,
  Col,
  Collapse,
  Container,
  Row,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
import Preloader from "../Preloader/Preloader";
import HeatmapOptionsRow from "../Heatmap/HeatmapOptionsRow";
import SinglePairingRow from "./SinglePairingRow";
import ReactJson from "react-json-view";
import SpikeSprayV1 from "./SpikeSprayV1";

import { isEmpty } from "../../utils";

import "./singleresults.css";

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
      activeSorter: 0,
      openIcon: false
    };
  }

  componentDidMount() {
    this.getPageName();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.study !== prevState.study) {
      this.props.fetchPairing(this.state.study, this.state.sorter);
      // TODO: Tie this call to the scatterplot clicks
      this.props.fetchRecordingDetails(
        this.state.study,
        this.state.sorter,
        "test"
      );
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

  handleSorterChange = value => {
    this.setState({
      sorter: value
    });
  };

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
      ? []
      : this.props.pairing.filter(result => {
          return result.sorter && result.is_applied;
        });
    let recDetails = this.props.recordingDetails
      ? this.props.recordingDetails
      : {};
    let sorters = results.length ? results.map(result => result.sorter) : [];
    let loading =
      isEmpty(this.state.study) ||
      isEmpty(this.state.sorter) ||
      isEmpty(results);
    let toggleCopy = this.state.openIcon ? "Hide Options" : "Show Options";
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
                <Col lg={4} sm={6}>
                  <div className="card card--stats">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          Study: <strong>{this.state.study}</strong>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <p>
                          Sorter: <strong>{this.state.sorter}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={4} sm={12}>
                  <div className="card card--stats">
                    <div className="content">
                      <div className="card__label">
                        <p>Number of Units</p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <SinglePairingRow
                          {...this.props}
                          vizDatum={results}
                          key={`hmrow${0}`}
                          index={0}
                          format={this.state.format}
                          sorters={sorters.sort()}
                          selectedSorter={this.state.sorter}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={4} sm={12}>
                  <div className="card card--stats">
                    <div className="content">
                      <div className="card__label">
                        <p>Sorter Toggles</p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <ButtonToolbar>
                          <ToggleButtonGroup
                            type="radio"
                            name="options"
                            size="lg"
                            value={this.state.sorter}
                            onChange={this.handleSorterChange}
                            className="metric_button_toggle"
                          >
                            {results.map((result, i) => (
                              <ToggleButton
                                size="lg"
                                value={result.sorter}
                                key={`toggle${i}`}
                                variant="outline-dark"
                              >
                                {result.sorter}
                              </ToggleButton>
                            ))}
                          </ToggleButtonGroup>
                        </ButtonToolbar>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div>
                <Alert
                  variant="secondary"
                  className="d-flex justify-content-between align-items-center"
                >
                  Shall we show these controls for the heatmap/scatterplot?
                  <Button
                    variant="outline-dark"
                    onClick={() =>
                      this.setState({ openIcon: !this.state.openIcon })
                    }
                  >
                    {toggleCopy}
                  </Button>
                </Alert>
                {this.state.openIcon ? (
                  <Collapse in={this.state.openIcon}>
                    <div className="container__collapse">
                      <HeatmapOptionsRow
                        handleFormatChange={this.handleFormatChange}
                        handleSliderChange={this.handleSliderChange}
                        handleMetricChange={this.handleMetricChange}
                        format={this.state.format}
                        metric={this.state.metric}
                        sliderValue={this.state.sliderValue}
                      />
                    </div>
                  </Collapse>
                ) : (
                  <div />
                )}
              </div>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--stats">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          <strong>Scatterplot here</strong>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <p>
                          Hello Add a Scatterplot Liz{" "}
                          <span role="img" aria-label="fireworks">
                            🎆
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--heatmap">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          <strong>Spike Spray:</strong> Any label details
                          needed?
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <SpikeSprayV1 {...this.props} />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--heatmap">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          Recording Details JSON Dump{" "}
                          <span role="img" aria-label="truck">
                            🗃️
                          </span>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        {/* <ReactJson src={recDetails} /> */}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--heatmap">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          Study + Sorter Result Pairing JSON Dump{" "}
                          <span role="img" aria-label="truck">
                            🚚
                          </span>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <ReactJson src={results} />
                      </div>
                    </div>
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
