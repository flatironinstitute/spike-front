import React, { Component } from "react";
import * as d3 from "d3";
import HeatmapLabelYAxis from "./HeatmapLabelYAxis";
import HeatmapLabelXAxis from "./HeatmapLabelXAxis";

class Heatmap extends Component {
  constructor(props) {
    super(props);
    this.svg = d3.select("#heatmap-svg");
  }

  componentDidMount() {
    const svg = d3.select("#heatmap-svg");
    this.buildGrid(svg, this.props.builtData);
  }

  componentDidUpdate(prevProps) {
    if (this.props.builtData !== prevProps.builtData) {
      this.svg.selectAll("*").remove();
      console.log("⚽ removed", this.svg);
      this.buildGrid(this.svg, this.props.builtData);
    }
  }

  buildGrid(svg, builtData) {
    var colorScale = d3
      .scaleQuantile()
      .domain([
        d3.min(builtData, function(d) {
          return d.in_range;
        }),
        d3.max(builtData, function(d) {
          return d.in_range;
        })
      ])
      .range(this.props.colors);

    // Axis translation
    // studies = y
    // sorters = x

    // Make an SVG with the correct height and width
    svg
      .attr(
        "width",
        this.props.width + this.props.margin.left + this.props.margin.right
      )
      .attr(
        "height",
        this.props.height + this.props.margin.top + this.props.margin.bottom
      )
      .attr(
        "transform",
        "translate(" +
          this.props.margin.left +
          "," +
          this.props.margin.top +
          ")"
      );

    // Plot the heatmap
    const gridSize = this.props.gridSize;
    let sorterArr = this.props.sorters;
    let studiesArr = this.props.studies;
    var heatMap = svg
      .selectAll(".sorter")
      .data(builtData)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return sorterArr.indexOf(d.sorter) * gridSize;
      })
      .attr("y", function(d) {
        return (studiesArr.indexOf(d.study) + 0.25) * gridSize;
      })
      .attr("rx", sorterArr.length)
      .attr("ry", studiesArr.length)
      .attr("class", "sorter bordered")
      .attr("width", gridSize)
      .attr("height", gridSize)
      .style("fill", this.props.colors[0]);

    heatMap
      .transition()
      .duration(1000)
      .style("fill", function(d) {
        return colorScale(d.in_range);
      });

    heatMap.append("title").text(function(d) {
      return (
        "The number of units below the accuracy threshhold is " + d.in_range
      );
    });
  }

  getTranslationY(index) {
    const halfGrid = this.props.gridSize * 1.8;
    const copyHeight = 19 * index + 20;
    const translation = this.props.gridSize * index + halfGrid + copyHeight;
    return translation * -1;
  }

  render() {
    const toTop = this.props.height + 350;
    return (
      <div>
        <g className="heatmap">
          <svg id="heatmap-svg" />
          {this.props.studies.map((study, i) => (
            <HeatmapLabelYAxis
              key={i * this.props.gridSize + "Y"}
              x={this.props.margin.left}
              y={i * this.props.gridSize}
              label={study}
              sorters={this.props.sorters.length}
              translateY={this.getTranslationY(i)}
              translateX={120}
              id="heatmap-label__study"
            />
          ))}
          {this.props.sorters.map((sorter, i) => (
            <HeatmapLabelXAxis
              key={i * this.props.gridSize + "X"}
              x={i * this.props.gridSize}
              y={0}
              label={sorter}
              index={i}
              translateY={toTop * -1}
              id="heatmap-label__sorter"
            />
          ))}
        </g>
      </div>
    );
  }
}

export default Heatmap;
