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

class ScatterplotCount extends Component {
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
      this.props.metric !== prevProps.metric) {
      this.buildCountData();
    }
    if (this.state.hoveredNode !== prevState.hoveredNode) {
      console.log("NEW NODE 🐶", this.state.hoveredNode);
    }
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
    let min = this.getMinSNR(newUnits);
    let max = this.getMaxSNR(newUnits);
    this.setState({ data: newUnits, minSNR: min, maxSNR: max });
  }


  getSqrt(num_events) {
    return Math.sqrt(num_events);
  }

  getMinSNR(data) {
    return data.reduce((min, p) => (p.x < min ? p.x : min), data[0].y);
  }

  getMaxSNR(data) {
    let max = data.reduce((max, p) => (p.x > max ? p.x : max), data[0].y);
    return Math.round(max * 100) / 100;
  }

  render() {
    const { data, hoveredNode, minSNR, maxSNR } = this.state;
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
            colorRange={["#6B7CC4", "#102BA3"]}
            opacityType="literal"
            data={data}
            onValueMouseOver={d => this.setState({ hoveredNode: d })}
            onValueClick={d => this.setState({ selectedRecording: d })}
          />
          <LineSeries
            className="fourth-series"
            strokeDasharray="7, 3"
            data={lineObjArr}
          />
          {hoveredNode && <Hint value={valueObj} align={alignment} />}
        </XYPlot>
      </div>
    );
  }
}

export default ScatterplotCount;