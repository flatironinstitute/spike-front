import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";
import { abbreviateSha1Path } from "../../utils";
import ConsoleOutput from "../Utils/ConsoleOutput";
import ReproductionCode from "../ReproductionCode/ReproductionCode";

class SortingResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consoleOutExpanded: false
    };
  }

  findSorter(sorterName) {
    for (let sorter of this.props.sorters) {
      if (sorter.name === sorterName) {
        return sorter;
      }
    }
    return null;
  }

  format_date(x) {
    return new Date(x).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    });
  }

  render() {
    let recording = null;
    let study = null;
    for (let studySet of this.props.studySets) {
      for (let study0 of studySet.studies) {
        if (study0.name === this.props.studyName) {
          for (let recording0 of study0.recordings) {
            if (recording0.name === this.props.recordingName) {
              recording = recording0;
              study = study0;
            }
          }
        }
      }
    }
    if (!recording) {
      return (
        <div>
          Recording not found:{" "}
          {`${this.props.studyName}/${this.props.recordingName}`}
        </div>
      );
    }
    let sortingResult = null;
    for (let sr of this.props.sortingResults) {
      if (
        sr.studyName === this.props.studyName &&
        sr.recordingName === this.props.recordingName &&
        sr.sorterName === this.props.sorterName
      ) {
        sortingResult = sr;
      }
    }
    if (!sortingResult) {
      return (
        <div>
          Sorting result not found:{" "}
          {`${this.props.studyName}/${this.props.recordingName}/${
            this.props.sorterName
          }`}
        </div>
      );
    }
    let sorter = this.findSorter(sortingResult.sorterName) || {};
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <Row className="subcontainer justify-content-md-center">
            <Col lg={12} sm={12} xl={12}>
              <div className="intro">
                <p className="big">Sorting result</p>
                <p className="subhead">
                  {" "}
                  <Link to={`/study/${study.name}`}>{study.name}</Link> (
                  <Link to={`/recording/${study.name}/${recording.name}`}>
                    {recording.name}
                  </Link>
                  ) sorted with{" "}
                  <Link to={`/algorithms`}>{sortingResult.sorterName}</Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
          <div className="finder" />
          <Row className="subcontainer justify-content-md-center">
            <Col lg={12} sm={12} xl={12}>
              <div className="card card__std">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Sorting result details</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <Table striped bordered size="sm">
                      <thead />
                      <tbody>
                        <tr>
                          <th>Study set</th>
                          <td>
                            <Link to={`/studyset/${study.studySetName}`}>
                              {study.studySetName}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th>Study</th>
                          <td>
                            <Link to={`/study/${study.name}`}>
                              {study.name}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th>Recording</th>
                          <td>
                            <Link
                              to={`/recording/${study.name}/${recording.name}`}
                            >
                              {recording.name}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th>Sorter</th>
                          <td>
                            <Link to={`/algorithms`}>
                              {sortingResult.sorterName}
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <th>Sorting parameters</th>
                          <td>
                            <pre>
                              {JSON.stringify(
                                sorter.sortingParameters,
                                null,
                                4
                              )}
                            </pre>
                          </td>
                        </tr>
                        <tr>
                          <th>Firings output</th>
                          <td>
                            {sortingResult.firings ? (
                              abbreviateSha1Path(
                                sortingResult.firings + "/firings.mda",
                                { canDownload: false }
                              )
                            ) : (
                              <span>None</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Console output</th>
                          <td>
                            {sortingResult.consoleOut ? (
                              abbreviateSha1Path(
                                sortingResult.consoleOut + "/stdout.txt",
                                { canDownload: false }
                              )
                            ) : (
                              <span>None</span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>Compute time (sec)</th>
                          <td>{sortingResult.cpuTimeSec}</td>
                        </tr>
                        <tr>
                          <th>Return code</th>
                          <td>{sortingResult.returnCode}</td>
                        </tr>
                        <tr>
                          <th>Timed out</th>
                          <td>{sortingResult.timedOut ? "yes" : "no"}</td>
                        </tr>
                        <tr>
                          <th>Start time</th>
                          <td>{this.format_date(sortingResult.startTime)}</td>
                        </tr>
                        <tr>
                          <th>End time</th>
                          <td>{this.format_date(sortingResult.endTime)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="finder" />
          <Row className="subcontainer justify-content-md-center">
            <Col lg={12} sm={12} xl={12}>
              <div className="card card__std">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Console output</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    {this.state.consoleOutExpanded ? (
                      <ConsoleOutput
                        consoleOutPath={sortingResult.consoleOut}
                      />
                    ) : (
                      <button
                        onClick={() =>
                          this.setState({ consoleOutExpanded: true })
                        }
                      >
                        Load console output
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="finder" />
          <Row className="subcontainer-final justify-content-md-center">
            <Col lg={12} sm={12} xl={12}>
              <div className="card card__std">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Reproduction steps</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    {this.state.codeExpanded ? (
                      <ReproductionCode
                        sortingResult={sortingResult}
                        sorter={sorter}
                        general={this.props.general}
                      />
                    ) : (
                      <button
                        onClick={() => this.setState({ codeExpanded: true })}
                      >
                        Load code for reproducing result
                      </button>
                    )}
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

export default SortingResult;
