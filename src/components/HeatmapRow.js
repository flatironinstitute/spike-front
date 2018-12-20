import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  XAxis,
  YAxis,
  HeatmapSeries,
  Hint,
  LabelSeries
} from "react-vis";
import Preloader from "./Preloader";
import { isEmpty } from "../utils";

class HeatmapRow extends Component {
  constructor(props) {
    super(props);
    this.state = { hoveredNode: null, labelData: null, rowData: null };
    this.dims = {
      height: 50,
      width: 620
    };
    this.margin = { left: 190, right: 80, top: 5, bottom: 5 };
    if (this.props.index === 0) {
      this.dims.height = 110;
      this.margin.top = 65;
    }
  }

  componentDidMount() {
    if (this.props.vizDatum) {
      this.setLabelData();
      this.setRowData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedStudy !== prevProps.selectedStudy) {
      this.setRowData();
    }
  }

  setLabelData() {
    let colorMap = this.props.vizDatum.map(datum => datum.color);
    colorMap.sort((a, b) => a - b);
    let withColor = this.props.vizDatum.map(datum => {
      datum.style = colorMap.indexOf(datum.color) > 2 ? { fill: "white" } : {};
      return datum;
    });
    this.setState({
      labelData: withColor
    });
  }

  setRowData() {
    const hoverStroke = {
      stroke: "#f28b00",
      strokeWidth: 0.5
    };
    let withSelectedStudy = this.props.vizDatum.map(datum => {
      if (this.props.selectedStudy && this.props.selectedStudy === datum) {
        datum.style = hoverStroke;
      } else {
        datum.style = {};
      }
      return datum;
    });
    this.setState({
      rowData: withSelectedStudy
    });
  }

  render() {
    const { hoveredNode, rowData, labelData } = this.state;
    const loading = isEmpty(labelData);
    return (
      <div>
        {loading ? (
          <Preloader />
        ) : (
          <div className="App heatmap-row">
            <XYPlot
              xType="ordinal"
              yType="ordinal"
              onMouseLeave={() => this.setState({ hoveredNode: null })}
              height={this.dims.height}
              width={this.dims.width}
              margin={this.margin}
            >
              {this.props.index === 0 ? (
                <XAxis
                  orientation={"top"}
                  tickLabelAngle={-25}
                  position={"start"}
                  title="Count above accuracy threshold"
                />
              ) : null}
              <YAxis />
              <HeatmapSeries
                colorRange={["#fafafd", "#384ca2"]}
                data={rowData}
                onValueMouseOver={d => {
                  this.setState({ hoveredNode: d });
                }}
                onValueClick={d => {
                  this.props.selectStudy(d);
                }}
              />
              <LabelSeries
                data={labelData}
                labelAnchorX="middle"
                labelAnchorY="central"
                onValueClick={d => {
                  this.props.selectStudy(d);
                }}
                getLabel={d => {
                  return d.in_range > 0 ? `${d.in_range}` : "";
                }}
              />
            </XYPlot>
          </div>
        )}
      </div>
    );
  }
}

export default HeatmapRow;
