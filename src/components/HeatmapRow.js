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
    this.state = { hoveredNode: null };
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

  getClassName() {
    const colorMap = this.props.vizDatum.map(datum => datum.color);
    colorMap.sort((a, b) => a - b);
    let withColor = this.props.vizDatum.map(datum => {
      datum.style = colorMap.indexOf(datum.color) > 2 ? { fill: "white" } : {};
      return datum;
    });
    return withColor;
  }

  render() {
    let data = this.getClassName();
    const { hoveredNode } = this.state;
    const loading = isEmpty(data);
    const sorters = this.props.sorters;
    let base = this.dims.width - (this.margin.left + this.margin.right);
    let midpoint = sorters.length * 0.5;
    let gridWidth = base / sorters.length;
    let gridHeight = 50;
    let valueObj = {
      sorter: hoveredNode ? hoveredNode.sorter : null,
      study: hoveredNode ? hoveredNode.study : null,
      value:
        hoveredNode && hoveredNode.in_range > 0 ? hoveredNode.in_range : "n/a"
    };
    if (hoveredNode && !hoveredNode.is_applied) {
      valueObj.status = "Algorithm not applied";
    }
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
                data={data}
                onValueMouseOver={d => {
                  this.setState({ hoveredNode: d });
                }}
                onValueClick={d => {
                  this.props.selectStudy(d);
                }}
              />
              {hoveredNode && (
                <Hint
                  xType="literal"
                  yType="literal"
                  getX={data => {
                    let slot = sorters.indexOf(data.sorter) + 1;
                    if (slot <= midpoint) {
                      return slot * gridWidth;
                    } else {
                      return slot * gridWidth - 80;
                    }
                  }}
                  getY={data => gridHeight}
                  value={valueObj}
                />
              )}
              <LabelSeries
                data={data}
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
