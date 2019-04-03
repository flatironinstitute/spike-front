import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import { isEmpty } from "../../utils";
import { Card, Col, Container, Row } from "react-bootstrap";
import ReactJson from "react-json-view";
// import HomeContentContainer from "../Heatmap/HomeContentContainer";

import "./pages.css";

class NewHome extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.cpus !== prevProps.cpus) {
      console.log("🦓 cpus", this.props.cpus);
    }
  }

  render() {
    let loading = isEmpty(this.props.groupedURs, this.props.cpus);
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
              <h1>Main Viz Data</h1>
            </div>
            <div className="card card--rawdata">
              <h2>Grouped Unit Results Datadump</h2>
              <Row className="justify-content-md-center">
                <Col lg="10">
                  <ReactJson src={this.props.groupedURs} />
                </Col>
              </Row>
            </div>
            <div className="card card--rawdata">
              <h2>CPU Datadump</h2>
              <Row className="justify-content-md-center">
                <Col lg="10">
                  <ReactJson src={this.props.cpus} />
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
