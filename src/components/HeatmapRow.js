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
      height: 150,
      width: 500
    };
  }

  render() {
    const data = this.props.vizDatum;
    const { hoveredNode } = this.state;
    const loading = isEmpty(data);
    const margin = { left: 150, right: 20, top: 100, bottom: 5 };
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
              margin={margin}
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
                colorRange={["#ffffff", "#384ca2"]}
                data={data}
                onValueMouseOver={d => this.setState({ hoveredNode: d })}
              />
              {hoveredNode && (
                <Hint
                  xType="literal"
                  yType="literal"
                  getX={d => d.x}
                  getY={d => d.y}
                  value={{
                    sorter: hoveredNode.sorter,
                    study: hoveredNode.study,
                    value: hoveredNode.in_range
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
