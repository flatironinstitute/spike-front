import React, { Component } from "react";
import ScatterplotCount from "./ScatterplotCount";
import ScatterplotAverage from "./ScatterplotAverage";

class ScatterplotContainer extends Component {
  getHeaderCopy(value) {
    var sliderValue;
    switch (value) {
      case "count":
        sliderValue = "Items above threshold:";
        break;
      case "average":
        sliderValue = "Average accuracy: ";
        break;
      default:
        sliderValue = "";
    }
    return sliderValue;
  }

  render() {
    const {
      selectedStudySortingResult,
      sliderValue,
      metric,
      format
    } = this.props;
    const copy = this.getHeaderCopy(this.props.format);
    console.log("🤩 state and props in container", this.state, this.props);
    return (
      <div>
        <p>
          Click marks below to see detailed information on the study and
          recording
        </p>
        <p>
          {copy}
          {selectedStudySortingResult
            ? selectedStudySortingResult.in_range
            : ""}
        </p>
        {(() => {
          switch (format) {
            case "count":
              return (
                <ScatterplotCount
                  {...this.props}
                  selectedUnits={selectedStudySortingResult.true_units}
                  sliderValue={sliderValue}
                  format={format}
                  metric={metric}
                />
              );
            case "average":
              return (
                <ScatterplotAverage
                  {...this.props}
                  selectedUnits={selectedStudySortingResult.true_units}
                  sliderValue={sliderValue}
                  format={format}
                  metric={metric}
                />
              );
            case "cpu":
              return (
                <p className="card__category">
                  <br />
                  Scatterplot data is not available for CPU
                </p>
              );
            default:
              return null;
          }
        })()}
      </div>
    );
  }
}
export default ScatterplotContainer;
