import React, { Component } from "react";
import Header from "./Header";
import ReactCollapsingTable from "react-collapsing-table";
import Preloader from "./Preloader";
import { isEmpty } from "../utils";

class Recordings extends Component {
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
        label: "Number of recordings",
        priorityLevel: 3,
        position: 3,
        minWidth: 100
      },
      {
        accessor: "filesize",
        label: "Total file size",
        priorityLevel: 4,
        position: 4,
        minWidth: 100
      },
      {
        accessor: "channels",
        label: "Channels",
        priorityLevel: 5,
        position: 5,
        minWidth: 100
      },
      {
        accessor: "duration",
        label: "Duration (in seconds)",
        priorityLevel: 6,
        position: 6,
        minWidth: 100
      },
      {
        accessor: "type",
        label: "Experiment type (synthetic / in vivo / in vitro)",
        priorityLevel: 7,
        position: 7,
        minWidth: 100
      },
      {
        accessor: "probetype",
        label: "Probe type",
        priorityLevel: 8,
        position: 8,
        minWidth: 100
      },
      {
        accessor: "region",
        label: "Brain region",
        priorityLevel: 9,
        position: 9,
        minWidth: 100
      },
      {
        accessor: "groundtruth",
        label: "Groundtruth units",
        priorityLevel: 10,
        position: 10,
        minWidth: 100
      },
      {
        accessor: "description",
        label: "Description",
        priorityLevel: 11,
        position: 11,
        minWidth: 100
      }
    ];
    const recordingColumns = [
      {
        accessor: "name",
        label: "Recording Name",
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
        accessor: "description",
        label: "Description",
        priorityLevel: 3,
        position: 3,
        minWidth: 100
      }
    ];
    let loading = isEmpty(this.props.studies) || isEmpty(this.props.recordings);
    return (
      <div>
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          {loading ? (
            <Preloader />
          ) : (
            <div>
              <div className="recordings">
                <h3 className="recordings__title">Studies</h3>
                <p>
                  A study is a collection of recordings. Sorting results may be
                  aggregated over a study.
                </p>
                <ReactCollapsingTable
                  showPagination={true}
                  rows={this.props.studies}
                  columns={studyColumns}
                  rowSize={15}
                />
              </div>
              <div className="recordings">
                <h3 className="recordings__title">Recordings</h3>
                <ReactCollapsingTable
                  showPagination={true}
                  rows={this.props.recordings}
                  columns={recordingColumns}
                  rowSize={15}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Recordings;
