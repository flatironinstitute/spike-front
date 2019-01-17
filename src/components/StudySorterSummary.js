import React, { Component } from "react";
import StudySorterTable from "./StudySorterTable";
import { isEmpty } from "../utils";

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
    const { selectedStudy, accuracy } = this.props;
    const loading =
      isEmpty(selectedStudy) ||
      isEmpty(this.state.study) ||
      isEmpty(this.state.sorter);
    return (
      <div className="unitdetail__container">
        <h4 className="unitdetail__title">Detail View</h4>
        <div className="unitdetail__copy">
          <div className="tab-header__row">
            <div className="tab-header__bundle">
              <a href="/study">
                <b>Sorter: </b>
                {selectedStudy ? selectedStudy.sorter : ""}
              </a>
            </div>
            <div className="tab-header__bundle">
              <a href="/study">
                <b>Study: </b>
                {selectedStudy ? selectedStudy.study : ""}
              </a>
            </div>
          </div>
          {loading ? (
            <h4 className="unitdetail__title">Click a box to select</h4>
          ) : (
            <StudySorterTable
              study={this.state.study}
              sorter={this.state.sorter}
              selectedStudy={selectedStudy}
              accuracy={accuracy}
              {...this.props}
            />
          )}
        </div>
      </div>
    );
  }
}
export default StudySorterSummary;
