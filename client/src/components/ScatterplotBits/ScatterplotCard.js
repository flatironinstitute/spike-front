import React, { Component } from "react";
import ScatterplotContainer from "./ScatterplotContainer";
// import { isEmpty } from "../../utils";
import { Link } from "react-router-dom";

class ScatterplotCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studyAnalysisResult: null
    };
  }

  componentDidMount() {
    if (this.props.studyName && this.props.sorterName) {
      this.findStudyAnalysisResult();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.studyName !== prevProps.studyName ||
      this.props.sorterName !== prevProps.sorterName
    ) {
      this.findStudyAnalysisResult();
    }
  }

  findStudyAnalysisResult() {
    let sar = null;
    for (let studyAnalysisResult of this.props.studyAnalysisResults
      .allResults) {
      if (studyAnalysisResult.studyName === this.props.studyName) {
        sar = studyAnalysisResult;
      }
    }
    this.setState({ studyAnalysisResult: sar });
  }

  render() {
    const loading =
      !this.props.studyName ||
      !this.props.sorterName ||
      !this.state.studyAnalysisResult;
    let sar = this.state.studyAnalysisResult;
    console.log("cardheight", this.props.cardHeight);
    let cardHeight = this.props.cardHeight || 100;
    return (
      <div
        className="card card--heatmap"
        style={{ height: cardHeight + "px", minHeight: "648px" }}
      >
        <div className="detail__column-disable">
          {loading ? (
            <div className="card__header">
              <h4 className="card__title">
                Click a cell in the table to see a detailed scatterplot of the
                corresponding sorter results.
              </h4>
            </div>
          ) : (
            <div>
              <div className="card__header">
                <div className="card__category--div">
                  <span className="card__title--link">
                    <Link to={`/studyset/${sar.studySetName}`}>
                      {sar.studySetName}
                    </Link>
                    /
                    <Link to={`/studyresults/${this.props.studyName}`}>
                      {this.props.studyName}
                    </Link>
                  </span>
                  <span className="card__title--link">
                    Sorter:
                    <Link to="/algorithms">{this.props.sorterName}</Link>
                  </span>
                </div>
              </div>
              <ScatterplotContainer
                studyAnalysisResult={sar}
                studyName={this.props.studyName}
                recordingName={this.props.recordingName}
                sorterName={this.props.sorterName}
                sliderValue={this.props.sliderValue}
                format={this.props.format}
                metric={this.props.metric}
                cardHeight={this.props.cardHeight}
                selectedUnitCode={this.props.selectedUnitCode}
                handleScatterplotClick={this.props.handleScatterplotClick}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default ScatterplotCard;
