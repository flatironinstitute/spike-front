import React, { Component } from "react";
import { isEmpty } from "../../utils";

// Components
import Preloader from "../Preloader/Preloader";
import CPUBarChart from "../CPUBarChart/CPUBarChart";
import { Col, Container, Row } from "react-bootstrap";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

// Stylin'
import "./heatmap.css";

class HeatmapCPU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      builtData: []
    };
  }

  componentDidMount() {
    if (this.props.cpus && this.props.cpus.length) {
      this.filterAndMap();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.cpus !== prevProps.cpus ||
      this.props.sliderValue !== prevProps.sliderValue
    ) {
      this.filterAndMap();
    }
  }

  filterAndMap() {
    this.setState({ builtData: this.props.cpus });
  }

  render() {
    let loading = isEmpty(this.state.builtData) || isEmpty(this.props.sorters);
    console.log("🦓", loading, this.props);
    return (
      <div>
        {loading ? (
          <Container>
            <Preloader />
          </Container>
        ) : (
          <Container className="container__heatmap">
            <Row className="container__heatmap--row">
              <Col lg={12} sm={12}>
                <div className="card card--heatmap">
                  <div className="card__header">
                    <h4 className="card__title">Estimated CPU Time</h4>
                  </div>
                  <CPUBarChart data={this.state.builtData} {...this.props} />
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedStudy: state.selectedStudy,
    selectedRecording: state.selectedRecording
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeatmapCPU);
