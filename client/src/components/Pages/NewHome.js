import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import { isEmpty } from "../../utils";
import { Card, Col, Container, Row } from "react-bootstrap";
import ReactJson from "react-json-view";
// import HomeContentContainer from "../Heatmap/HomeContentContainer";

import "./pages.css";

class NewHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let loading = isEmpty(this.props.cpus, this.props.studies);
    console.log("🐃", this.props.cpus);
    return (
      <div className="page__body">
        {loading ? (
          <Container className="container__heatmap" id="overview">
            <Card>
              <Card.Body>
                <Preloader />
              </Card.Body>
            </Card>
          </Container>
        ) : (
          <Container className="container__heatmap">
            <div className="card card--rawdata text-center">
              <h1>CPU Data</h1>
            </div>
            <div className="card card--rawdata">
              <h2>CPU Datadump</h2>
              <Row className="justify-content-md-center">
                <Col lg="10">
                  <ReactJson src={this.props.cpus} />
                </Col>
              </Row>
            </div>
            <div className="card card--rawdata">
              <h2>Study Datadump</h2>
              <Row className="justify-content-md-center">
                <Col lg="10">
                  <ReactJson src={this.props.studies} />
                </Col>
              </Row>
            </div>
          </Container>
        )}
      </div>
    );
  }
}
export default NewHome;
