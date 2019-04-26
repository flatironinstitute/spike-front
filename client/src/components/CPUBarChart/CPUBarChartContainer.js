import React, { Component } from "react";
import { isEmpty } from "../../utils";
import { Form } from "react-bootstrap";

// Components
import Preloader from "../Preloader/Preloader";
import CPUBarChart from "../CPUBarChart/CPUBarChart";
import { Col, Container, Row } from "react-bootstrap";

// Stylin'
import "./barchart.css";

class CPUBarChartContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      checkboxes: []
    };
  }

  componentDidMount() {
    this.setInitialCheckboxes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.sliderValue !== prevProps.sliderValue ||
      this.state.checkboxes !== prevState.checkboxes
    ) {
      this.filterData();
    }
  }

  setInitialCheckboxes() {
    let alphaboxes = this.props.checkboxes.sort((a, b) => a.name.localeCompare(b.name));
    this.setState({
      checkboxes: alphaboxes
    });
  }

  filterData() {
    let checkboxFiltered = [];
    this.state.checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        // Use props builtData to avoid losing toggled sorter data
        let built = this.props.builtData.find(data => data._id === checkbox.name);
        checkboxFiltered.push(built);
      }
    });
    let maxCPUFiltered = [];
    checkboxFiltered.forEach(data => {
      let newStudyGroup = data.studyGroup.filter(
        study => study.averageCPU < this.props.sliderValue
      );
      if (newStudyGroup.length) {
        data.studyGroup = newStudyGroup;
        maxCPUFiltered.push(data);
      }
    });
    this.setState({
      filteredData: maxCPUFiltered
    });
  }

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
    let loading = isEmpty(this.state.filteredData) || isEmpty(this.state.checkboxes);
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
                      <CPUBarChart data={this.state.filteredData} {...this.props} />
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

export default CPUBarChartContainer;
