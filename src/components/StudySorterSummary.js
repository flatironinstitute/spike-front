import React, { Component } from "react";
import StudySorterTable from "./StudySorterTable";

class StudySorterSummary extends Component {
  render() {
    const selectedNode = this.props.selectedNode[0][0];
    return (
      <div className="unitdetail__container">
        <h4 className="unitdetail__title">Detail View</h4>
        <div className="unitdetail__copy">
          <div className="tab-header__row">
            <div className="tab-header__bundle">
              <a href="/study">
                <b>Sorter: </b>
                {selectedNode.sorter}
              </a>
            </div>
            <div className="tab-header__bundle">
              <a href="/study">
                <b>Study: </b>
                {selectedNode.study}
              </a>
            </div>
          </div>
          <StudySorterTable selectedNode={selectedNode} />
        </div>
      </div>
    );
  }
}
export default StudySorterSummary;
