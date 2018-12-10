import React, { Component } from "react";
import ReactCollapsingTable from "react-collapsing-table";

class SingleStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studies: [],
      errors: []
    };
  }

  render() {
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
    return (
      <div>
        <div className="container container__body">
          <div className="header">
            <h2 className="header__title">Bionet Drift</h2>
            <div className="header__copy">
              <p>
                Some text about the study overall. A study is a collection of
                recordings. Sorting results may be aggregated over a study.Doggo
                ipsum stop it fren you are doin me a concern. Thicc doggorino
                borkf long bois, floofs big ol extremely cuuuuuute.
              </p>
              <p>
                Citation: Gratiy, Sergey L et al. “BioNet: A Python interface to
                NEURON for modeling large-scale networks” PloS one vol. 13,8
                e0201630. 2 Aug. 2018, doi:10.1371/journal.pone.0201630
              </p>
              <p>
                Authors: Mario Speedwagon, Petey Cruiser, Anna Sthesia, Paul
                Molive, and Anna Mull.
              </p>
              <p>Lab: Allen Institute, Seattle, WA.</p>
              <p>Number of Recordings: 1234</p>
              <p>Total File Size: 1234GB</p>
              <p>Duration: 1234 seconds</p>
              <p>Experiment: synthetic ( IN VIVO / IN VITRO)</p>
              <p>Probe Type: tetrode</p>
              <p>Brain Region: occipital lobe</p>
              <p>Groundtruth Units: true</p>
            </div>
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
      </div>
    );
  }
}
export default SingleStudy;
