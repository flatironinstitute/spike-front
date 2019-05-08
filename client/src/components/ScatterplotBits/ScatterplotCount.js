import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
  FlexibleXYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  LineSeries,
  Hint
} from "react-vis";
import { toTitleCase } from "../../utils";
import "./scatterplot.css";

class ScatterplotCount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      hoveredNode: null,
      minSNR: 0,
      maxSNR: 100,
      selectedRecording: null
    };
  }

  componentDidMount() {
    if (this.props.selectedUnits) {
      this.buildCountData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.selectedUnits !== prevProps.selectedUnits ||
      this.props.metric !== prevProps.metric
    ) {
      this.buildCountData();
    }
    if (this.state.selectedRecording !== prevState.selectedRecording) {
      if (this.state.selectedRecording !== prevState.selectedRecording) {
        console.log(
          "NEW SELECTED RECORDING",
          this.state.selectedRecording,
          this.props.selectedStudySortingResult
        );
      }
    }
  }

  getYValue(unit) {
    let yValue;
    switch (this.props.metric) {
      case "accuracy":
        yValue = unit.checkAccuracy;
        break;
      case "recall":
        yValue = unit.checkRecall;
        break;
      case "precision":
        yValue = unit.checkPrecision;
        break;
      default:
        yValue = unit.checkAccuracy;
        break;
    }
    return yValue;
  }

  buildCountData() {
    let newUnits = this.props.selectedUnits.map((unit, index) => ({
      u: unit,
      x: Math.round(unit.snr * 100) / 100,
      y: this.getYValue(unit),
      size: Math.max(1, this.getSqrt(unit.numMatches)),
      color: unit.unitId * 10,
      opacity: unit.checkAccuracy * 0.5 + 0.5,
      recording: unit.recording,
      num_events: unit.numMatches
    }));
    let min = this.getMinSNR(newUnits);
    let max = this.getMaxSNR(newUnits);
    this.setState({ data: newUnits, minSNR: min, maxSNR: max });
  }

  getSqrt(num_events) {
    return Math.sqrt(num_events);
  }

  getMinSNR(data) {
    if (data.length === 0) {
      return 0;
    } else {
      return data.reduce((min, p) => (p.x < min ? p.x : min), data[0].y);
    }
  }

  getMaxSNR(data) {
    if (data.length === 0) {
      return 0;
    } else {
      let max = data.reduce((max, p) => (p.x > max ? p.x : max), data[0].y);
      return Math.round(max * 100) / 100;
    }
  }

  render() {
    const { data, hoveredNode, maxSNR } = this.state;
    let metricObj = {};
    metricObj[this.props.metric] = hoveredNode ? hoveredNode.y : 0;
    let otherObj = {
      snr: hoveredNode ? hoveredNode.x : 0,
      num_events: hoveredNode ? hoveredNode.num_events : 0
    };
    let valueObj = { ...metricObj, ...otherObj };
    let alignment = {
      horizontal: "rightEdge",
      vertical: "topEdge"
    };
    let lineObjArr = [
      { x: 0, y: this.props.sliderValue },
      { x: maxSNR, y: this.props.sliderValue }
    ];
    const yTitle = toTitleCase(this.props.metric);
    return (
      <div className="canvas-wrapper">
        <FlexibleXYPlot
          onMouseLeave={() => this.setState({ hoveredNode: null })}
          height={400}
          xPadding={30}
          yPadding={30}
          yDomain={[0, 1]}
          xDomain={[0, maxSNR]}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="SNR" />
          <YAxis title={yTitle} />
          <MarkSeries
            // animation={true}
            className="mark-series-example"
            sizeRange={[3, 15]}
            seriesId="my-example-scatterplot"
            colorRange={["#6B7CC4", "#102BA3"]}
            opacityType="literal"
            data={data}
            onValueMouseOver={d => this.setState({ hoveredNode: d })}
            onValueClick={d => this.setState({ selectedRecording: d })}
          />
          {hoveredNode && <Hint value={valueObj} align={alignment} />}
          <LineSeries
            className="fourth-series"
            strokeDasharray="7, 3"
            data={lineObjArr}
          />
        </FlexibleXYPlot>
      </div>
    );
  }
}

export default ScatterplotCount;
