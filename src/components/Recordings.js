import React, { Component } from "react";
import Header from "./Header";
import Error from "./Error";
import ReactCollapsingTable from "react-collapsing-table";

class Recordings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordings: [],
      studies: [],
      errors: []
    };
  }

  componentDidMount() {
    this.getStudiesProcessed();
  }
  // TODO: Move this into a data handling JS file?
  getStudiesProcessed = () => {
    fetch("/api/getStudiesProcessed")
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          recordings: json.recordings,
          studies: json.studies,
          errors: []
        });
      })
      .catch(err => {
        this.setState({
          errors: [
            ...this.state.errors,
            "🤦‍ spikeforest_studies_processed failed to load"
          ]
        });
      });
  };
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
      <div>
        {this.state.errors.length ? <Error errors={this.state.errors} /> : null}
        <div className="container container__body">
          <Header headerCopy={this.props.header} />
          <div className="recordings">
            <h3 className="recordings__title">Study Sets</h3>
            <ul>
              <li>bionet</li>
              <li>magland_synth</li>
              <li>boyden</li>
              <li>kampff</li>
              <li>mea256yger</li>
            </ul>
          </div>
          <div className="recordings">
            <h3 className="recordings__title">Studies</h3>
            <p>
              A study is defined as a group of recordings whose accuracy results
              it is meaningful to aggregate together.
            </p>
            <ReactCollapsingTable
              showPagination={true}
              rows={this.state.studies}
              columns={studyColumns}
              rowSize={15}
            />
          </div>
          <div className="recordings">
            <h3 className="recordings__title">Recordings</h3>
            <ReactCollapsingTable
              showPagination={true}
              rows={this.state.recordings}
              columns={datasetColumns}
              rowSize={15}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Recordings;
