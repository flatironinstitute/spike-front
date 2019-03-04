import React, { Component } from "react";
import HeatmapCount from "./HeatmapCount";
import HeatmapSNR from "./HeatmapSNR";
import HeatmapCPU from "./HeatmapCPU";

import "react-rangeslider/lib/index.css";
import { Col, Container, Row } from "react-bootstrap";

import ModeCard from "../StatsCards/ModeCard";
import MetricCard from "../StatsCards/MetricCard";
import SliderCard from "../StatsCards/SliderCard";

import "./heatmap.css";

class HeatmapsColumn extends Component {
  render() {
    let largeCols = this.props.format === "cpu" ? 6 : 4;
    return (
      <div>
        <Container className="container__heatmap">
          <Row className="container__heatmap--row">
            <Col lg={largeCols} sm={12}>
              <ModeCard
                format={this.props.format}
                handleFormatChange={this.props.handleFormatChange}
              />
            </Col>
            <Col lg={largeCols} sm={12}>
              <SliderCard
                format={this.props.format}
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

export default HeatmapsColumn;
