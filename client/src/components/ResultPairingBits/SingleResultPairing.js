import React, { Component } from "react";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

// import pairing from "../../data/stubData/pairing_sample";

// import spikeforestwidgets from "./SpikeforestWidgets";

// http://localhost:3000/pairing/magland-synth-noise10-K10-C4/MountainSort4-thr3

// Individual Study Page:
// Description of the Study just copy

// Pairing Page -> Study Results Page
// Links to the other sorters on the study (button row)
// Row of the heatmap with toolbar from heatmap
// Scatterplot
// spike sprays from each unit on click (// Channels as a separate row)
// Table of data on each unit

class SingleResultPairing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pairing: []
    };
  }

  componentDidMount() {
    this.props.fetchPairing();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedPairing !== prevProps.selectedPairing) {
      console.log("🍐", this.props.selectedPairing);
    }
  }

  render() {
    return (
      <div>
        <div className="container container__body">
          <div className="header">
            <h2 className="header__title">
              magland-synth-noise10-K10-C4{" "}
              <span role="img" aria-label="pear">
                🍐
              </span>{" "}
              MountainSort4-thr3
            </h2>
            <div className="header__copy" id="widget1">
              {/* <p>
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
              <p>Groundtruth Units: true</p> */}
            </div>
          </div>
          <div className="recordings">
            <h3 className="recordings__title">Recordings</h3>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedPairing: state.pairing
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleResultPairing);
