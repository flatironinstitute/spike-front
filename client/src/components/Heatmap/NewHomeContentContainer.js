import React, { Component } from "react";
import HeatmapOptionsRow from "./HeatmapOptionsRow";

import "react-rangeslider/lib/index.css";
import "./heatmap.css";

class NewHomeContentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "count",
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
      <div>
        <HeatmapOptionsRow
          handleFormatChange={this.handleFormatChange}
          handleSliderChange={this.handleSliderChange}
          handleMetricChange={this.handleMetricChange}
          format={this.state.format}
          metric={this.state.metric}
          sliderValue={this.state.sliderValue}
        />
        {(() => {
          switch (this.state.format) {
            case "count":
              return (
                <HeatmapCount
                  {...this.props}
                  format={this.state.format}
                  metric={this.state.metric}
                  sliderValue={this.state.sliderValue}
                />
              );
            case "average":
              return (
                <HeatmapSNR
                  {...this.props}
                  format={this.state.format}
                  metric={this.state.metric}
                  snrMin={this.state.sliderValue}
                />
              );
            case "cpu":
              return (
                <HeatmapCPU
                  {...this.props}
                  format={this.state.format}
                  cpuMax={this.state.sliderValue}
                />
              );
            default:
              return null;
          }
        })()}
      </div>
    );
  }
}

export default NewHomeContentContainer;
