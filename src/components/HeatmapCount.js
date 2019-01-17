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

class HeatmapCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: Change this to accuracy filtered data
      builtData: [],
      accuracy: 0.8
    };
  }

  componentDidMount() {
    if (this.props.unitsMap.length) {
      this.filterAccuracyMap();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.unitsMap !== prevProps.unitsMap ||
      this.state.accuracy !== prevState.accuracy
    ) {
      this.filterAccuracyMap();
    }
  }

  filterAccuracy(sorterArray) {
    let newArr = sorterArray.map(sorter => {
      let above = sorter.accuracies.filter(accu => {
        return accu >= this.state.accuracy;
      });
      sorter.in_range = above.length;
      sorter.color = above.length;
      return sorter;
    });
    return newArr;
  }

  filterAccuracyMap() {
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
      accuracy: value
    });
  };

  render() {
    let loading = isEmpty(this.state.builtData);
    let accuracy = this.state.accuracy;
    return (
      <div>
        {loading ? (
          <Preloader />
        ) : (
          <div className="container container__heatmap--row">
            <div className="heatmap__col col--8">
              <div className="slider__container">
                <p>Number of groundtruth units above accuracy threshold</p>
                <div className="slider__copy">
                  <p>
                    <b>Minimum accuracy: {Math.round(accuracy * 100) / 100}</b>
                  </p>
                </div>
                <div className="slider__vertical">
                  <Slider
                    min={0}
                    max={1}
                    value={accuracy}
                    step={0.05}
                    orientation="horizontal"
                    onChange={this.handleAccuracyChange}
                  />
                </div>
              </div>
              <HeatmapViz
                {...this.props}
                filteredData={this.state.builtData}
                sorters={this.props.shortSorters}
                format="count"
              />
            </div>
            {this.props.selectedStudy ? (
              <div className="unitdetail col--6">
                <StudySorterSummary
                  {...this.props}
                  accuracy={this.state.accuracy}
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
)(HeatmapCount);
