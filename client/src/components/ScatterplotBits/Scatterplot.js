import React, { Component } from 'react';
import '../../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  LineSeries,
  Hint,
} from 'react-vis';

class Scatterplot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      colorType: 'typeA',
      hoveredNode: null,
      minSNR: 0,
      maxSNR: 100,
    };
  }

  componentDidMount() {
    if (this.props.selectedUnits) {
      this.buildScatterData(this.props.selectedUnits);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedUnits !== prevProps.selectedUnits) {
      this.buildScatterData(this.props.selectedUnits);
    }
    if (this.state.hoveredNode !== prevState.hoveredNode) {
      console.log('NEW NODE', this.state.hoveredNode);
    }
  }

  buildScatterData() {
    let newUnits = this.props.selectedUnits.map(unit => ({
      u: unit,
      x: Math.round(unit.snr * 100) / 100,
      y: unit.accuracy,
      size: Math.max(1, this.getSqrt(unit.num_events)),
      color: unit.unit_id * 10,
      opacity: unit.accuracy * 0.5 + 0.5,
      recording: unit.recording,
      num_events: unit.num_events,
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
    const { data, colorType, hoveredNode, minSNR, maxSNR } = this.state;
    const colorRanges = {
      typeA: ['#59E4EC', '#0D676C'],
      typeB: ['#EFC1E3', '#B52F93'],
    };
    const alignment = { vertical: 'top', horizontal: 'left' };
    let valueObj = {
      recording: hoveredNode
        ? `${hoveredNode.recording}:${hoveredNode.color / 10}`
        : null,
      accuracy: hoveredNode ? hoveredNode.y : null,
      snr: hoveredNode ? hoveredNode.x : null,
      num_events: hoveredNode ? hoveredNode.num_events : null,
    };
    let lineObjArr = [
      { x: minSNR, y: this.props.accuracy },
      { x: maxSNR, y: this.props.accuracy },
    ];
    const tickValues = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
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
          <YAxis title="Accuracy" tickValues={tickValues} />
          <MarkSeries
            animation={true}
            className="mark-series-example"
            sizeRange={[3, 15]}
            seriesId="my-example-scatterplot"
            colorRange={colorRanges[colorType]}
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

export default Scatterplot;
