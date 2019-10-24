import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import Sidebar from "../Sidebar/Sidebar";
import { isEmpty, toTitleCase } from "../../utils";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

class Recordings extends Component {
  render() {
    let loading = isEmpty(this.props.studySets);
    let sidebarItems = [];
    if (this.props.studySets) {
      sidebarItems = this.props.studySets.map(item => ({
        name: toTitleCase(item.name.replace(/_/g, " ").toLowerCase()),
        value: item.name
      }));
    }
    sidebarItems.unshift(
      { name: "Recording Organization", value: "recordingorganization" },
      { name: "Recording Types", value: "recordingtypes" }
    );
    return (
      <Container className="container-sidebar">
        <Row noGutters>
          <Col xl={2} md={3} sm={12} className="sidebar">
            <Sidebar listItems={sidebarItems} listTitle={"Recordings"} />
          </Col>
          <Col xl={10} md={9} sm={12} className="page__body">
            <Container className="container__heatmap">
              <Row className="subcontainer justify-content-md-center">
                <Col lg={12} sm={12} xl={12}>
                  <div className="intro">
                    <p className="big">Recordings</p>
                  </div>
                </Col>
              </Row>
              <div className="finder" id="recordingorganization" />
              <Row className="subcontainer justify-content-md-center">
                <Col lg={12} sm={12} xl={12}>
                  <div className="card card__std">
                    <div className="content">
                      <div className="card__label">
                        <p>
                          <strong>Recording Organization</strong>
                        </p>
                      </div>
                      <div className="card__footer">
                        <hr />
                        <p>
                          Recordings are grouped into "studies". Each study
                          contains a set of real or synthesized recordings
                          sharing a common source (probe and brain region, or
                          simulation code settings). It is appropriate to
                          aggregate the statistics from all recordings within a
                          particular study.
                        </p>
                        <p>
                          In turn, studies are grouped into "study sets". Each
                          study set is a collection of studies which have
                          different parameters but share some common features.
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="finder" id="recordingtypes" />
              <Row className="subcontainer justify-content-md-center">
                <Col lg={12} sm={12} xl={12}>
                  <div className="card card__std">
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
                          <span className="list__heading">
                            1. Paired (<i>in vivo</i> or <i>in vitro</i>)
                          </span>
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
                            degrees of fidelity, with known firing events for
                            large numbers of neurons.
                          </span>
                        </div>
                        <div className="list__section">
                          <span className="list__heading">
                            3. Human-curated
                          </span>
                          <span className="list__body">
                            We also host a small set of expert human-curated
                            sorting results.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              {loading ? (
                <Row className="subcontainer justify-content-md-center">
                  <Col lg={12} sm={12} xl={12}>
                    <div className="card card__std">
                      <div className="content">
                        <Preloader />
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <div>
                  {this.props.studySets.map(studySet => (
                    <div key={`study-set-${studySet.name}`}>
                      <Row className="subcontainer justify-content-md-center">
                        <Col lg={12} sm={12} xl={12}>
                          <div className="finder" id={studySet.name} />
                          <div className="listcard listcard-recording">
                            <div className="listcard-content">
                              <div className="listcard-section">
                                <Link
                                  to={`/studyset/${studySet.name}`}
                                  className="listcard-title"
                                >
                                  {studySet.name}
                                </Link>
                              </div>
                              <div className="listcard-section">
                                <Table striped bordered size="sm">
                                  <thead>
                                    <tr>
                                      <th key="col1">Study name</th>
                                      <th key="col2">Number recordings</th>
                                      <th key="col3"> </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {studySet.studies.map(study => (
                                      <tr key={`study-${study.name}`}>
                                        <td key="col1">{study.name}</td>
                                        <td key="col2">
                                          {study.recordings.length}
                                        </td>
                                        <td
                                          key="col3"
                                          className="listcard-link"
                                        >
                                          <Link
                                            to={`/study/${study.name}`}
                                            className="listcard-env"
                                          >
                                            View study details
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>{" "}
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ margin: "8rem 0" }} />
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Recordings;
