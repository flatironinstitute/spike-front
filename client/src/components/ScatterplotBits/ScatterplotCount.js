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
      selectedNode: null,
      minSNR: 0,
      maxSNR: 100
    };
  }

  componentDidMount() {
    this.buildCountData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.studyAnalysisResult !== prevProps.studyAnalysisResult ||
      this.props.studyName !== prevProps.studyName ||
      this.props.sorterName !== prevProps.sorterName ||
      this.props.metric !== prevProps.metric
    ) {
      this.buildCountData();
    }
    if (this.state.selectedRecording !== prevState.selectedRecording) {
      if (this.state.selectedRecording !== prevState.selectedRecording) {
        console.log(
          "🕌 NEW SELECTED RECORDING",
          this.state.selectedRecording,
          this.props.studyName,
          this.props.sorterName
        );
      }
    }
  }

  /*
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
  */

  buildCountData() {
    let sar = this.props.studyAnalysisResult;
    let snrs = sar.trueSnrs;
    sar.sortingResults.forEach((sr) => {
      if (sr.sorterName === this.props.sorterName) {
        let yvals;
        switch (this.props.metric) {
          case "accuracy":
            yvals = sr.accuracies;
            break;
          case "recall":
            yvals = sr.recalls;
            break;
          case "precision":
            yvals = sr.precisions;
            break;
          default:
            yvals = sr.accuracies;
            break;
        }
        let newUnits = [];
        for (let ii = 0; ii < snrs.length; ii++) {
          newUnits.push({
            unitIndex: ii, // this is the part that is used in the parent component
            sorterName: this.props.sorterName, // this is used by parent component also
            unitId: sar.trueUnitIds[ii],
            x: Math.round(snrs[ii] * 100) / 100,
            y: yvals[ii],
            size: Math.max(1, this.getSqrt(sar.trueNumEvents[ii])),
            color: sar.trueRecordingIndices[ii],
            opacity: yvals[ii] * 0.5 + 0.5,
            recordingIndex: sar.trueRecordingIndices[ii],
            recordingName: sar.recordingNames[sar.trueRecordingIndices[ii]],
            studyName: sar.studyName,
            num_events: sar.trueNumEvents[ii]
          });
        }
        let min = this.getMinSNR(newUnits);
        let max = this.getMaxSNR(newUnits);
        this.setState({ data: newUnits, minSNR: min, maxSNR: max });  
      }
    });
    
    /*
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
    */
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

  handleScatterplotClick(d) {
    if (this.props.handleScatterplotClick) {
      this.props.handleScatterplotClick(d);
    }
  }

  render() {
    const { data, hoveredNode, selectedNode, maxSNR } = this.state;
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
    const lineOrientation = this.props.lineOrientation || 'horizontal';
    let lineObjArr;
    if (lineOrientation === 'horizontal') {
      lineObjArr = [
        { x: 0, y: this.props.sliderValue },
        { x: maxSNR, y: this.props.sliderValue }
      ];
    }
    else {
      lineObjArr = [
        { x: this.props.sliderValue, y: 0 },
        { x: this.props.sliderValue, y: 1 }
      ];
    }
    // let selectedData = [];
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
            colorRange={this.props.colorRange || ["#6B7CC4", "#102BA3"]}
            opacityType="literal"
            data={data}
            onValueMouseOver={d => this.setState({ hoveredNode: d })}
            onValueClick={d => {this.handleScatterplotClick(d);}}
          />
          {hoveredNode && <Hint value={valueObj} align={alignment} />}
          {selectedNode && 
            <MarkSeries
              // animation={true}
              className="mark-series-example"
              sizeRange={[3, 15]}
              seriesId="selected"
              colorRange={["#bbbb05", "#bbbb05"]}
              opacityType="literal"
              data={[selectedNode]}
              onValueClick={d => {this.handleScatterplotClick(d)}}
            />
          }
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
