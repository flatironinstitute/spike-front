import React, { Component } from "react";
import ScatterplotContainer from "./ScatterplotContainer";
// import { isEmpty } from "../../utils";
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
    if ((this.props.studyName) && (this.props.sorterName)) {
      this.findStudyAndSorter();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (this.props.studyName !== prevProps.studyName) ||
      (this.props.sorterName !== prevProps.sorterName)
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
      study => study.name === this.props.studyName
    );
    let sorter = this.props.sorters.filter(
      sorter => sorter.name === this.props.sorterName
    );
    let studyAnalysisResult = this.props.studyAnalysisResults.filter(
      sar => sar.studyName === this.props.studyName
    );
    this.setState({ study: study[0], sorter: sorter[0], studyAnalysisResult: studyAnalysisResult[0] });
  }

  render() {
    const study = this.props.studyName || "";
    const sorter = this.props.sorterName || "";
    const loading =
      (!this.props.studyName) ||
      (!this.props.sorterName) ||
      (!this.state.study) ||
      (!this.state.sorter) ||
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
                Click an item on the left to see a detailed scatterplot of
                sorter results
              </h4>
              {/* <p className="card__category">
                <br />
                We host a variety of experimental paired ground truth recordings
                from the community and also many in silico synthetic recordings.
                Each sorter is run on all recordings and the resulting
                accuracies for the ground truth units are updated on a daily
                basis as needed.
              </p> */}
            </div>
          ) : (
            <div>
              <div className="card__header">
                <div className="card__category--div">
                  <span className="card__title--link">
                    Study:
                    <Link to={`/studyresults/${study}`}>{study}</Link>
                  </span>
                  <span className="card__title--link">
                    Sorter:
                    <Link to="/algorithms">{sorter}</Link>
                  </span>
                </div>
              </div>
              <ScatterplotContainer
                study={this.state.study}
                sorter={this.state.sorter}
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
