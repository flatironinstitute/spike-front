import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";
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
      return <div>Study not found: {this.props.studyName}</div>;
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
    );
    let recording_rows = [];
    for (let rec of study.recordings) {
      recording_rows.push(
        <tr key={`recording--${study.name}-${rec.name}`}>
          <td key={"name"} className="listcard-link">
            <Link
              className="listcard-env"
              to={`/recording/${study.name}/${rec.name}`}
            >
              {rec.name}
            </Link>
          </td>
          <td key={"sampleRateHz"}>{rec.sampleRateHz}</td>
          <td key={"numChannels"}>{rec.numChannels}</td>
          <td key={"durationSec"}>{rec.durationSec}</td>
          <td key={"numTrueUnits"}>{rec.numTrueUnits}</td>
          <td key={"directory"}>{abbreviateSha1Path(rec.directory)}</td>
          <td key={"firingsTrue"}>
            {abbreviateSha1Path(rec.firingsTrue, { canDownload: false })}
          </td>
        </tr>
      );
    }
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <Row className="subcontainer justify-content-md-center">
            <Col lg={12} sm={12} xl={12}>
              <div className="intro">
                <p className="big">{study.name}</p>
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
                      <strong>Study Details: {study.name}</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <p>
                      This study is part of the{" "}
                      <Link to={`/studyset/${study.studySetName}`}>
                        {study.studySetName}{" "}
                      </Link>
                      study set. <br />
                      In the table below, click <strong>Recording</strong> names
                      to view electrode geometry and compute time.{"   "} Click
                      the links in the <strong>Directory</strong> or{" "}
                      <strong>True firings</strong> columns to copy the SHA-1
                      hash associated with this data.
                      <br />
                      <Link to={`/studyresults/${study.name}`}>
                        Click here to view the <strong>sorting results</strong>{" "}
                        associated with this study.
                      </Link>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="finder" id="pastanalyses" />
          <Row className="subcontainer-final justify-content-md-center">
            <Col lg={12} sm={12} xl={12}>
              <div className="card card__std">
                <div className="content">
                  <div className="card__label">
                    <p>
                      <strong>Recordings in {study.name}</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <Table striped bordered size="sm">
                      <thead>{recording_header}</thead>
                      <tbody>{recording_rows}</tbody>
                    </Table>
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
