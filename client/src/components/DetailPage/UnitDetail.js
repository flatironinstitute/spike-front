import React, { Component } from "react";
// import * as Sentry from "@sentry/browser";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";
import SpikeSpray from "./SpikeSpray";

import { Container, Row } from "react-bootstrap";
// import loading from "../../reducers/loading";

const axios = require("axios");

const stable_stringify = require("json-stable-stringify");
const crypto = require("crypto");

class UnitDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spikeSprayStatus: null,
      spikeSprayData: null,
      spikeSprayLoadingCode: 0
    };
  }

  async componentDidMount() {
    await this.updateSpikeSpray();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.props.studyAnalysisResult !== prevProps.studyAnalysisResult ||
      this.props.unitIndex !== prevProps.unitIndex ||
      this.props.sorterName !== prevProps.sorterName
    ) {
      await this.updateSpikeSpray();
    }
  }

  async updateSpikeSpray() {
    let loadingCode = this.state.spikeSprayLoadingCode + 1;
    this.setState({
      spikeSprayStatus: "loading spike spray...",
      spikeSprayLoadingCode: loadingCode,
      spikeSprayData: null
    });
    let unitData = this.getUnitData();
    let sr = unitData.sortingResult;
    if (!sr) {
      this.setState({ spikeSprayStatus: "Unable to find unit data" });
      return;
    }
    let key0 = {
      name: "unit-details-v0.1.0",
      recording_directory: sr.recordingDirectory,
      firings_true: sr.firingsTrue,
      firings: sr.firings
    };
    let obj = await this.loadObject(null, {
      collection: "spikeforest",
      key: key0
    });
    if (this.state.spikeSprayLoadingCode !== loadingCode) return;
    if (!obj) {
      this.setState({ spikeSprayStatus: "Spike spray not found." });
      return;
    }
    let foundUnitDetail = null;
    for (let ud of obj) {
      if (ud.trueUnitId === unitData.unitId) {
        foundUnitDetail = ud;
      }
    }
    if (!foundUnitDetail) {
      this.setState({
        spikeSprayStatus: "Unable to find spike spray for this unit."
      });
      return;
    }
    if (!foundUnitDetail.spikeSprayUrl) {
      this.setState({ spikeSprayStatus: "No spike spray for this unit." });
      return;
    }
    let data0 = await this.loadObject(foundUnitDetail.spikeSprayUrl);
    if (this.state.spikeSprayLoadingCode !== loadingCode) return;
    if (!data0) {
      this.setState({ spikeSprayStatus: "Problem loading spike spray data." });
      return;
    }
    this.setState({
      spikeSprayStatus: "found",
      spikeSprayData: data0
    });
  }

  async loadObject(path, opts) {
    if (!path) {
      if (opts.key && opts.collection) {
        path = `key://pairio/${opts.collection}/~${hash_of_key(opts.key)}`;
      }
    }
    let response;
    try {
      response = await axios.get(
        `/api/loadObject?path=${encodeURIComponent(path)}`
      );
    } catch (err) {
      return null;
    }
    let rr = response.data;
    if (rr.success) {
      return rr.object;
    } else return null;
  }

  getUnitData() {
    let sar = this.props.studyAnalysisResult;
    let uind = this.props.unitIndex;
    let sorterName = this.props.sorterName;
    let sortingResult = null;
    sar.sortingResults.forEach(sr => {
      if (sr.sorterName === sorterName) sortingResult = sr;
    });
    let recind = sar.trueRecordingIndices[uind];
    let recordingName = sar.recordingNames[recind];

    let sortingResult2 = null;
    if (this.props.sortingResults) {
      this.props.sortingResults.forEach(sr => {
        if (
          sr.studyName === sar.studyName &&
          sr.recordingName === recordingName &&
          sr.sorterName === sorterName
        ) {
          sortingResult2 = sr;
        }
      });
    }
    let unitData = {
      udpath: `${sar.studyName}/${sar.recordingNames[recind]}/${sorterName}/${
        sar.trueUnitIds[uind]
      }`,
      studyName: sar.studyName,
      recordingName: recordingName,
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
      recall: sortingResult.recalls[uind],
      sortingResult: sortingResult2
    };
    return unitData;
  }

  render() {
    let unitData = this.getUnitData();
    return (
      <Container>
        <Row>
          {!this.state.spikeSprayData ? (
            <span>{this.state.spikeSprayStatus || "----"}</span>
          ) : (
            <SpikeSpray
              spikeSprayData={this.state.spikeSprayData}
              numMatches={unitData.numMatches}
              numFalsePositives={unitData.numFalsePositives}
              numFalseNegatives={unitData.numFalseNegatives}
            />
          )}
        </Row>
      </Container>
    );
  }
}

function hash_of_string(key) {
  // creating hash object
  let hash = crypto.createHash("sha1");
  let data = hash.update(key, "utf-8");
  return data.digest("hex");
}

function hash_of_key(key) {
  if (typeof key == "string") {
    return hash_of_string(key);
  } else {
    return hash_of_string(stable_stringify(key));
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
