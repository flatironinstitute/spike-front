import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { abbreviateSha1Path } from "../../utils";

class SortingResult extends Component {
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
      return <div>Recording not found: {`${this.props.studyName}/${this.props.recordingName}`}</div>
    }
    let sortingResult = null;
    for (let sr of this.props.sortingResults) {
        if ((sr.studyName === this.props.studyName) && (sr.recordingName === this.props.recordingName) && (sr.sorterName === this.props.sorterName)) {
            sortingResult = sr;
        }
    }
    if (!sortingResult) {
        return <div>Sorting result not found: {`${this.props.studyName}/${this.props.recordingName}/${this.props.sorterName}`}</div>
    }
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__footer">
                    <hr />
                    <h3>Sorting result</h3>
                    <table className="table">
                      <thead>
                      </thead>
                      <tbody>
                        <tr><th>Study set</th><td><Link to={`/studyset/${study.studySetName}`}>{study.studySetName}</Link></td></tr>
                        <tr><th>Study</th><td><Link to={`/study/${study.name}`}>{study.name}</Link></td></tr>
                        <tr><th>Recording</th><td><Link to={`/recording/${study.name}/${recording.name}`}>{recording.name}</Link></td></tr>
                        <tr><th>Sorter</th><td><Link to={`/algorithms`}>{sortingResult.sorterName}</Link></td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__footer">
                    <table className="table">
                      <thead>
                      </thead>
                      <tbody>
                        <tr><th>Compute time (sec)</th><td>{sortingResult.cpuTimeSec}</td></tr>
                        <tr>
                          <th>Firings output</th>
                          <td>
                            {sortingResult.firings ?
                              (abbreviateSha1Path(sortingResult.firings + '/firings.mda', {canDownload: true})) :
                              <span>None1</span>
                            }
                          </td>
                        </tr>
                        <tr>
                          <th>Console output</th>
                          <td>
                            {sortingResult.consoleOut ?
                              (abbreviateSha1Path(sortingResult.consoleOut + '/stdout.txt', {canDownload: true})) :
                              <span>None</span>
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
