import React, { Component } from "react";
import StudySorterTable from "./StudySorterTable";
import { isEmpty } from "../../utils";

class StudySorterSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      study: null,
      sorter: null
    };
  }

  componentDidMount() {
    if (this.props.selectedStudy) {
      this.findStudyAndSorter();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedStudy !== prevProps.selectedStudy) {
      this.findStudyAndSorter();
    }
  }

  findStudyAndSorter() {
    let study = this.props.studies.filter(
      study => study.name === this.props.selectedStudy.study
    );
    let sorter = this.props.sorters.filter(
      sorter => sorter.name === this.props.selectedStudy.sorter
    );
    this.setState({ study: study[0], sorter: sorter[0] });
  }

  render() {
    const study = this.props.selectedStudy
      ? this.props.selectedStudy.study
      : "";
    const sorter = this.props.selectedStudy
      ? this.props.selectedStudy.sorter
      : "";
    const loading =
      isEmpty(this.props.selectedStudy) ||
      isEmpty(this.state.study) ||
      isEmpty(this.state.sorter);
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
              <p className="card__category">
                <br />
                📝 There is space here to add more copy. Any thoughts on what
                else I should include ?
              </p>
            </div>
          ) : (
            <div>
              <div className="card__header">
                <div className="card__category--div">
                  {/* TODO: add proper routes */}
                  <span className="card__title--link">
                    Study:
                    <a href="/study">{study}</a>
                  </span>
                  <span className="card__title--link">
                    Sorter:
                    <a href="/sorters">{sorter}</a>
                  </span>
                </div>
              </div>
              <StudySorterTable
                study={this.state.study}
                sorter={this.state.sorter}
                selectedStudy={this.props.selectedStudy}
                sliderValue={this.props.sliderValue}
                format={this.props.format}
                metric={this.state.metric}
                {...this.props}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default StudySorterSummary;
