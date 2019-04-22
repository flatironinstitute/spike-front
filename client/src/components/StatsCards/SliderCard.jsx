import React, { Component } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

import "./statscards.css";
import { toTitleCase } from "../../utils";

export class SliderCard extends Component {
  getSliderCopy() {
    let copy;
    switch (this.props.format) {
      case "count":
        copy = `Minimum ${toTitleCase(this.props.metric)}`;
        break;
      case "average":
        copy = "Minimum SNR";
        break;
      case "cpu":
        copy = "Maximum CPU Time";
        break;
      default:
        copy = "";
    }
    return copy;
  }

  getSliderMax() {
    let max;
    switch (this.props.format) {
      case "count":
        max = 1;
        break;
      case "average":
        max = 50;
        break;
      case "cpu":
        max = 1000;
        break;
      default:
        max = 1;
    }
    return max;
  }

  getSliderStep() {
    let step;
    switch (this.props.format) {
      case "count":
        step = 0.1;
        break;
      case "average":
        step = 1;
        break;
      case "cpu":
        step = 5;
        break;
      default:
        step = 1;
    }
    return step;
  }

  getSliderValue() {
    if (this.state.useDefault) {
      return 0;
    } else {
      this.setState({ useDefault: false });
      return this.props.sliderValue;
    }
  }

  render() {
    let max = this.getSliderMax();
    let step = this.getSliderStep();
    return (
      <div className="card card--stats">
        <div className="content">
          <div className="card__label">
            <p>
              {this.getSliderCopy()}: <strong>{this.props.sliderValue}</strong>
            </p>
          </div>
          <div className="card__footer">
            <hr />
            <div className="slider__horizontal">
              <Slider
                min={0}
                max={max}
                value={this.props.sliderValue}
                step={step}
                orientation="horizontal"
                onChange={this.props.handleSliderChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SliderCard;
