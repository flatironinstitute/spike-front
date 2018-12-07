import React, { Component } from "react";
import ReactCollapsingTable from "react-collapsing-table";

class StudySorterSummary extends Component {
  render() {
    const selectedNode = this.props.selectedNode[0][0];
    console.log(selectedNode);
    const trueUnitColumns = [
      {
        accessor: "recording",
        label: "Recording Name",
        priorityLevel: 1,
        position: 1,
        minWidth: 100,
        sortable: true
      },
      {
        accessor: "unit_id",
        label: "Unit ID",
        priorityLevel: 2,
        position: 2,
        minWidth: 100
      },
      {
        accessor: "accuracy",
        label: "Accuracy",
        priorityLevel: 3,
        position: 3,
        minWidth: 100,
        sortable: true
      },
      {
        accessor: "snr",
        label: "SNR",
        priorityLevel: 4,
        position: 4,
        minWidth: 100,
        sortable: true
      },
      {
        accessor: "firing_rate",
        label: "Firing Rate",
        priorityLevel: 5,
        position: 5,
        minWidth: 100
      },
      {
        accessor: "num_events",
        label: "# Events",
        priorityLevel: 6,
        position: 6,
        minWidth: 100
      },
      {
        accessor: "peak_channel",
        label: "Peak Channel",
        priorityLevel: 7,
        position: 7,
        minWidth: 100
      }
    ];
    return (
      <div className="unitdetail__container">
        <h4 className="unitdetail__title">Detail View</h4>
        <div className="unitdetail__copy">
          <p>These links might become buttons</p>
          <p>
            Sorter:{selectedNode.sorter}
            <a className="button button-primary" href="/study">
              View Sorter
            </a>
          </p>
          <p>
            Study:{selectedNode.study}
            <a className="button button-primary" href="/study">
              View Study
            </a>
          </p>
          {/* <ReactCollapsingTable
            showPagination={false}
            rows={selectedNode.true_units}
            columns={trueUnitColumns}
          /> */}
          <h4 className="unitdetail__title">
            I am where a scatter plot of sorting_results would live
          </h4>
        </div>
      </div>
    );
  }
}
export default StudySorterSummary;
