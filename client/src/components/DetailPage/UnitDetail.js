import React, { Component } from "react";
// import * as Sentry from "@sentry/browser";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";
import SpikeSpray from "./SpikeSpray";

import { Card, Col, Container, Row } from "react-bootstrap";

const axios = require("axios");

class UnitDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spikeSprayData: null
    };
  }

  componentDidMount() {
    this.fetchSpikeSpray()
  }

  componentDidUpdate(prevProps, prevState) {
  }

  async fetchSpikeSpray() {
    let unitData = this.getUnitData();
    const defaultUrl =
    "http://kbucket.flatironinstitute.org/get/sha1/0aa39927530abed94f32c410f3a2226e2ee71c5e?signature=c516794c53257b327f39b8349cc39313f1a254e9";
    let data = await fetchUrl(defaultUrl);
    this.setState({spikeSprayData: data});
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
        recordingName: sar.recordingNames[recind],
        unitId: sar.trueUnitIds[uind],
        snr: sar.trueSnrs[uind],
        firingRate: sar.trueFiringRates[uind],
        numEvents: sar.trueNumEvents[uind],
        accuracy: sortingResult.accuracies[uind],
        precision: sortingResult.precisions[uind],
        recall: sortingResult.recalls[uind]
    }
    return unitData;
  }

  render() {
    let unitData = this.getUnitData()
    return (
        <Container>
          <Col>{JSON.stringify(unitData, null, 4)}</Col>
          <Col>
            {
              this.state.spikeSprayData ?
              (<SpikeSpray spikeSprayData={this.state.spikeSprayData}></SpikeSpray>) :
              (<span>Loading spikespray...</span>)
            }
          </Col>
        </Container>
        
    )
  }
}

const fetchUrl = async url => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      // Sentry.captureException(response.message);
      console.error(response.message);
    } else {
      return response.data;
    }
  } catch (error) {
    // Sentry.captureException(error);
    console.error(error);
  }
};

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
