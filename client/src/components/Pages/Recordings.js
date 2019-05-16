import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import { isEmpty } from "../../utils";
import { Col, Container, Row } from "react-bootstrap";

import "./pages.css";
import ExpandableRecordingsTable from "../Recordings/ExpandableRecordingsTable";

class Recordings extends Component {
  render() {
    let loading =
      isEmpty(this.props.recordings) ||
      isEmpty(this.props.studies) ||
      isEmpty(this.props.studysets);
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          {/* <Row className="justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="intro">
                <p className="big">Recordings</p>
                <div className="dividerthick" />
                <p className="subhead">
                  Below is the current list of studies in SpikeForest. Click on
                  each to see an expanded list of the recordings within each
                  study.
                </p>
              </div>
            </Col>
          </Row> */}
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Recording Organization</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <p>
                      Recordings are grouped into "studies". Each study contains
                      a set of real or synthesized recordings sharing a common
                      source (probe and brain region, or simulation code
                      settings). It is appropriate to aggregate the statistics
                      from all recordings within a particular study.
                    </p>
                    <p>
                      In turn, studies are grouped into "study sets". Each study
                      set is a collection of studies which have different
                      parameters but share some common features.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>SpikeForest study sets</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    {loading ? (
                      <Preloader />
                    ) : (
                      <ExpandableRecordingsTable {...this.props} />
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Recording Types</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <p>
                      Our hosted recordings include many popular probe
                      geometries and types, and fall into three categories:
                    </p>
                    <div className="list__section">
                      <span className="list__heading">1. Paired (<i>in vivo</i> or <i>in vitro</i>)</span>
                      <span className="list__body">
                        Recordings from various laboratories where an
                        independent intra- or juxta-cellular probe provides
                        reliable ground truth firing events, usually for one
                        neuron per recording.
                      </span>
                    </div>
                    <div className="list__section">
                      <span className="list__heading">
                        2. Simulated (in silico)
                      </span>
                      <span className="list__body">
                        Recordings from neural simulator codes with various
                        degrees of fidelity, with known firing events for large
                        numbers of neurons.
                      </span>
                    </div>
                    <div className="list__section">
                      <span className="list__heading">3. Human-curated</span>
                      <span className="list__body">
                        We also host a small set of expert human-curated sorting
                        results.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Recordings;
