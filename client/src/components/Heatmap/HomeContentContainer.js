import React, { Component } from "react";
import HeatmapCount from "./HeatmapCount";
import HeatmapOptionsRow from "./HeatmapOptionsRow";
import { isMobile } from "react-device-detect";
import { Container, Card } from "react-bootstrap";

import "react-rangeslider/lib/index.css";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

class HomeContentContainer extends Component {
  handleFormatChange = format => {
    this.props.setFormat(format);
  };

  handleMetricChange = metric => {
    this.props.setMetric(metric);
  };

  handleImputeMissingValuesChange = val => {
    this.props.setImputeMissingValues(val);
  };

  handleSliderChange = value => {
    let round = Math.round(value * 100) / 100;
    this.props.setSliderValue(this.props.format, round);
  };

  render() {
    return (
      <div>
        {isMobile ? (
          <Container
            className="container__heatmap"
            style={{ paddingTop: "7.2rem" }}
          >
            <Card>
              <Card.Body>
                <div className="info">
                  <h5>Mobile Notice</h5>
                  This SpikeForest content is not available for viewing on a
                  mobile device. Please visit again from a laptop or desktop
                  computer. Thank you.
                </div>
              </Card.Body>
            </Card>
          </Container>
        ) : (
          <div>
            <HeatmapOptionsRow
              handleFormatChange={this.handleFormatChange}
              handleSliderChange={this.handleSliderChange}
              handleMetricChange={this.handleMetricChange}
              handleImputeMissingValuesChange={this.handleImputeMissingValuesChange}
              format={this.props.format}
              metric={this.props.metric}
              imputeMissingValues={this.props.imputeMissingValues}
              sliderValue={this.props.sliderValue[this.props.format]}
              showCPU={true}
            />
            {this.props.format ? (
              <HeatmapCount
                {...this.props}
                format={this.props.format}
                metric={this.props.metric}
                imputeMissingValues={this.props.imputeMissingValues}
                imputeMissingValues={this.props.imputeMissingValues}
                sliderValue={this.props.sliderValue[this.props.format]}
              />
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    format: state.format,
    sliderValue: state.sliderValue,
    metric: state.metric,
    imputeMissingValues: state.imputeMissingValues
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContentContainer);
