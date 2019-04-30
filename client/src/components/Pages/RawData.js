import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactJson from "react-json-view";
const axios = require('axios');

import "./pages.css";

var baseurl;
if (process.env.NODE_ENV === "production") {
  baseurl = window.location.href.replace("/rawdata", "");
} else {
  baseurl = "http://localhost:5000";
}

class RawData extends Component {
  constructor(props) {
    super(props);

    this.models = [
      "cpus",
      "recordings",
      "sorters",
      "sortingResults",
      "studies",
      "studySets",
      "trueUnits",
      "unitResults"
    ];

    this.state = {
      cpus: [],
      recordings: [],
      sorters: [],
      sortingResults: [],
      studies: [],
      studySets: [],
      trueUnits: [],
      unitResults: []
    };
  }

  async componentWillMount() {
    this.models.map(model => this.createFetch(model));
  }

  async createFetch(model) {
    const newUrl = baseurl + "/api/" + model;
    const response = await fetch(newUrl, {
      method: "GET",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    } else {
      this.setState(body);
    }
  }

  render() {
    return (
      <div className="page__body">
        <Container className="container__heatmap">
          <div className="card card--rawdata text-center">
            <h1>Raw data from all models</h1>
          </div>
          {this.models.map((model, i) => (
            <div className="card card--rawdata" key={"jspretty" + model + i}>
              <h2>{model.toUpperCase()}</h2>
              <Row className="justify-content-md-center">
                <Col lg="10">
                  <ReactJson src={this.state[model]} />
                </Col>
              </Row>
            </div>
          ))}
        </Container>
      </div>
    );
  }
}
export default RawData;
