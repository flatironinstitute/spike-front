import React, { Component } from "react";
import ReactTable from "react-table";

class TestRecordingsTable extends Component {
  constructor() {
    super();

    this.state = {
      tableData: [],
      expandedStudySets: [],
      expandedStudies: [],
      expandedRecordings: []
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

  handleRowClick(rowId) {
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);

    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter(id => id !== rowId)
      : currentExpandedRows.concat(rowId);

    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    const clickCallback = () => this.handleRowClick(item.id);
    const arrow = this.state.expandedRows.includes(item.id) ? "🔽" : "▶️";
    const itemRows = [
      <tr onClick={clickCallback} key={"row-data-" + item.id}>
        <td>
          {arrow} {item.date}
        </td>
        <td>{item.total}</td>
        <td>{item.status}</td>
      </tr>
    ];

    // if (this.state.expandedRows.includes(item.id)) {
    //   itemRows.push(
    //     <tr key={"row-expanded-" + item.id}>
    //       <td>{item.name}</td>
    //       <td>{item.points}</td>
    //       <td>{item.percent}</td>
    //     </tr>
    //   );
    // }

    return itemRows;
  }

  render() {
    let allItemRows = [];
    this.state.tableData.forEach(studyset => {
      const perItemRows = this.renderItem(studyset);
      allItemRows = allItemRows.concat(perItemRows);
      console.log("🔺", allItemRows);
    });

    console.log("🔺", this.state.tableData);

    return (
      <Table striped bordered hover className="recording__table">
        <thead>
          <tr>
            <td>
              <b>Study Sets</b>
            </td>
            <td>
              <b>Number of Studies</b>
            </td>
          </tr>
        </thead>
        {/* <tbody>{allItemRows}</tbody> */}
      </Table>
    );
  }
}

export default TestRecordingsTable;

// Study Set Data:
// name, studies(count) arrow
// Study Data:
// name, sorterNames(array)
// Recording Data:
// description, durationSec, name, numChannels, numTrueUnits, sampleRateHz, spikeSign
// True Units:
// DO WE WANT THESE? RIGHT NOW ITS JUST THE IDS?
