import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactJson from "react-json-view";

import "./pages.css";

const fetch = require("node-fetch");
const baseurl = process.env.API_URL || "http://localhost:5000";

class RawData extends Component {
  constructor(props) {
    super(props);

    this.models = [
      "recordings",
      "sorters",
      "sortingResults",
      "studies",
      "studySets",
      "trueUnits",
      "unitResults"
    ];

    this.state = {
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
      credentials: "same-origin",
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
    console.log("API URI", baseurl);
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
