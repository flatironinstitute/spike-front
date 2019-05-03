import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReactJson from "react-json-view";
import "./pages.css";

const axios = require("axios");

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
    try {
      const response = await axios.get(newUrl);
      if (response.status !== 200) {
        console.error(model, response);
      } else {
        this.setState(response.data);
      }
    } catch (error) {
      console.error(model, error);
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
