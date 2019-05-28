import React, { Component } from "react";
// import { Link } from "react-router-dom";
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
