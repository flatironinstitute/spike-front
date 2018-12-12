import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
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

class Scatterplot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      colorType: "typeA",
      hoveredNode: null
    };
  }

  componentDidMount() {
    if (this.props.selectedUnits) {
      this.buildScatterData(this.props.selectedUnits);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedUnits !== prevProps.selectedUnits) {
      this.buildScatterData(this.props.selectedUnits);
    }
  }

  buildScatterData() {
    let newUnits = this.props.selectedUnits.map(unit => ({
      u: unit,
      x: Math.round(unit.snr * 100) / 100,
      y: unit.accuracy,
      size: unit.num_events,
      color: unit.unit_id * 10,
      opacity: unit.accuracy * 0.5 + 0.5,
      recording: unit.recording
    }));
    this.setState({ data: newUnits });
  }

  render() {
    const { data, colorType, hoveredNode } = this.state;
    const colorRanges = {
      typeA: ["#59E4EC", "#0D676C"],
      typeB: ["#EFC1E3", "#B52F93"]
    };
    const nextType = {
      typeA: "typeB",
      typeB: "typeA"
    };
    const markSeriesProps = {
      animation: true,
      className: "mark-series-example",
      sizeRange: [5, 5],
      seriesId: "my-example-scatterplot",
      colorRange: colorRanges[colorType],
      opacityType: "literal",
      data,
      onNearestXY: d => this.setState({ hoveredNode: d })
    };
    const mode = "svg";
    let valueObj = {
      recording: hoveredNode
        ? `${hoveredNode.recording}:${hoveredNode.color / 10}`
        : null,
      accuracy: hoveredNode ? hoveredNode.y : null,
      snr: hoveredNode ? hoveredNode.x : null,
      num_events: hoveredNode ? hoveredNode.size : null
    };
    let lineObjArr = [
      {
        x: 2,
        y: this.props.accuracy
      },
      { x: 26, y: this.props.accuracy }
    ];
    return (
      <div className="canvas-wrapper">
        <div className="canvas-example-controls">
          <a
            className="button primary-button"
            onClick={() => this.setState({ colorType: nextType[colorType] })}
          >
            FAKE FILTER
          </a>
        </div>
        <XYPlot
          onMouseLeave={() => this.setState({ hoveredNode: null })}
          width={500}
          height={300}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="SNR" />
          <YAxis title="Accuracy" />
          <MarkSeries {...markSeriesProps} />
          <LineSeries
            className="fourth-series"
            strokeDasharray="7, 3"
            data={lineObjArr}
          />
          {hoveredNode && (
            <Hint
              value={valueObj}
              align={{ vertical: "bottom", horizontal: "left" }}
            />
          )}
        </XYPlot>
      </div>
    );
  }
}
export default Scatterplot;
