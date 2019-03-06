import React, { Component } from "react";
import {
  Badge,
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
          if (result.sorter && result.is_applied) {
            return result;
          }
        });
    let sorters = results.length ? results.map(result => result.sorter) : [];
    let loading =
      isEmpty(this.state.study) ||
      isEmpty(this.state.sorter) ||
      isEmpty(results);
    let toggleCopy = this.state.openIcon ? "Hide Options" : "Show Options";
    let divStyle = {
      marginBottom: "3rem"
    };
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
              {/* TODO: DO WE NEED THIS? */}
              {/* <div>
                <Badge
                  variant="primary"
                  onClick={() =>
                    this.setState({ openIcon: !this.state.openIcon })
                  }
                >
                  {toggleCopy}
                </Badge>
                <Collapse in={this.state.openIcon} style={divStyle}>
                  <HeatmapOptionsRow
                    handleFormatChange={this.handleFormatChange}
                    handleSliderChange={this.handleSliderChange}
                    handleMetricChange={this.handleMetricChange}
                    format={this.state.format}
                    metric={this.state.metric}
                    sliderValue={this.state.sliderValue}
                  />
                </Collapse>
              </div> */}
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
                          Hello anything go here?{" "}
                          <span role="img" aria-label="tropical drink">
                            ☎️
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
