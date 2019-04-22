import React, { Component } from "react";
import { isEmpty } from "../../utils";
import { Form } from "react-bootstrap";

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
      sorters: []
    };
  }

  componentDidMount() {
    if (this.props.cpus && this.props.cpus.length) {
      this.filterAndMap();
    }
    this.setState({ sorters: this.props.sorters });
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
    // if (this.state.sorters.length !== this.props.sorters.length) {
    //   builtData = this.props.cpus.filter(
    //     sorter => sorter._id === this.state.sorter
    //   );
    // }
    this.setState({ builtData: builtData });
  }

  // handleSorterChange = value => {
  //   this.setState({
  //     sorter: value
  //   });
  // };

  render() {
    let loading = isEmpty(this.state.builtData) || isEmpty(this.props.sorters);
    console.log(this.state.builtData, this.state.sorters);
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
                  <div className="card__header card__header--cpu">
                    <h4 className="card__title">Estimated CPU Time</h4>
                    <div
                      key={`inline-radio`}
                      className="card__header--checkboxes"
                    >
                      {this.props.sorters.map((sorter, i) => (
                        <Form.Check
                          inline
                          label={sorter.name}
                          type="checkbox"
                          key={sorter._id}
                          id={sorter._id}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="card__footer">
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
