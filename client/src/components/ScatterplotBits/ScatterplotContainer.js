import React, { Component } from "react";
import Scatterplot from "./Scatterplot";

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
    const { selectedStudy, sliderValue, metric, format } = this.props;
    console.log("🐶", selectedStudy, sliderValue, metric, format);
    const copy = this.getHeaderCopy(this.props.format);
    return (
      <div>
        <p>
          {copy}
          {selectedStudy ? selectedStudy.in_range : ""}
        </p>
        <Scatterplot
          {...this.props}
          selectedUnits={selectedStudy.true_units}
          sliderValue={sliderValue}
          format={format}
          metric={metric}
        />
      </div>
    );
  }
}
export default ScatterplotContainer;
