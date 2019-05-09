import React, { Component } from "react";
import ScatterplotContainer from "./ScatterplotContainer";
import { isEmpty } from "../../utils";
import { Link } from "react-router-dom";

class ScatterplotCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      study: null,
      sorter: null,
      studyAnalysisResult: null,
      cardHeight: "auto"
    };
  }

  componentDidMount() {
    if ((this.props.selectedStudyName) && (this.props.selectedSorterName)) {
      this.findStudyAndSorter();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.selectedStudyName !== prevProps.selectedStudyName) ||
      (this.props.selectedSorterName !== prevProps.selectedSorterName)
    ) {
      this.findStudyAndSorter();
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

  findStudyAndSorter() {
    let study = this.props.studies.filter(
      study => study.name === this.props.selectedStudyName
    );
    let sorter = this.props.sorters.filter(
      sorter => sorter.name === this.props.selectedSorterName
    );
    let studyAnalysisResult = this.props.studyAnalysisResults.filter(
      sar => sar.studyName === this.props.selectedStudyName
    );
    this.setState({ study: study[0], sorter: sorter[0], studyAnalysisResult: studyAnalysisResult[0] });
  }

  render() {
    const study = this.props.selectedStudyName || "";
    const sorter = this.props.selectedSorterName || "";
    const loading =
      (!this.props.selectedStudyName) ||
      (!this.props.selectedSorterName) ||
      (!this.state.study) ||
      (!this.state.sorter) ||
      (!this.state.studyAnalysisResult);
    return (
      <div
        className="card card--heatmap"
        style={{ height: this.state.cardHeight + "px", minHeight: "215px" }}
      >
        <div className="detail__column">
          {loading ? (
            <div className="card__header">
              <h4 className="card__title">
                Click an item on the left to see more detail below
              </h4>
              <p className="card__category">
                <br />
                We host a variety of experimental paired ground truth recordings
                from the community and also many in silico synthetic recordings.
                Each sorter is run on all recordings and the resulting
                accuracies for the ground truth units are updated on a daily
                basis as needed. Approximate CPU/GPU run times are also
                reported.
              </p>
            </div>
          ) : (
            <div>
              <div className="card__header">
                <div className="card__category--div">
                  <span className="card__title--link">
                    Study:
                    <Link to={`/study/${study}`}>{study}</Link>
                  </span>
                  <span className="card__title--link">
                    Sorter:
                    <Link to="/sorters">{sorter}</Link>
                  </span>
                </div>
              </div>
              <ScatterplotContainer
                study={this.state.study}
                sorter={this.state.sorter}
                studyAnalysisResult={this.state.studyAnalysisResult}
                selectedStudyName={this.props.selectedStudyName}
                selectedSorterName={this.props.selectedSorterName}
                sliderValue={this.props.sliderValue}
                format={this.props.format}
                metric={this.props.metric}
                cardHeight={this.props.cardHeight}
                handleScatterplotClick={this.props.handleScatterplotClick}
                {...this.props}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default ScatterplotCard;
