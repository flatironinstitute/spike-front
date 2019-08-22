import React, { Component } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

import { toTitleCase } from "../../utils";

export class SliderCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderValue: props.sliderValue
    };
  }

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
        step = 0.05;
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

  handleSliderChange = value => {
    this.setState({ sliderValue: value });
  };

  handleSliderChangeComplete = () => {
    if (this.props.handleSliderChange)
      this.props.handleSliderChange(this.state.sliderValue);
  };

  render() {
    let max = this.getSliderMax();
    let step = this.getSliderStep();
    let primaryClass = this.props.bottomMargin
      ? "card card__stats-col"
      : "card card__stats";
    let sliderVal = Math.round(this.state.sliderValue / step) * step;
    sliderVal = Math.round(sliderVal * 100) / 100;
    return (
      <div className={primaryClass}>
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
                value={sliderVal}
                step={step}
                orientation="horizontal"
                onChange={this.handleSliderChange}
                onChangeComplete={this.handleSliderChangeComplete}
                // onChange={this.props.handleSliderChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SliderCard;
