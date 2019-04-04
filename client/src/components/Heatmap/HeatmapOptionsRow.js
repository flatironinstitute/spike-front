import React, { Component } from "react";
import ModeCard from "../StatsCards/ModeCard";
import MetricCard from "../StatsCards/MetricCard";
import SliderCard from "../StatsCards/SliderCard";
import { Col, Container, Row } from "react-bootstrap";

import "react-rangeslider/lib/index.css";
import "./heatmap.css";

class HeatmapOptionsRow extends Component {
  render() {
    let largeCols = this.props.format === "cpu" ? 6 : 4;
    return (
      <div>
        <Container className="container__heatmap">
          <Row className="container__heatmap--row">
            <Col lg={largeCols} sm={12}>
              <ModeCard
                showCPU={this.props.showCPU}
                format={this.props.format}
                handleFormatChange={this.props.handleFormatChange}
              />
            </Col>
            <Col lg={largeCols} sm={12}>
              <SliderCard
                format={this.props.format}
                metric={this.props.metric}
                sliderValue={this.props.sliderValue}
                handleSliderChange={this.props.handleSliderChange}
              />
            </Col>
            {largeCols < 6 ? (
              <Col lg={4} sm={12}>
                <MetricCard
                  metric={this.props.metric}
                  handleMetricChange={this.props.handleMetricChange}
                />
              </Col>
            ) : (
              <div />
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default HeatmapOptionsRow;
