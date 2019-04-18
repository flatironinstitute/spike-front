import React, { Component } from "react";
import "../../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  LineSeries,
  Hint
} from "react-vis";
import { toTitleCase } from "../../utils";

class ScatterplotAverage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      hoveredNode: null,
      minSNR: 0,
      maxSNR: 100
    };
  }

  componentDidMount() {
    if (this.props.selectedUnits) {
      this.buildCountData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedUnits !== prevProps.selectedUnits || 
      this.props.metric !== prevProps.metric || 
      this.props.format !== prevProps.format) {
      this.buildCountData();
    }
    if (this.state.hoveredNode !== prevState.hoveredNode) {
      console.log("NEW NODE 🐶", this.state.hoveredNode);
    }
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
    let min = this.getMinY(newUnits);
    let max = this.getMaxY(newUnits);
    this.setState({ data: newUnits, minSNR: min, maxSNR: max });
  }

  getYValue(unit){
      let yValue;
      switch (this.props.metric) {
        case "accuracy":
          yValue = unit.checkAccuracy;
          break;
        case "recall":
          yValue = unit.checkRecall;
          break;
        case "precision":
          yValue = unit.precision;
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
    let min = this.getMinY(newUnits);
    let max = this.getMinY(newUnits);
    console.log(min, "Min Y", max, "MaxY")
    this.setState({ data: newUnits, minSNR: min, maxSNR: max });
  }


  getSqrt(num_events) {
    return Math.sqrt(num_events);
  }

  getMinY(data) {
    return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
  }

  getMaxY(data) {
    return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
  }

  render() {
    const { data, hoveredNode, minSNR, maxSNR } = this.state;
    const colorRanges = {
      count: ["#6B7CC4", "#102BA3"],
      cpu: ["#EFC1E3", "#B52F93"],
      average: ["#00CEA8", "#0C4F42"]
    };
    const alignment = { vertical: "top", horizontal: "left" };
    let valueObj = {
      recording: hoveredNode
        ? `${hoveredNode.recording}:${hoveredNode.color / 10}`
        : null,
      accuracy: hoveredNode ? hoveredNode.y : null,
      snr: hoveredNode ? hoveredNode.x : null,
      num_events: hoveredNode ? hoveredNode.num_events : null
    };
    let lineObjArr = [
      { x: minSNR, y: this.props.sliderValue },
      { x: maxSNR, y: this.props.sliderValue }
    ];
    const tickValues = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
    const yTitle = toTitleCase(this.props.metric);

    return (
      <div className="canvas-wrapper">
        <XYPlot
          onMouseLeave={() => this.setState({ hoveredNode: null })}
          width={500}
          height={400}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="SNR" />
          <YAxis title={yTitle} tickValues={tickValues} />
          <MarkSeries
            animation={true}
            className="mark-series-example"
            sizeRange={[3, 15]}
            seriesId="my-example-scatterplot"
            colorRange={colorRanges[this.props.format]}
            opacityType="literal"
            data={data}
            onValueMouseOver={d => this.setState({ hoveredNode: d })}
            onValueClick={d => this.setState({ selectedRecording: d })}
          />
          {this.props.format === "count" ? (
            <LineSeries
              className="fourth-series"
              strokeDasharray="7, 3"
              data={lineObjArr}
            />
          ) : null}
          {hoveredNode && <Hint value={valueObj} align={alignment} />}
        </XYPlot>
      </div>
    );
  }
}

export default ScatterplotAverage;
