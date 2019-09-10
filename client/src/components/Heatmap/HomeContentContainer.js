import React, { Component } from "react";
import HeatmapCount from "./HeatmapCount";
import HeatmapOptionsRow from "./HeatmapOptionsRow";

import "react-rangeslider/lib/index.css";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

class HomeContentContainer extends Component {
  handleFormatChange = format => {
    this.props.setFormat(format);
  };

  handleMetricChange = metric => {
    this.props.setMetric(metric);
  };

  handleSliderChange = value => {
    let round = Math.round(value * 100) / 100;
    this.props.setSliderValue(this.props.format, round);
  };

  render() {
    return (
      <div>
        <HeatmapOptionsRow
          handleFormatChange={this.handleFormatChange}
          handleSliderChange={this.handleSliderChange}
          handleMetricChange={this.handleMetricChange}
          format={this.props.format}
          metric={this.props.metric}
          sliderValue={this.props.sliderValue[this.props.format]}
          showCPU={true}
        />
        {this.props.format ? (
          <HeatmapCount
            {...this.props}
            format={this.props.format}
            metric={this.props.metric}
            sliderValue={this.props.sliderValue[this.props.format]}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    format: state.format,
    sliderValue: state.sliderValue,
    metric: state.metric
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContentContainer);
