import React, { Component } from "react";
import HeatmapCount from "./HeatmapCount";
import HeatmapSNR from "./HeatmapSNR";
import HeatmapCPU from "./HeatmapCPU";
import HeatmapOptionsRow from "./HeatmapOptionsRow";
import { Container, Jumbotron } from "react-bootstrap";

import "react-rangeslider/lib/index.css";
import "./heatmap.css";

class HomeContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "cpu",
      metric: "accuracy",
      sliderValue: 0.8,
      isDownloaded: false
    };
  }
  handleFormatChange = value => {
    var sliderValue;
    switch (value) {
      case "count":
        sliderValue = 0.8;
        break;
      case "average":
        sliderValue = 5;
        break;
      default:
        sliderValue = 0;
    }
    this.setState({
      format: value,
      sliderValue: sliderValue
    });
  };

  handleMetricChange = value => {
    this.setState({
      metric: value
    });
  };

  handleSliderChange = value => {
    let round = Math.round(value * 100) / 100;
    this.setState({
      sliderValue: round
    });
  };

  render() {
    return (
      <Container fluid className="container__home">
        <HeatmapOptionsRow
          handleFormatChange={this.handleFormatChange}
          handleSliderChange={this.handleSliderChange}
          handleMetricChange={this.handleMetricChange}
          format={this.state.format}
          metric={this.state.metric}
          sliderValue={this.state.sliderValue}
          showCPU={true}
        />
        <Jumbotron fluid>
          <Container fluid>
            <h1>I am the entire viz</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </Container>
        </Jumbotron>
      </Container>
    );
  }
}

export default HomeContentContainer;
