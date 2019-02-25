import React, { Component } from "react";
import HeatmapCount from "./HeatmapCount";
import HeatmapAverage from "./HeatmapAverage";
import "react-rangeslider/lib/index.css";
import { Col, Container, Row } from "react-bootstrap";

import ModeCard from "../StatsCards/ModeCard";
import MetricCard from "../StatsCards/MetricCard";

import "./heatmap.css";

class HeatmapsColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "count",
      metric: "accuracy"
    };
  }

  handleFormatChange = value => {
    console.log("📸", value);
    this.setState({
      format: value
    });
  };

  handleMetricChange = value => {
    this.setState({
      metric: value
    });
  };

  render() {
    return (
      <div>
        <Container className="container__heatmap">
          <Row>
            <Col lg={4} sm={12}>
              <ModeCard
                format={this.state.format}
                handleFormatChange={this.handleFormatChange}
                statsIcon="refresh"
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={4} sm={12}>
              <MetricCard
                metric={this.state.metric}
                handleMetricChange={this.handleMetricChange}
              />
            </Col>
            <Col lg={4} sm={12}>
              {/* <ModeCard
                format={this.state.format}
                handleFormatChange={this.handleFormatChange}
              /> */}
              <div>
                <h2>HOlder</h2>
              </div>
            </Col>
          </Row>
        </Container>
        {this.state.format === "count" ? (
          <HeatmapCount {...this.props} format={this.state.format} />
        ) : (
          <HeatmapAverage {...this.props} format={this.state.format} />
        )}
      </div>
    );
  }
}

export default HeatmapsColumn;
