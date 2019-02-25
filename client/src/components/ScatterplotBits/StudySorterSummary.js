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
        <div className="detail__column">
          {loading ? (
            <h4 className="unitdetail__title">Click a box to select</h4>
          ) : (
            <StudySorterTable
              study={this.state.study}
              sorter={this.state.sorter}
              selectedStudy={this.props.selectedStudy}
              sliderValue={this.props.accuracy}
              format={this.props.format}
              metric={this.state.metric}
              {...this.props}
            />
          )}
        </div>
      </div>
    );
  }
}
export default StudySorterSummary;
