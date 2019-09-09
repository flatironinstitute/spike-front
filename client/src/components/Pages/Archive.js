import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import PathLink from "../PathLink/PathLink";
import ReactCollapsingTable from "react-collapsing-table";
const axios = require("axios");
const stable_stringify = require("json-stable-stringify");
const crypto = require("crypto");

class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analysisHistory: null,
      status: "loading"
    };
  }

  async componentDidMount() {
    let obj = await this.loadObject(
      "key://pairio/spikeforest/spike-front-analysis-history.json"
    );
    if (!obj) {
      this.setState({ status: "download-failed" });
      return;
    }
    if (!obj.analyses) {
      this.setState({ status: "error" });
      return;
    }
    this.setState({ analysisHistory: obj });
    this.setState({ status: "loaded" });
  }

  async loadObject(path, opts) {
    if (!path) {
      if (opts.key && opts.collection) {
        path = `key://pairio/${opts.collection}/~${hash_of_key(opts.key)}`;
      }
    }
    let response;
    try {
      response = await axios.get(
        `/api/loadObject?path=${encodeURIComponent(path)}`
      );
    } catch (err) {
      return null;
    }
    let rr = response.data;
    if (rr.success) {
      return rr.object;
    } else return null;
  }

  render() {
    const archiveColumns = [
      {
        accessor: "date",
        label: "Analysis date",
        priorityLevel: 1,
        position: 1,
        minWidth: 150,
        sortable: true
      },
      {
        accessor: "path",
        label: "Snapshot",
        priorityLevel: 2,
        position: 1,
        minWidth: 150,
        CustomComponent: PathLink
      }
    ];

    let archiveRows = [];
    let message = "";

    if (this.state.status === "loaded") {
      let analyses = this.state.analysisHistory.analyses;
      for (let i = analyses.length - 1; i >= 0; i--) {
        let a = analyses[i];
        let datestr = new Date(a.General.dateUpdated).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        });
        archiveRows.push({
          id: i,
          date: datestr,
          path: a.path
        });
      }
    } else {
      if (this.state.status === "loading") {
        message = "Loading analysis history...";
      } else if (this.state.status === "download-failed") {
        message = "Failed to download analysis history.";
      } else if (this.state.status === "error") {
        message = "Error in analysis history.";
      }
    }
    return (
      <div className="page__body">
        {this.state.status === "loaded" ? (
          <Container className="container__heatmap">
            <Row className="subcontainer justify-content-md-center">
              <Col lg={12} sm={12} xl={12}>
                <div className="intro">
                  <p className="big">Analysis Archive</p>
                </div>
              </Col>
            </Row>
            <Row className="subcontainer justify-content-md-center">
              <Col lg={12} sm={12} xl={12}>
                <div className="card card__std">
                  <div className="content">
                    <div className="card__label">
                      <p>
                        <strong>Overview</strong>
                      </p>
                    </div>
                    <div className="card__footer">
                      <hr />
                      <p>
                        Below is the SpikeForest analysis archive with the most
                        recent analysis at the top. These results may be loaded
                        into Python using the MountainTools and SpikeForest
                        packages.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="subcontainer justify-content-md-center">
              <Col lg={12} sm={12} xl={12}>
                <div className="card card__std">
                  <div className="content">
                    <div className="card__label">
                      <p>
                        <strong>Past Analyses</strong>
                      </p>
                    </div>
                    <div className="card__footer">
                      <hr />
                      <ReactCollapsingTable
                        columns={archiveColumns}
                        rows={archiveRows}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container className="container__heatmap">
            <Card>
              <Card.Body>
                <Card.Title>
                  <h3>{message}</h3>
                </Card.Title>
              </Card.Body>
            </Card>
          </Container>
        )}
      </div>
    );
  }
}

function hash_of_string(key) {
  // creating hash object
  let hash = crypto.createHash("sha1");
  let data = hash.update(key, "utf-8");
  return data.digest("hex");
}

function hash_of_key(key) {
  if (typeof key == "string") {
    return hash_of_string(key);
  } else {
    return hash_of_string(stable_stringify(key));
  }
}

export default Archive;
