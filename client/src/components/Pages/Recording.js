import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { abbreviateSha1Path } from "../../utils";

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
            <td key={"sampleRateHz"}>{rec.sampleRateHz}</td>
            <td key={"numChannels"}>{rec.numChannels}</td>
            <td key={"durationSec"}>{rec.durationSec}</td>
            <td key={"numTrueUnits"}>{rec.numTrueUnits}</td>
            <td key={"directory"}>{abbreviateSha1Path(rec.directory)}</td>
            <td key={"firingsTrue"}>{abbreviateSha1Path(rec.firingsTrue, {canDownload: true})}</td>
        </tr>
    )

    let sorting_result_header = (
        <tr>
            <th key={"sorter"}>Sorter</th>
            <th key={"compute_time"}>Compute time (sec)</th>
            <th key={"output"}>Output</th>
        </tr>
    )
    let sorting_result_rows = [];
    if (this.props.sortingResults) {
        for (let sr of this.props.sortingResults) {
            if ((sr.studyName === study.name) && (sr.recordingName === rec.name)) {
                sorting_result_rows.push(
                    <tr key={`sorting-result-${study.name}-${rec.name}-${sr.sorterName}`}>
                        <td key={"sorter"}><Link to={`/sortingresult/${study.name}/${rec.name}/${sr.sorterName}`}>{sr.sorterName}</Link></td>
                        <td key={"compute_time"}>{sr.cpuTimeSec}</td>
                        <td key={"output"}>{abbreviateSha1Path(sr.firings + '/firings.mda', {canDownload: true})}</td>
                    </tr>
                )
            }
        }
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
                    <h3>Recording: {recording.name}</h3>
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
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__footer">
                    <h4>Sorting results</h4>
                    <table className="table">
                        <thead>
                            {sorting_result_header}
                        </thead>
                        <tbody>
                            {sorting_result_rows}
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

export default Recording;
