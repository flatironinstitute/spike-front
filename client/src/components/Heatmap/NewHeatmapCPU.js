import React, { Component } from "react";
import { isEmpty } from "../../utils";

// Components
import Preloader from "../Preloader/Preloader";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import NewHeatmapViz from "./NewHeatmapViz";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

// Stylin'
import "./heatmap.css";

class NewHeatmapCPU extends Component {
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
    let loading = isEmpty(this.state.builtData);
    console.log("🦓heatmap cpu state", this.state);
    return (
      <div>
        {loading ? (
          <Container>
            <Preloader />
          </Container>
        ) : (
          <Jumbotron fluid>
            <Container fluid>
              <Row fluid>
                <Col lg={12} sm={12}>
                  <NewHeatmapViz
                    {...this.props}
                    filteredData={this.state.builtData}
                    sorters={this.props.shortSorters}
                    format={this.props.format}
                    metric={this.props.metric}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={12} sm={12}>
                  <h2>Scatterplot</h2>
                  {/* <ScatterplotCard
                    {...this.props}
                    sliderValue={this.props.snrMin}
                  /> */}
                </Col>
              </Row>
            </Container>
          </Jumbotron>
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
)(NewHeatmapCPU);
