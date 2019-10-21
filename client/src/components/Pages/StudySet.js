import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Table } from "react-bootstrap";
const ReactMarkdown = require("react-markdown");

class StudySet extends Component {
  render() {
    let studySet = {};
    this.props.studySets.forEach(ss => {
      if (ss.name === this.props.studySetName) {
        studySet = ss;
      }
    });
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <Row className="subcontainer justify-content-md-center">
            <Col lg={12} sm={12} xl={12}>
              <div className="intro">
                <p className="big">{studySet.name}</p>
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
                      <strong>Study Set Description: {studySet.name}</strong>
                    </p>
                  </div>
                  <div className="card__footer markdown-footer">
                    <hr />
                    <ReactMarkdown source={studySet.description} />
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
                      <strong>Component studies</strong>
                    </p>
                  </div>
                  <div className="card__footer">
                    <hr />
                    <Table striped bordered size="sm">
                      <thead>
                        <tr>
                          <th key="col1">Study name</th>
                          <th key="col2">Num. recordings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studySet.studies.map(study => (
                          <tr key={`study-${study.name}`}>
                            <td key="col1">
                              <Link to={`/study/${study.name}`}>
                                {study.name}
                              </Link>
                            </td>
                            <td key="col2">{study.recordings.length}</td>
                          </tr>
                        ))}
                      </tbody>
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
export default StudySet;
