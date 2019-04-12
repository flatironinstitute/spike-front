import React, { Component } from "react";
import Preloader from "../Preloader/Preloader";
import ReactTable from "react-table";
import { isEmpty } from "../../utils";

import "react-table/react-table.css";

class RecordingsTable extends Component {
  constructor() {
    super();
    this.state = {
      tableData: []
    };
  }

  componentDidMount() {
    if (this.props.groupedRecordings) {
      this.formatFlatData(this.props.groupedRecordings);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.groupedRecordings !== this.props.groupedRecordings) {
      this.formatFlatData(this.props.groupedRecordings);
    }
  }

  formatFlatData(recordings) {
    let mapped = Object.keys(recordings);
    let grArr = [];
    mapped.forEach((map, i) => {
      let obj = {};
      obj.id = i + "-" + map;
      obj.name = map;
      obj.studies = recordings[map];
      grArr.push(obj);
    });
    this.setState({ tableData: grArr });
  }

  render() {
    console.log("🔺", this.state.tableData);
    let loading = isEmpty(this.state.tableData);

    const columns = [
      {
        Header: "Study Set",
        accessor: "name" // String-based value accessors!
      },
      {
        Header: "Number of Studies",
        accessor: "studies.length"
      }
    ];
    return (
      <div>
        {loading ? (
          <Preloader />
        ) : (
          <div className="recording__table">
            <ReactTable data={this.state.tableData} columns={columns} />
          </div>
        )}
      </div>
    );
  }
}

export default RecordingsTable;

// Study Set Data:
// name, studies(count) arrow
// Study Data:
// name, sorterNames(array)
// Recording Data:
// description, durationSec, name, numChannels, numTrueUnits, sampleRateHz, spikeSign
// True Units:
// DO WE WANT THESE? RIGHT NOW ITS JUST THE IDS?
