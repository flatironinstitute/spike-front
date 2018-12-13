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
      hoveredNode: null,
      minSNR: 0,
      maxSNR: 100
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
    let min = this.getMinSNR(newUnits);
    let max = this.getMaxSNR(newUnits);
    this.setState({ data: newUnits, minSNR: min, maxSNR: max });
  }

  getMinSNR(data) {
    return data.reduce((min, p) => (p.x < min ? p.x : min), data[0].y);
  }

  getMaxSNR(data) {
    let max = data.reduce((max, p) => (p.x > max ? p.x : max), data[0].y);
    return Math.round(max * 100) / 100;
  }

  render() {
    const { data, colorType, hoveredNode, minSNR, maxSNR } = this.state;
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
      sizeRange: [0, 10],
      seriesId: "my-example-scatterplot",
      colorRange: colorRanges[colorType],
      opacityType: "literal",
      data,
      onValueMouseOver: d => this.setState({ hoveredNode: d })
    };
    let valueObj = {
      recording: hoveredNode
        ? `${hoveredNode.recording}:${hoveredNode.color / 10}`
        : null,
      accuracy: hoveredNode ? hoveredNode.y : null,
      snr: hoveredNode ? hoveredNode.x : null,
      num_events: hoveredNode ? hoveredNode.size : null
    };
    let lineObjArr = [
      { x: minSNR, y: this.props.accuracy },
      { x: maxSNR, y: this.props.accuracy }
    ];
    return (
      <div className="canvas-wrapper">
        <div className="canvas-example-controls">
          <div
            className="button primary-button"
            onClick={() => this.setState({ colorType: nextType[colorType] })}
          >
            FAKE FILTER
          </div>
        </div>
        <XYPlot
          onMouseLeave={() => this.setState({ hoveredNode: null })}
          width={550}
          height={400}
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
              getX={d => {
                return d.snr;
              }}
              getY={d => d.accuracy}
            />
          )}
        </XYPlot>
      </div>
    );
  }
}
export default Scatterplot;
