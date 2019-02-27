import React, { Component } from "react";
import { isEmpty, toTitleCase } from "../../utils";
import Preloader from "../Preloader/Preloader";
import { Card, Col, Container, Row } from "react-bootstrap";

// import pairing from "../../data/stubData/pairing_sample";

// import spikeforestwidgets from "./SpikeforestWidgets";

// http://localhost:3000/pairing/magland-synth-noise10-K10-C4/MountainSort4-thr3

// Pairing Page -> Study Results Page
// Links to the other sorters on the study (button row)
// Row of the heatmap with toolbar from heatmap
// Scatterplot
// spike sprays from each unit on click (// Channels as a separate row)
// Table of data on each unit

class SingleResultPairing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      study: "",
      sorter: ""
    };
  }

  componentDidMount() {
    console.log("🐠", this.getPageName());
    this.props.fetchPairing();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedPairing !== prevProps.selectedPairing) {
      console.log("🍐", this.props.selectedPairing);
    }
  }

  getPageName() {
    let activeRoute = this.props.router.location.pathname;
    let activeArr = activeRoute.split("/").filter(item => item);
    console.log("🇺🇬", activeArr);
    if (activeArr.length) {
      return toTitleCase(activeArr.join(" "));
    }
  }

  render() {
    let loading = isEmpty(this.state.study) || isEmpty(this.state.sorter);
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
                      </div>
                      <div className="card__footer">
                        <hr />
                        <p>
                          {" "}
                          Generally speaking, spike sorting algorithms take in
                          an unfiltered multi-channel timeseries (aka,
                          recording) and a list of algorithm parameters and
                          output a list of firing times and associated integer
                          unit labels. This page lists the spike sorting codes
                          we run, as well as some that have yet to be
                          incorporated. Most of the codes were developed at
                          other institutions; two of them are in-house.
                        </p>
                        <p className="updated">Link to documentation?</p>
                        <p className="updated">
                          Embedded Notebooks / Scripts with Configs?
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="container__sorter--row">
                <Col lg={12} sm={12}>
                  <div className="card card--stats">
                    <h2>
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
