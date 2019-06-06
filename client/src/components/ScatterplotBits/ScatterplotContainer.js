import React, { Component } from "react";
import ScatterplotCount from "./ScatterplotCount";

class ScatterplotContainer extends Component {
  getHeaderCopy(metric) {
    return `Unit ${metric} vs. SNR`;
    /*
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
    */
  }

  render() {
    const {
      studyName,
      sorterName,
      studyAnalysisResult,
      sliderValue,
      metric,
      format
    } = this.props;
    const colorRanges = {
      average: ["#6B7CC4", "#102BA3"],
      cpu: ["#EFC1E3", "#B52F93"],
      count: ["#00CEA8", "#0C4F42"]
    };
    const copy = this.getHeaderCopy(this.props.metric);
    return (
      <div>
        {
          this.props.handleScatterplotClick ?
          (
            <p>
              Each marker corresponds to one ground truth unit in the study and may be clicked for more details. Marker area is proportional to the number of events and color reflects the particular recording within the study.
            </p>
          ) : (<span></span>)
        }
        <p>
          {copy}
        </p>
        {(() => {
          switch (format) {
            case "count":
              return (
                <ScatterplotCount
                  lineOrientation={'horizontal'}
                  colorRange={colorRanges['count']}
                  studyAnalysisResult={studyAnalysisResult}
                  studyName={studyName}
                  sorterName={sorterName}
                  sliderValue={sliderValue}
                  format={format}
                  metric={metric}
                  selectedUnitCode={this.props.selectedUnitCode}
                  handleScatterplotClick={this.props.handleScatterplotClick}
                />
              );
            case "average":
              return (
                <ScatterplotCount
                  lineOrientation={'vertical'}
                  colorRange={colorRanges['average']}
                  studyAnalysisResult={studyAnalysisResult}
                  studyName={studyName}
                  sorterName={sorterName}
                  sliderValue={sliderValue}
                  format={format}
                  metric={metric}
                  selectedUnitCode={this.props.selectedUnitCode}
                  handleScatterplotClick={this.props.handleScatterplotClick}
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
