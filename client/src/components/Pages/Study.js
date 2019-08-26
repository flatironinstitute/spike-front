import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { abbreviateSha1Path } from "../../utils";

class Study extends Component {
  render() {
    let study = null;
    for (let studySet of this.props.studySets) {
      for (let study0 of studySet.studies) {
        if (study0.name === this.props.studyName) {
          study = study0;
        }
      }
    }
    if (!study) {
      return <div>Study not found: {this.props.studyName}</div>
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
    for (let rec of study.recordings) {
      recording_rows.push(
        <tr key={`recording--${study.name}-${rec.name}`}>
          <td key={"name"}><Link to={`/recording/${study.name}/${rec.name}`}>{rec.name}</Link></td>
          <td key={"sampleRateHz"}>{rec.sampleRateHz}</td>
          <td key={"numChannels"}>{rec.numChannels}</td>
          <td key={"durationSec"}>{rec.durationSec}</td>
          <td key={"numTrueUnits"}>{rec.numTrueUnits}</td>
          <td key={"directory"}>{abbreviateSha1Path(rec.directory)}</td>
          <td key={"firingsTrue"}>{abbreviateSha1Path(rec.firingsTrue, {canDownload: false})}</td>
        </tr>
      )
    }
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card__std">
                <div className="content">
                  <div className="card__footer">
                    <hr />
                    <h3>Study: {study.name}</h3>
                    <p>
                      This study is part of the <Link to={`/studyset/${study.studySetName}`}>{study.studySetName}</Link> study set.
                      You can <Link to={`/studyresults/${study.name}`}>view the sorting results</Link> associated with this study.
                    </p>
                    <h3>Recordings in {study.name}</h3>
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

export default Study;
