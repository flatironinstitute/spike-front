import React, { Component } from "react";
import "../../node_modules/react-vis/dist/style.css";
import { XYPlot, XAxis, YAxis, HeatmapSeries, Hint } from "react-vis";

class HeatmapViz extends Component {
  constructor(props) {
    super(props);
    this.state = { hoveredNode: null, vizData: null };
    this.dims = {
      height: 800,
      width: 800
    };
    // TODO: make a separate one of these for every row!
  }

  componentDidMount() {
    this.buildVizData(this.props.filteredData);
  }

  componentDidUpdate(prevProps) {
    if (this.props.builtData !== prevProps.builtData) {
      this.buildVizData(this.props.filteredData);
    }
  }

  buildVizData(data) {
    if (data) {
      console.log("🍑", data[0]);
    }
  }

  render() {
    const vizData = {
      study_name: [
        {
          sorter: "",
          in_range: 0,
          accuracies: [],
          true_units: []
        }
      ]
    };
    const data = [
      { x: 1, y: 0, color: 10, name: "a" },
      { x: 1, y: 5, color: 10, name: "b" },
      { x: 1, y: 10, color: 6, name: "c" },
      { x: 1, y: 15, color: 7, name: "d" },
      { x: 2, y: 0, color: 12, name: "e" },
      { x: 2, y: 5, color: 2, name: "f" },
      { x: 2, y: 10, color: 1, name: "g" },
      { x: 2, y: 15, color: 12, name: "h" },
      { x: 3, y: 0, color: 9, name: "i" },
      { x: 3, y: 5, color: 2, name: "j" },
      { x: 3, y: 10, color: 6, name: "k" },
      { x: 3, y: 15, color: 12, name: "l" }
    ];
    const { hoveredNode } = this.state;
    return (
      <div className="App">
        <XYPlot
          xType="ordinal"
          yType="ordinal"
          onMouseLeave={() => this.setState({ hoveredNode: null })}
          height={this.dims.height}
          width={this.dims.width}
        >
          <XAxis />
          <YAxis hideTicks />
          <YAxis left={50} tickFormat={v => v * v} />
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
                x: hoveredNode.x,
                y: hoveredNode.y,
                value: hoveredNode.color,
                name: hoveredNode.name
              }}
            />
          )}
        </XYPlot>
      </div>
    );
  }
}

export default HeatmapViz;
