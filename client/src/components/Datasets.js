import React, { Component } from "react";
import Header from "./Header";
import ReactCollapsingTable from "react-collapsing-table";

class Datasets extends Component {
  render() {
    const studyColumns = [
      {
        accessor: "name",
        label: "Study Name",
        priorityLevel: 1,
        position: 1,
        minWidth: 150,
        sortable: true
      },
      {
        accessor: "description",
        label: "Description",
        priorityLevel: 2,
        position: 2,
        minWidth: 300
      }
    ];
    const datasetColumns = [
      {
        accessor: "name",
        label: "Dataset Name",
        priorityLevel: 1,
        position: 1,
        minWidth: 150,
        sortable: true
      },
      {
        accessor: "study",
        label: "Study",
        priorityLevel: 2,
        position: 2,
        minWidth: 150
      },
      {
        accessor: "computed_info",
        label: "Computed Info",
        priorityLevel: 3,
        position: 3,
        minWidth: 150
      }
    ];
    // TODO: remove console log
    console.log("Studies", this.props.studies);
    console.log("Datasets", this.props.datasets);
    return (
      <div className="container container--body">
        <Header headerCopy={this.props.header} />
        <div className="datasets">
          <h3 className="datasets--title">Study Sets</h3>
          <p />
        </div>
        <div className="datasets">
          <h3 className="datasets--title">Studies</h3>
          <ReactCollapsingTable
            showPagination={true}
            rows={this.props.studies}
            columns={studyColumns}
          />
        </div>
        <div className="datasets">
          <h3 className="datasets--title">Datasets</h3>
          {this.props.datasets.map((set, i) => (
            <p key={i}>{set.name}</p>
          ))}
        </div>
      </div>
    );
  }
}
export default Datasets;
