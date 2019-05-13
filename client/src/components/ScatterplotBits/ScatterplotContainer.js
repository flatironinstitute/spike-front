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
      count: ["#6B7CC4", "#102BA3"],
      cpu: ["#EFC1E3", "#B52F93"],
      average: ["#00CEA8", "#0C4F42"]
    };
    const copy = this.getHeaderCopy(this.props.metric);
    return (
      <div>
        {
          this.props.handleScatterplotClick ?
          (
            <p>
              Click a marker below for more details.
            </p>
          ) : (<span></span>)
        }
        <p>
          {copy}
          {/*selectedStudySortingResult
            ? selectedStudySortingResult.in_range
          : ""*/}
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
