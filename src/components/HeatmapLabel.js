import React, { Component } from "react";
import * as d3 from "d3";

class HeatmapLabel extends Component {
  render() {
    // console.log(this.props.y, "🧘");
    // console.log(this.props.x, "✖️");
    return (
      <g transform={this.props.translate} className="label">
        <text
          textAnchor="end"
          x={this.props.x}
          y={this.props.y}
          className={this.props.id}
        >
          {this.props.label}
        </text>
      </g>
    );
  }
}

export default HeatmapLabel;

/*label studies */
// svg
//   .selectAll(".label__study")
//   .data(this.props.studies)
//   .append("text")
//   .text(function(d) {
//     return d;
//   })
//   .attr("x", 0)
//   .attr("y", function(d, i) {
//     return i * this.state.gridSize;
//   })
//   .style("text-anchor", "end")
//   .attr("transform", "translate(-6," + this.state.gridSize / 1.5 + ")")
//   .attr("class", "mono");

/*label sorters */
// svg
//   .selectAll(".label__sorter")
//   .data(this.props.sorters)
//   .enter()
//   .append("text")
//   .text(function(d) {
//     return d;
//   })
//   .attr("x", function(d, i) {
//     return i * gridSize;
//   })
//   .attr("y", 0)
//   .style("text-anchor", "middle")
//   .attr("transform", "translate(" + gridSize / 2 + ", -6)")
//   .attr("class", "mono");
