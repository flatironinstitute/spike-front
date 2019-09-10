import React, { Component } from "react";
import ModeCard from "../StatsCards/ModeCard";
import MetricCard from "../StatsCards/MetricCard";
import SliderCard from "../StatsCards/SliderCard";
import { Col, Container, Row } from "react-bootstrap";

import "react-rangeslider/lib/index.css";

class HeatmapOptionsRow extends Component {
  render() {
    let isCPU = this.props.format === "cpu";
    return (
      <div>
        <Container className="container__heatmap">
          {isCPU ? (
            <Row className="container__heatmap--row">
              <Col lg={12} sm={12}>
                <ModeCard
                  showCPU={this.props.showCPU}
                  format={this.props.format}
                  handleFormatChange={this.props.handleFormatChange}
                />
              </Col>
            </Row>
          ) : (
            <Row className="container__heatmap--row">
              <Col lg={4} sm={12}>
                <ModeCard
                  showCPU={this.props.showCPU}
                  format={this.props.format}
                  handleFormatChange={this.props.handleFormatChange}
                />
              </Col>
              <Col lg={4} sm={12}>
                <SliderCard
                  format={this.props.format}
                  metric={this.props.metric}
                  sliderValue={this.props.sliderValue}
                  handleSliderChange={this.props.handleSliderChange}
                />
              </Col>
              <Col lg={4} sm={12}>
                <MetricCard
                  metric={this.props.metric}
                  handleMetricChange={this.props.handleMetricChange}
                />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}

export default HeatmapOptionsRow;
