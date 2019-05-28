import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
const ReactMarkdown = require('react-markdown')

class StudySet extends Component {
  render() {
    let studySet = {};
    this.props.studySets.forEach(ss => {
        if (ss.name === this.props.studySetName) {
            studySet = ss;
        }
    })
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <Row className="container__sorter--row justify-content-md-center">
            <Col lg={12} sm={12} xl={10}>
              <div className="card card--stats">
                <div className="content">
                  <div className="card__footer">
                    <hr />
                    <ReactMarkdown source={studySet.description} />
                    <h3>Studies</h3>
                    {(
                      <span>
                        {(
                          <table className="table">
                            <thead>
                              <tr><th key="col1">Study name</th><th key="col2">Num. recordings</th></tr>
                            </thead>
                            <tbody>
                              {(
                                studySet.studies.map((study) => (
                                  <tr key={`study-${study.name}`}><td key="col1"><Link to={`/study/${study.name}`}>{study.name}</Link></td><td key="col2">{study.recordings.length}</td></tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        )}
                      </span>
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
export default StudySet;
