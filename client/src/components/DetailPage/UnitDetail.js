import React, { Component } from "react";
// import * as Sentry from "@sentry/browser";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";
import SpikeSpray from "./SpikeSpray";

import { Card, Col, Container, Row } from "react-bootstrap";
import loading from "../../reducers/loading";

const axios = require("axios");

class UnitDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitDetail: null,
      spikeSprayData: null,
      unitDetailLoaded: false,
      spikeSprayLoaded: false
    };
  }

  componentDidMount() {
    this.fetchUnitDetail();
  }

  componentDidUpdate(prevProps, prevState) {
    if ((this.props.studyAnalysisResult !== prevProps.studyAnalysisResult) || (this.props.unitIndex !== prevProps.unitIndex) || (this.props.sorterName !== prevProps.sorterName)) {
      this.setState({unitDetailLoaded: false});
      this.fetchUnitDetail();
    }
    else {
      if (this.state.unitDetail !== prevState.unitDetail) {
        this.setState({spikeSprayLoaded: false});
        this.fetchSpikeSpray();
      }
    }
  }

  async fetchUnitDetail() {
    let baseurl;
    if (process.env.NODE_ENV === "production") {
      baseurl = "https://spikeforestfront.herokuapp.com";
    } else {
      baseurl = "http://localhost:5000";
    }

    let unitData = this.getUnitData()
    let result = await fetchUrl(baseurl + `/api/unitdetail/${unitData.studyName}/${unitData.recordingName}/${unitData.sorterName}/${unitData.unitId}`, 3000);
    if (result)
      this.setState({unitDetail: result.unitDetail});
    else
      this.setState({unitDetail: null});
    this.setState({unitDetailLoaded: true});
  }

  async fetchSpikeSpray() {
    let udet = this.state.unitDetail;
    if (!udet) return;
    if (udet.spikeSprayUrl) {
      let data = await fetchUrl(udet.spikeSprayUrl);
      this.setState({spikeSprayData: data});
      this.setState({spikeSprayLoaded: true});
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
        studyName: sar.studyName,
        recordingName: sar.recordingNames[recind],
        sorterName: sorterName,
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
    let loading_message = null;
    if (!this.state.unitDetailLoaded) {
      loading_message = 'Loading unit detail...';
    }
    else if (!this.state.spikeSprayLoaded) {
      if (!this.state.unitDetail) {
        loading_message = 'No unit detail found.';
      }
      else {
        loading_message = 'Loading spike spray...';
      }
    }
    else {
      if (!this.state.spikeSprayData) {
        loading_message = 'No spike spray found.'
      }
    }
    return (
        <Container>
          <Row>{JSON.stringify(unitData, null, 4)}</Row>
          <Row>
            {
              (loading_message) ?
              (<span>{loading_message}</span>) :
              (<SpikeSpray spikeSprayData={this.state.spikeSprayData}></SpikeSpray>)
            }
          </Row>
        </Container>
        
    )
  }
}

const fetchUrl = async (url, timeout) => {
  try {
    const response = await axios.get(url, {timeout: timeout});
    if (response.status !== 200) {
      // Sentry.captureException(response.message);
      console.error(response.message);
      return null;
    } else {
      return response.data;
    }
  } catch (error) {
    // Sentry.captureException(error);
    console.error(error);
    return null;
  }
};

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
