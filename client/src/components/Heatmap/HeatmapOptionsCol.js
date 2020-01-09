import React, { Component } from "react";
import ModeCard from "../StatsCards/ModeCard";
import MetricCard from "../StatsCards/MetricCard";
import SliderCard from "../StatsCards/SliderCard";

import "react-rangeslider/lib/index.css";

class HeatmapOptionsCol extends Component {
  render() {
    return (
      <div>
        <div className="options-group">
          <ModeCard
            bottomMargin={true}
            showCPU={this.props.showCPU}
            format={this.props.format}
            handleFormatChange={this.props.handleFormatChange}
          />
          <SliderCard
            bottomMargin={true}
            format={this.props.format}
            metric={this.props.metric}
            imputeMissingValues={this.props.imputeMissingValues}
            sliderValue={this.props.sliderValue}
            handleSliderChange={this.props.handleSliderChange}
          />
          <MetricCard
            bottomMargin={true}
            metric={this.props.metric}
            imputeMissingValues={this.props.imputeMissingValues}
            handleMetricChange={this.props.handleMetricChange}
            handleImputeMissingValuesChange={this.props.handleImputeMissingValuesChange}
          />
        </div>
      </div>
    );
  }
}

export default HeatmapOptionsCol;
