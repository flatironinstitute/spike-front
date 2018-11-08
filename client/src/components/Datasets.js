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
        minWidth: 100,
        sortable: true
      },
      {
        accessor: "number",
        label: "Number of Datasets",
        priorityLevel: 3,
        position: 3,
        minWidth: 100
      },
      {
        accessor: "description",
        label: "Description",
        priorityLevel: 2,
        position: 2,
        minWidth: 100
      }
    ];
    const datasetColumns = [
      {
        accessor: "name",
        label: "Dataset Name",
        priorityLevel: 1,
        position: 1,
        minWidth: 100,
        sortable: true
      },
      {
        accessor: "study",
        label: "Study",
        priorityLevel: 2,
        position: 2,
        minWidth: 100
      },
      {
        accessor: "computed_info.duration_sec",
        label: "Duration Seconds",
        priorityLevel: 3,
        position: 3,
        minWidth: 100
      }
    ];
    return (
      <div className="container container--body">
        <Header headerCopy={this.props.header} />
        <div className="datasets">
          <h3 className="datasets--title">Study Sets</h3>
          <ul>
            <li>bionet</li>
            <li>magland_synth</li>
            <li>boyden</li>
            <li>kampff</li>
            <li>mea256yger</li>
          </ul>
        </div>
        <div className="datasets">
          <h3 className="datasets--title">Studies</h3>
          <ReactCollapsingTable
            showPagination={true}
            rows={this.props.studies}
            columns={studyColumns}
            rowSize={15}
          />
        </div>
        <div className="datasets">
          <h3 className="datasets--title">Datasets</h3>
          <ReactCollapsingTable
            showPagination={true}
            rows={this.props.datasets}
            columns={datasetColumns}
            rowSize={15}
          />
        </div>
      </div>
    );
  }
}
export default Datasets;
