import React, { Component } from "react";
import HeatmapViz from "./HeatmapViz";
import { isEmpty } from "../utils";
import Preloader from "./Preloader";
import StudySorterSummary from "./StudySorterSummary";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";
import { formatToNDigits } from "../utils.js";

class HeatmapAverage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: Change this to accuracy filtered data
      builtData: [],
      snrMin: 5
    };
  }

  componentDidMount() {
    if (this.props.unitsMap.length) {
      this.filterSNRMap();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.unitsMap !== prevProps.unitsMap ||
      this.state.snrMin !== prevState.snrMin
    ) {
      this.filterSNRMap();
    }
  }

  filterAccuracy(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let accs = [];
      sorter.true_units.forEach(unit => {
        if (unit.snr > this.state.snrMin) {
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
      let filtered = this.filterAccuracy(values);
      return { [key]: filtered };
    });
    this.setState({ builtData: built });
  }

  handleAccuracyChange = value => {
    this.setState({
      snrMin: value
    });
  };

  render() {
    let loading = isEmpty(this.state.builtData);
    let snr = this.state.snrMin;
    return (
      <div>
        {loading ? (
          <Preloader />
        ) : (
          <div className="container container__heatmap--row">
            <div className="heatmap__col col--8">
              <div className="slider__container">
                <p>Average accuracy of groundtruth units above SNR threshold</p>
                <div className="slider__copy">
                  <p>
                    <b>Minimum SNR: {snr}</b>
                  </p>
                </div>
                <div className="slider__vertical">
                  <Slider
                    min={0}
                    max={50}
                    value={snr}
                    step={1}
                    orientation="horizontal"
                    onChange={this.handleAccuracyChange}
                  />
                </div>
              </div>
              <HeatmapViz
                {...this.props}
                filteredData={this.state.builtData}
                sorters={this.props.shortSorters}
                format="average"
              />
            </div>
            {this.props.selectedStudy ? (
              <div className="unitdetail col--6">
                <StudySorterSummary
                  {...this.props}
                  accuracy={this.state.snrMin}
                />
              </div>
            ) : (
              <div />
            )}
          </div>
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
)(HeatmapAverage);
