import React, { Component } from "react";
import { isEmpty } from "../../utils";

// Components
import { Col, Container, Row } from "react-bootstrap";
import HeatmapViz from "./HeatmapViz";
import Preloader from "../Preloader/Preloader";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

// Stylin'
import "./heatmap.css";

class HeatmapCPU2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      builtData: [],
      cardHeight: null
    };
  }

  componentDidMount() {
    if (this.props.unitsMap.length) {
      this.filterCPUMap();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.unitsMap !== prevProps.unitsMap) {
      this.filterCPUMap();
    }
  }

  filterCPUMap() {
    this.setState({ builtData: this.props.unitsMap });
  }

  handleCardHeightChange = value => {
    this.setState({
      cardHeight: value
    });
  };

  render() {
    let loading = isEmpty(this.state.builtData);
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
                <HeatmapViz
                  cpus={this.props.cpus}
                  selectStudySortingResult={this.props.selectStudySortingResult}
                  selectedStudySortingResult={
                    this.props.selectedStudySortingResult
                  }
                  groupedUnitResults={this.state.builtData}
                  studies={this.props.studies}
                  studysets={this.props.studysets}
                  format={this.props.format}
                  metric={this.props.metric}
                  threshold={this.props.sliderValue}
                  handleCardHeightChange={this.handleCardHeightChange}
                />
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
    selectedStudySortingResult: state.selectedStudySortingResult
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeatmapCPU2);
