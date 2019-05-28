import React, { Component } from "react";
import ScatterplotContainer from "./ScatterplotContainer";
// import { isEmpty } from "../../utils";
import { Link } from "react-router-dom";

class ScatterplotCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studyAnalysisResult: null,
      cardHeight: "auto"
    };
  }

  componentDidMount() {
    if ((this.props.studyName) && (this.props.sorterName)) {
      this.findStudyAnalysisResult();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.studyName !== prevProps.studyName) ||
      (this.props.sorterName !== prevProps.sorterName)
    ) {
      this.findStudyAnalysisResult();
    }
    if (this.props.cardHeight !== prevProps.cardHeight) {
      this.updateCardHeight();
    }
  }

  updateCardHeight() {
    if (this.props.cardHeight) {
      this.setState({ cardHeight: this.props.cardHeight });
    }
  }

  findStudyAnalysisResult() {
    let sar = null;
    for (let studyAnalysisResult of this.props.studyAnalysisResults.allResults) {
      if (studyAnalysisResult.studyName === this.props.studyName) {
        sar = studyAnalysisResult;
      }
    }
    this.setState({studyAnalysisResult: sar});
  }

  render() {
    const loading =
      (!this.props.studyName) ||
      (!this.props.sorterName) ||
      (!this.state.studyAnalysisResult);
    // let divStyle = {
    //   backgroundColor: "#fffdc0",
    //   borderRadius: "5px",
    //   display: "inline-block"
    // };
    return (
      <div
        className="card card--heatmap"
        style={{ height: this.state.cardHeight + "px", minHeight: "215px" }}
      >
        <div className="detail__column-disable">
          {loading ? (
            <div className="card__header">
              <h4 className="card__title">
                Click a cell in the table to the left to see a detailed scatterplot of
                the corresponding sorter results.
              </h4>
            </div>
          ) : (
            <div>
              <div className="card__header">
                <div className="card__category--div">
                  <span className="card__title--link">
                  <Link to={`/studyset/${this.props.studySetName}`}>{this.props.studySetName}</Link>/<Link to={`/studyresults/${this.props.studyName}`}>{this.props.studyName}</Link>
                  </span>
                  <span className="card__title--link">
                    Sorter:
                    <Link to="/algorithms">{this.props.sorterName}</Link>
                  </span>
                </div>
              </div>
              <ScatterplotContainer
                studyAnalysisResult={this.state.studyAnalysisResult}
                studyName={this.props.studyName}
                sorterName={this.props.sorterName}
                sliderValue={this.props.sliderValue}
                format={this.props.format}
                metric={this.props.metric}
                cardHeight={this.props.cardHeight}
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
