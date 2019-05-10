import React, { Component } from "react";
// import * as Sentry from "@sentry/browser";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

class UnitDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('MOUNT: UnitDetail');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('UPDATE: UnitDetail');
  }

  render() {
    let sar = this.props.studyAnalysisResult;
    let uind = this.props.unitIndex;
    let sorterName = this.props.sorterName;
    let sortingResult = null;
    sar.sortingResults.forEach(sr => {
        if (sr.sorterName == sorterName)
            sortingResult = sr;
    });
    let recind = sar.trueRecordingIndices[uind];
    console.log('---------------------------- xxx', recind, sar.recordingNames, sar);
    let unitData = {
        recordingName: sar.recordingNames[recind],
        unitId: sar.trueUnitIds[uind],
        snr: sar.trueSnrs[uind],
        firingRate: sar.trueFiringRates[uind],
        numEvents: sar.trueNumEvents[uind],
        accuracy: sortingResult.accuracies[uind],
        precision: sortingResult.precisions[uind],
        recall: sortingResult.recalls[uind]
    }
    return (
        <div><pre>{JSON.stringify(unitData, null, 4)}</pre></div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitDetail);
