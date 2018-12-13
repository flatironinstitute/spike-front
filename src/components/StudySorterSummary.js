import React, { Component } from "react";
import StudySorterTable from "./StudySorterTable";
import { isEmpty } from "../utils";

class StudySorterSummary extends Component {
  render() {
    const { selectedStudy, accuracy } = this.props;
    const loading = isEmpty(selectedStudy);
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
              selectedStudy={selectedStudy}
              accuracy={accuracy}
            />
          )}
        </div>
      </div>
    );
  }
}
export default StudySorterSummary;
