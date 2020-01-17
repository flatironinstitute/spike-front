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
    this.buildCountData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.studyAnalysisResult !== prevProps.studyAnalysisResult ||
      this.props.studyName !== prevProps.studyName ||
      this.props.recordingName !== prevProps.recordingName ||
      this.props.sorterName !== prevProps.sorterName ||
      this.props.metric !== prevProps.metric
    ) {
      this.buildCountData();
    }
  }

  buildCountData() {
    let sar = this.props.studyAnalysisResult;
    let snrs = sar.trueSnrs;
    let recordingIndices = sar.trueRecordingIndices;
    let selectedRecordingIndex = null;
    if (this.props.recordingName) {
      for (let ii = 0; ii < sar.recordingNames.length; ii++) {
        if (sar.recordingNames[ii] === this.props.recordingName) {
          selectedRecordingIndex = ii;
        }
      }
    }
    sar.sortingResults.forEach(sr => {
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
        for (let ii = 0; ii < recordingIndices.length; ii++) {
          let in_selected_recording =
            selectedRecordingIndex === null ||
            selectedRecordingIndex === recordingIndices[ii];

          newUnits.push({
            unitIndex: ii, // this is the part that is used in the parent component
            sorterName: this.props.sorterName, // this is used by parent component also
            unitId: sar.trueUnitIds[ii],
            unitCode: `${sar.studyName}/${
              sar.recordingNames[sar.trueRecordingIndices[ii]]
            }/${this.props.sorterName}/${sar.trueUnitIds[ii]}`,
            x: Math.round(snrs[ii] * 100) / 100,
            y: yvals[ii],
            size: Math.max(1, this.getSqrt(sar.trueNumEvents[ii])),
            color: sar.trueRecordingIndices[ii],
            opacity: in_selected_recording ? 0.8 : 1.0,
            recordingIndex: sar.trueRecordingIndices[ii],
            recordingName: sar.recordingNames[sar.trueRecordingIndices[ii]],
            studyName: sar.studyName,
            num_events: sar.trueNumEvents[ii],
            grayed: !in_selected_recording
          });
        }
        let min = this.getMinSNR(newUnits);
        let max = this.getMaxSNR(newUnits);
        this.setState({ data: newUnits, minSNR: min, maxSNR: max });
      }
    });
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
    const { data, hoveredNode, maxSNR } = this.state;
    let selectedUnitCode = this.props.selectedUnitCode;
    let metricObj = {};
    metricObj[this.props.metric] = hoveredNode ? hoveredNode.y : 0;
    let otherObj = {
      snr: hoveredNode ? hoveredNode.x : 0,
      num_events: hoveredNode ? hoveredNode.num_events : 0,
      recording: hoveredNode ? hoveredNode.recordingName : "",
      unit_id: hoveredNode ? hoveredNode.unitId : ""
    };
    let valueObj = { ...metricObj, ...otherObj };
    let alignment = {
      horizontal: "rightEdge",
      vertical: "topEdge"
    };
    const lineOrientation = this.props.lineOrientation || "horizontal";
    let lineObjArr;
    if (lineOrientation === "horizontal") {
      lineObjArr = [
        { x: 0, y: this.props.sliderValue },
        { x: maxSNR, y: this.props.sliderValue }
      ];
    } else {
      lineObjArr = [
        { x: this.props.sliderValue, y: 0 },
        { x: this.props.sliderValue, y: 1 }
      ];
    }
    let selectedNode = null;
    if (selectedUnitCode) {
      data.forEach(a => {
        if (a.unitCode === selectedUnitCode)
          selectedNode = JSON.parse(JSON.stringify(a));
      });
    }

    let grayedNodes = [];
    let ungrayedNodes = [];
    for (let node of data) {
      if (node.grayed) {
        grayedNodes.push(node);
      } else {
        ungrayedNodes.push(node);
      }
    }

    let nullNodes = [];
    for (let node of ungrayedNodes) {
      if (node.y === null) {
        nullNodes.push(node);
      }
    }

    const yTitle = toTitleCase(this.props.metric);
    return (
      <div className="canvas-wrapper" id="scatterplot-wrapper">
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
            // gray nodes
            className="mark-series-example"
            sizeRange={[3, 15]}
            seriesId="grayed"
            colorRange={["#e3e3e4", "#e3e3e4"]}
            opacityType="literal"
            data={grayedNodes}
            onValueMouseOver={d => this.setState({ hoveredNode: d })}
            onValueClick={d => {
              this.handleScatterplotClick(d);
            }}
          />
          <MarkSeries
            // blue nodes
            className="mark-series-example"
            sizeRange={[3, 15]}
            seriesId="scatterplot"
            colorRange={this.props.colorRange || ["#6B7CC4", "#102BA3"]}
            opacityType="literal"
            data={ungrayedNodes}
            onValueMouseOver={d => this.setState({ hoveredNode: d })}
            onValueClick={d => {
              this.handleScatterplotClick(d);
            }}
          />
          {nullNodes.length > 0 && (
            <MarkSeries
              // brown (null) nodes
              className="mark-series-example"
              sizeRange={[3, 15]}
              seriesId="null-nodes"
              colorRange={["#903f2c", "#903f2c"]}
              opacityType="literal"
              data={nullNodes}
              onValueMouseOver={d => this.setState({ hoveredNode: d })}
              onValueClick={d => {
                this.handleScatterplotClick(d);
              }}
            />
          )}
          {hoveredNode && <Hint value={valueObj} align={alignment} />}
          {selectedNode && (
            <MarkSeries
              // yellow (selected) nodes
              className="mark-series-example"
              sizeRange={[3, 15]}
              seriesId="selected"
              colorRange={["#f6cf3f", "#f6cf3f"]}
              opacityType="literal"
              data={[selectedNode]}
              onValueMouseOver={d => this.setState({ hoveredNode: d })}
              onValueClick={d => {
                this.handleScatterplotClick(d);
              }}
            />
          )}
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
