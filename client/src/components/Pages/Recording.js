import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

class Recording extends Component {
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
      return <div>Recording not found: {this.props.recordingName}</div>
    }
    let recording_header = (
      <tr>
        <th>Recording</th>
        <th>Sample rate (Hz)</th>
        <th>Num. Channels</th>
        <th>Duration (sec)</th>
        <th>Num. true units</th>
        <th>Directory</th>
        <th>True firings</th>
      </tr>
    )
    let recording_rows = [];
    let rec = recording;
    recording_rows.push(
    <tr key={`recording--${study.name}-${rec.name}`}>
        <td key={"name"}>{rec.name}</td>
        <td key={"sampleRateHz"}>{rec.sampleRateHz}</td>
        <td key={"numChannels"}>{rec.numChannels}</td>
        <td key={"durationSec"}>{rec.durationSec}</td>
        <td key={"numTrueUnits"}>{rec.numTrueUnits}</td>
        <td key={"directory"}>{abbreviateSha1Path(rec.directory)}</td>
        <td key={"firingsTrue"}>{abbreviateSha1Path(rec.firingsTrue)}</td>
    </tr>
    )
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__footer">
                    <hr />
                    <h3>Recording name: {recording.name}</h3>
                    <p>
                      This recording is part of the <Link to={`/study/${recording.studyName}`}>{recording.studyName}</Link> study
                      within the <Link to={`/studyset/${recording.studySetName}`}>{recording.studySetName}</Link> study set.
                      You can <Link to={`/studyresults/${recording.studyName}`}>view the sorting results</Link> associated with this study.
                    </p>
                    <table className="table">
                      <thead>
                        {recording_header}
                      </thead>
                      <tbody>
                        {recording_rows}
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

function abbreviateSha1Path(path) {
  let list0 = path.split('/');
  return <span title={path}>{`${list0[0]}//.../${list0[list0.length-1]}`}</span>;
}

export default Recording;
