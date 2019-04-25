import React, { Component } from "react";
import { isEmpty } from "../../utils";
import { Form } from "react-bootstrap";

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
      builtData: [],
      checkboxes: []
    };
  }

  componentDidMount() {
    if (this.props.cpus.length) {
      this.filterCPUMap();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.cpus !== prevProps.cpus ||
      this.props.sliderValue !== prevProps.sliderValue
    ) {
      this.filterCPUMap();
    }
  }
  filterCPUMap() {
    let colorArr = ["#70D6FF", "#FF70A6", "#FF9770", "#FFD670", "#E9FF70"];
    let checkboxes = this.props.sorters.map((sorter, i) => ({
      ...sorter,
      checked: true,
      color: colorArr[i]
    }));
    let withColorsData = this.props.cpus.map((sorterGroup, i) => {
      let barColor = colorArr[i];
      let withColorStudy = sorterGroup.studyGroup.map(study => ({
        ...study,
        color: barColor
      }));
      return {
        ...sorterGroup,
        colorGroup: withColorStudy
      }
    })
    this.setState({ builtData: withColorsData, checkboxes: checkboxes });
  }

  // filterData() {
  //   let newData = [];
  //   this.state.checkboxes.forEach(checkbox => {
  //     if (checkbox.checked) {
  //       let built = this.props.cpus.find(data => data._id === checkbox.name);
  //       newData.push(built);
  //     }
  //   });
  //   let cpuFiltered = [];
  //   newData.forEach(data => {
  //     let newStudyGroup = data.colorGroup.filter(
  //       study => study.averageCPU < this.props.sliderValue
  //     );
  //     if (newStudyGroup.length) {
  //       data.colorGroup = newStudyGroup;
  //       cpuFiltered.push(data);
  //     }
  //   });
  //   this.setState({ builtData: cpuFiltered });
  // }

  handleChange(e) {
    let updatedChecks = this.state.checkboxes.map(checkbox => {
      if (checkbox._id === e.target.id) {
        checkbox.checked = !checkbox.checked;
      }
      return checkbox;
    });
    this.setState({ checkboxes: updatedChecks });
  }

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
                    <div className="card__header card__header--cpu">
                      <h4 className="card__title">Estimated CPU Time</h4>
                      <div
                        key={`inline-radio`}
                        className="card card--heatmap card--barchart"
                      >
                        <p className="card__label card__label--barchart">
                          Filter:{" "}
                        </p>
                        <Form>
                          {this.state.checkboxes.map((sorter, i) => (
                            <Form.Check
                              inline
                              label={sorter.name}
                              checked={sorter.checked}
                              type="checkbox"
                              key={sorter._id}
                              id={sorter._id}
                              style={{ borderBottom: `2px solid ${sorter.color}` }}
                              onChange={this.handleChange.bind(this)}
                            />
                          ))}
                        </Form>
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
