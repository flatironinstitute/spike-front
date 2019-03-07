import React, { Component } from "react";
import { isEmpty } from "../../utils";

// Components
import Preloader from "../Preloader/Preloader";
import Container from "react-bootstrap/Container";
// import HeatmapViz from "./HeatmapViz";
// import ScatterplotCard from "../ScatterplotBits/ScatterplotCard";
// import { ContinuousColorLegend } from "react-vis";
// import Row from "react-bootstrap/Row";

// Redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actionCreators";

// Stylin'
import "./heatmap.css";

// TODO: re-incorporate legend
// <Row>
//   <div className="heatmap__legend">
//     <ContinuousColorLegend
//       width={580}
//       startColor={"#fafafd"}
//       endColor={"#384ca2"}
//       startTitle={"Lowest Average Accuracy"}
//       endTitle={"Highest Average Accuracy"}
//       height={20}
//     />
//   </div>
// </Row>

class HeatmapCPU extends Component {
  constructor(props) {
    super(props);
    this.state = {
      builtData: [],
      cpuMax: 5
    };
  }

  componentDidMount() {
    if (this.props.unitsMap.length) {
      this.filterSNRMap();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.unitsMap !== prevProps.unitsMap ||
      this.props.cpuMax !== prevProps.cpuMax
    ) {
      this.filterSNRMap();
    }
  }

  // Average functions for 'Average accuracy of groundtruth units above SNR threshold'
  filterSNR(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let accs = [];
      sorter.true_units.forEach(unit => {
        if (unit.snr > this.props.cpuMax) {
          accs.push(unit.accuracy);
        }
      });
      let aboveAvg = 0;
      if (accs.length) {
        let sum = accs.reduce((a, b) => a + b);
        aboveAvg = sum / accs.length;
      }
      // This just prints the output to 2 digits
      sorter.in_range = Math.round(aboveAvg * 100) / 100;
      sorter.color = Math.round(aboveAvg * 100) / 100;
      return sorter;
    });
    return newArr;
  }

  filterSNRMap() {
    let built = this.props.unitsMap.map(study => {
      let values = Object.values(study)[0];
      let key = Object.keys(study)[0];
      let filtered = this.filterSNR(values);
      return { [key]: filtered };
    });
    this.setState({ builtData: built });
  }

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
            <div className="card card--heatmap text-center">
              <h2>Coming Soon</h2>
              <img
                className="card__image"
                width="480"
                height="363"
                src="https://media.giphy.com/media/3o72FkiKGMGauydfyg/giphy.gif"
                alt="gif"
              />
              {/* <div className="scrollyteller__container">
                <HeatmapViz
                  {...this.props}
                  filteredData={this.state.builtData}
                  sorters={this.props.shortSorters}
                  format={this.props.format}
                />
                {this.props.selectedStudy ? (
                  <ScatterplotCard
                    {...this.props}
                    accuracy={this.props.cpuMax}
                  />
                ) : (
                  <div />
                )}
              </div> */}
            </div>
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
