import React, { Component } from "react";
// import * as Sentry from "@sentry/browser";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";
import SpikeSpray from "./SpikeSpray";

import { Container, Row } from "react-bootstrap";
// import loading from "../../reducers/loading";

// const axios = require("axios");

class UnitDetail extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    let unitData = this.getUnitData();
    this.props.fetchUnitDetail(unitData.studyName, unitData.recordingName, unitData.sorterName, unitData.unitId);
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.studyAnalysisResult !== prevProps.studyAnalysisResult) || (this.props.unitIndex !== prevProps.unitIndex) || (this.props.sorterName !== prevProps.sorterName)) {
      let unitData = this.getUnitData();
      this.props.fetchUnitDetail(unitData.studyName, unitData.recordingName, unitData.sorterName, unitData.unitId);
    }
  }

  getUnitData() {
    let sar = this.props.studyAnalysisResult;
    let uind = this.props.unitIndex;
    let sorterName = this.props.sorterName;
    let sortingResult = null;
    sar.sortingResults.forEach(sr => {
        if (sr.sorterName === sorterName)
            sortingResult = sr;
    });
    let recind = sar.trueRecordingIndices[uind];
    let unitData = {
        udpath: `${sar.studyName}/${sar.recordingNames[recind]}/${sorterName}/${sar.trueUnitIds[uind]}`,
        studyName: sar.studyName,
        recordingName: sar.recordingNames[recind],
        sorterName: sorterName,
        unitId: sar.trueUnitIds[uind],
        snr: sar.trueSnrs[uind],
        firingRate: sar.trueFiringRates[uind],
        numEvents: sar.trueNumEvents[uind],
        accuracy: sortingResult.accuracies[uind],
        precision: sortingResult.precisions[uind],
        numMatches: sortingResult.numMatches[uind],
        numFalsePositives: sortingResult.numFalsePositives[uind],
        numFalseNegatives: sortingResult.numFalseNegatives[uind],
        recall: sortingResult.recalls[uind]
    }
    return unitData;
  }

  render() {
    let unitData = this.getUnitData()
    let udpath = unitData.udpath;
    let loading_message = null;
    if (!this.props.unitDetail) {
      loading_message = 'Loading unit detail...';
    }
    else if (!this.props.unitDetail[udpath]) {
      loading_message = 'Loading unit detail......';
    }
    else {
      if (!this.props.unitDetail[udpath].spikeSprayUrl) {
        loading_message = 'No spike spray found.'
      }
      else if (!this.props.unitDetail[udpath].spikeSprayData) {
        loading_message = 'No spike spray data found.'
      }
    }
    return (
        <Container>
          {/* <Row>{JSON.stringify(unitData, null, 4)}</Row> */}
          <Row>
            {
              (loading_message) ?
              (<span>{loading_message}</span>) :
              (<SpikeSpray spikeSprayData={this.props.unitDetail[udpath].spikeSprayData} numMatches={unitData.numMatches} numFalsePositives={unitData.numFalsePositives} numFalseNegatives={unitData.numFalseNegatives}></SpikeSpray>)
            }
          </Row>
        </Container>
        
    )
  }
}

function mapStateToProps(state) {
  return {
    unitDetail: state.unitDetail
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitDetail);
