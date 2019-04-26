import React, { Component } from "react";
import { isEmpty } from "../../utils";

// Components
import Preloader from "../Preloader/Preloader";
import CPUBarChartContainer from "../CPUBarChart/CPUBarChartContainer";
import { Container } from "react-bootstrap";

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
    this.brewerColors = ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd']
  }

  componentDidMount() {
    if (!isEmpty(this.props.cpus) && !isEmpty(this.props.sorters)) {
      this.buildCPUMap();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.sorters !== prevProps.sorters ||
      this.props.cpus !== prevProps.cpus
    ) {
      this.buildCPUMap();
    }
  }

  buildCPUMap() {
    let checkboxes = this.props.sorters.map((sorter, i) => ({
      ...sorter,
      checked: true,
      color: this.brewerColors[i]
    }))
    let withColorsData = this.props.cpus.map((sorterGroup, i) => {
      let [sorterObj] = checkboxes.filter(checkbox => checkbox.name === sorterGroup._id);
      let withColorsGroup = sorterGroup.studyGroup.map(study => ({
        ...study,
        color: sorterObj.color
      }));
      sorterGroup.studyGroup = withColorsGroup;
      return sorterGroup;
    })
    this.setState({
      builtData: withColorsData,
      checkboxes: checkboxes
    });
  }

  render() {
    let loading = isEmpty(this.state.builtData) || isEmpty(this.state.checkboxes);
    return (
      <div>
        {loading ? (
          <Container>
            <Preloader />
          </Container>
        ) : (
            <CPUBarChartContainer builtData={this.state.builtData} checkboxes={this.state.checkboxes} {...this.props} />
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedStudySortingResult: state.selectedStudySortingResult,
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
