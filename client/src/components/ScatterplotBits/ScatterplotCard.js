import React, { Component } from "react";
import ScatterplotContainer from "./ScatterplotContainer";
import { isEmpty } from "../../utils";
import { Link } from "react-router-dom";

class ScatterplotCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      study: null,
      sorter: null
    };
  }

  componentDidMount() {
    if (this.props.selectedStudySortingResult) {
      this.findStudyAndSorter();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedStudySortingResult !==
      prevProps.selectedStudySortingResult
    ) {
      this.findStudyAndSorter();
    }
  }

  findStudyAndSorter() {
    let study = this.props.studies.filter(
      study => study.name === this.props.selectedStudySortingResult.study
    );
    let sorter = this.props.sorters.filter(
      sorter => sorter.name === this.props.selectedStudySortingResult.sorter
    );
    this.setState({ study: study[0], sorter: sorter[0] });
  }

  render() {
    const study = this.props.selectedStudySortingResult
      ? this.props.selectedStudySortingResult.study
      : "";
    const sorter = this.props.selectedStudySortingResult
      ? this.props.selectedStudySortingResult.sorter
      : "";
    const loading =
      isEmpty(this.props.selectedStudySortingResult) ||
      isEmpty(this.state.study) ||
      isEmpty(this.state.sorter);
    console.log("🤩 state and props in card", this.state, this.props);
    return (
      <div className="card card--heatmap">
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
                selectedStudySortingResult={
                  this.props.selectedStudySortingResult
                }
                sliderValue={this.props.sliderValue}
                format={this.props.format}
                metric={this.props.metric}
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
