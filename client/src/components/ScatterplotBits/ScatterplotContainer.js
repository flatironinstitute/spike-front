import React, { Component } from "react";
import ScatterplotCount from "./ScatterplotCount";

class ScatterplotContainer extends Component {
  getHeaderCopy(metric) {
    return `Unit ${metric} vs. SNR`;
  }

  render() {
    const {
      studyName,
      sorterName,
      recordingName,
      studyAnalysisResult,
      sliderValue,
      metric,
      imputeMissingValues,
      format
    } = this.props;
    const colorRanges = {
      average: ["#6B7CC4", "#102BA3"],
      cpu: ["#EFC1E3", "#B52F93"],
      count: ["#00CEA8", "#0C4F42"]
    };
    const copy = this.getHeaderCopy(this.props.metric);
    const legendItems = [
      { title: "selected", color: "legend-yellow" },
      { title: "failed", color: "legend-red" }
    ];
    const legend = legendItems.map((leg, i) => (
      <div key={leg.toString() + i.toString()} className="legend-item">
        <p className={leg.color}>{leg.title}</p>
      </div>
    ));
    return (
      <div>
        {this.props.handleScatterplotClick ? (
          <p className="updated updated__no-top">
            Each marker corresponds to one ground truth unit in the study and
            may be clicked to view more details.
          </p>
        ) : (
          <span />
        )}
        <div className="legend-row">
          <p>{copy}</p>
          <div className="legend-container">{legend}</div>
        </div>
        {(() => {
          switch (format) {
            case "count":
              return (
                <ScatterplotCount
                  lineOrientation={"horizontal"}
                  colorRange={colorRanges["count"]}
                  studyAnalysisResult={studyAnalysisResult}
                  studyName={studyName}
                  recordingName={recordingName}
                  sorterName={sorterName}
                  sliderValue={sliderValue}
                  format={format}
                  metric={metric}
                  imputeMissingValues={imputeMissingValues}
                  selectedUnitCode={this.props.selectedUnitCode}
                  handleScatterplotClick={this.props.handleScatterplotClick}
                />
              );
            case "average":
              return (
                <ScatterplotCount
                  lineOrientation={"vertical"}
                  colorRange={colorRanges["average"]}
                  studyAnalysisResult={studyAnalysisResult}
                  studyName={studyName}
                  recordingName={recordingName}
                  sorterName={sorterName}
                  sliderValue={sliderValue}
                  format={format}
                  metric={metric}
                  imputeMissingValues={imputeMissingValues}
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
        <p>
          Marker area is proportional to the number of events and color
          indicates the recording within the study.
        </p>
      </div>
    );
  }
}
export default ScatterplotContainer;
