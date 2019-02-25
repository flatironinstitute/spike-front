import React, { Component } from "react";
import HeatmapCount from "./HeatmapCount";
import HeatmapAverage from "./HeatmapAverage";
import "react-rangeslider/lib/index.css";
import { Col, Container, Row } from "react-bootstrap";

import ModeCard from "../StatsCards/ModeCard";
import MetricCard from "../StatsCards/MetricCard";
import SliderCard from "../StatsCards/SliderCard";

import "./heatmap.css";

class HeatmapsColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "count",
      metric: "accuracy",
      sliderValue: 0
    };
  }

  handleFormatChange = value => {
    this.setState({
      format: value,
      sliderValue: 0
    });
  };

  handleMetricChange = value => {
    this.setState({
      metric: value
    });
  };

  handleSliderChange = value => {
    this.setState({
      sliderValue: value
    });
  };

  render() {
    let largeCols = this.state.format === "cpu" ? 6 : 4;
    return (
      <div>
        <Container className="container__heatmap">
          <Row className="container__heatmap--row">
            <Col lg={largeCols} sm={12}>
              <ModeCard
                format={this.state.format}
                handleFormatChange={this.handleFormatChange}
              />
            </Col>
            <Col lg={largeCols} sm={12}>
              <SliderCard
                format={this.state.format}
                sliderValue={this.state.sliderValue}
                handleSliderChange={this.handleSliderChange}
              />
            </Col>
            {largeCols < 6 ? (
              <Col lg={4} sm={12}>
                <MetricCard
                  metric={this.state.metric}
                  handleMetricChange={this.handleMetricChange}
                />
              </Col>
            ) : (
              <div />
            )}
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
