import React, { Component } from "react";
import { isEmpty } from "../../utils";

// Components
import Preloader from "../Preloader/Preloader";
import CPUBarChart from "../CPUBarChart/CPUBarChart";
import {
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup,
  Col,
  Container,
  Row
} from "react-bootstrap";

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
      builtData: [],
      sorter: "all"
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
      this.props.sliderValue !== prevProps.sliderValue ||
      this.state.sorter !== prevState.sorter
    ) {
      this.filterAndMap();
    }
  }

  filterAndMap() {
    let builtData = this.props.cpus;
    if (this.state.sorter !== "all") {
      builtData = this.props.cpus.filter(
        sorter => sorter._id === this.state.sorter
      );
    }
    this.setState({ builtData: builtData });
  }

  handleSorterChange = value => {
    this.setState({
      sorter: value
    });
  };

  render() {
    let loading = isEmpty(this.state.builtData) || isEmpty(this.props.sorters);
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
                  <div className="card__footer">
                    <ButtonToolbar>
                      <ToggleButtonGroup
                        type="radio"
                        name="options"
                        size="lg"
                        value={this.state.sorter}
                        onChange={this.handleSorterChange}
                        className="metric_button_toggle"
                      >
                        <ToggleButton
                          size="lg"
                          value={"all"}
                          variant="outline-dark"
                        >
                          All
                        </ToggleButton>
                        {this.props.sorters.map((sorter, i) => (
                          <ToggleButton
                            key={sorter._id}
                            size="lg"
                            value={sorter.name}
                            variant="outline-dark"
                          >
                            {sorter.name}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </ButtonToolbar>
                    <CPUBarChart data={this.state.builtData} {...this.props} />
                  </div>
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
