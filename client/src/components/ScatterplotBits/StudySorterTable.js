import React, { Component } from "react";
import Scatterplot from "./Scatterplot";

class StudySorterTable extends Component {
  render() {
    const { selectedStudy, accuracy, metric } = this.props;
    return (
      <div>
        <p>
          Items above threshold:
          {selectedStudy ? selectedStudy.in_range : ""}
        </p>
        <Scatterplot
          {...this.props}
          selectedUnits={selectedStudy.true_units}
          accuracy={accuracy}
          metric={metric}
        />
      </div>
    );
  }
}
export default StudySorterTable;
