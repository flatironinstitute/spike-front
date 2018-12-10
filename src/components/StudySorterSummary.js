import React, { Component } from "react";
import StudySorterTable from "./StudySorterTable";

class StudySorterSummary extends Component {
  render() {
    const selectedNode = this.props.selectedNode[0][0];
    return (
      <div className="unitdetail__container">
        <h4 className="unitdetail__title">Detail View</h4>
        <div className="unitdetail__copy">
          <p>Some nice thoughts on this study/sorter pair</p>
          <StudySorterTable selectedNode={selectedNode} />
        </div>
      </div>
    );
  }
}
export default StudySorterSummary;
