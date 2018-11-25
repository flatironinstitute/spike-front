import React, { Component } from "react";
import * as d3 from "d3";
import HeatmapLabel from "./HeatmapLabel";
import Preloader from "./Preloader";
import Legend from "./Legend";

class Heatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgElem: undefined
    };
    this.legendElementWidth = this.props.gridSize * 0.5;
  }

  componentDidMount() {
    const svg = d3.select("#heatmap-svg");
    this.buildGrid("#react-d3-heatMap", svg, this.props.builtData);
  }

  buildGrid(id, svg, builtData) {
    // TODO: refactor out
    const colors = [
      "#ffffd9",
      "#edf8b1",
      "#c7e9b4",
      "#7fcdbb",
      "#41b6c4",
      "#1d91c0",
      "#225ea8",
      "#253494",
      "#081d58"
    ];
    console.log("🕴️", this.props.builtData, builtData);
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
      .range(colors);

    // TARO TRANSLATION FYI
    // groups = studies = y
    // years = sorters = x

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

    /*plot the heatmap*/
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
      .style("fill", colors[0]);

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

  render() {
    return (
      <div className="heatmap__container" id="react-d3-heatMap">
        <g className="heatmap">
          <svg id="heatmap-svg" />
          {this.props.studies.map((study, i) => (
            <HeatmapLabel
              key={i * this.props.gridSize}
              x={0}
              y={i * this.props.gridSize}
              label={study}
              translate={"translate(-6," + this.props.gridSize / 1.5 + ")"}
              id="heatmap-label__study"
            />
          ))}
          {this.props.sorters.map((sorter, i) => (
            <HeatmapLabel
              key={i * this.props.gridSize}
              x={i * this.props.gridSize}
              y={0}
              label={sorter}
              translate={"translate(" + this.props.gridSize / 2 + ", -6)"}
              id="heatmap-label__sorter"
            />
          ))}
          {/* <Legend colors={colors} width={width} /> */}
        </g>
      </div>
    );
  }
}

export default Heatmap;
