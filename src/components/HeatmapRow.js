import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import { XYPlot, XAxis, YAxis, HeatmapSeries, Hint } from "react-vis";
import Preloader from "./Preloader";
import { isEmpty } from "../utils";

class HeatmapRow extends Component {
  constructor(props) {
    super(props);
    this.state = { hoveredNode: null };
    this.dims = {
      height: 50,
      width: 700
    };
    this.margin = { left: 180, right: 120, top: 5, bottom: 5 };
    if (this.props.index === 0) {
      this.dims.height = 110;
      this.margin.top = 65;
    }
  }

  render() {
    const data = this.props.vizDatum;
    const { hoveredNode } = this.state;
    const loading = isEmpty(data);
    const sorters = this.props.sorters;
    let base = this.dims.width - (this.margin.left + this.margin.right);
    let midpoint = sorters.length * 0.5;
    let gridWidth = base / sorters.length;
    let gridHeight = 50;
    return (
      <div>
        {loading ? (
          <Preloader />
        ) : (
          <div className="App">
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
                />
              ) : null}
              <YAxis />
              <HeatmapSeries
                colorRange={["#fafafd", "#384ca2"]}
                data={data}
                onValueMouseOver={d => {
                  this.setState({ hoveredNode: d });
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
                      return slot * gridWidth - 99;
                    }
                  }}
                  getY={data => gridHeight}
                  value={{
                    sorter: hoveredNode.sorter,
                    study: hoveredNode.study,
                    value:
                      hoveredNode.in_range > 0 ? hoveredNode.in_range : "n/a",
                    applied: hoveredNode.is_applied.toString()
                  }}
                />
              )}
            </XYPlot>
          </div>
        )}
      </div>
    );
  }
}

export default HeatmapRow;
