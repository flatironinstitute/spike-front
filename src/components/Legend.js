import React, { Component } from "react";
import * as d3 from "d3";

class Legend extends Component {
  componentDidMount() {
    this.updateD3(this.props);
  }

  componentWillUpdate(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    const svg = d3.select("#legend-svg");
    const legendElementWidth = this.props.gridSize * 0.5;
    const height = 100;
    const colors = this.props.colors;

    var colorScale = d3
      .scaleQuantile()
      .domain([
        d3.min(this.props.builtData, function(d) {
          return d.in_range;
        }),
        d3.max(this.props.builtData, function(d) {
          return d.in_range;
        })
      ])
      .range(colors);

    svg.attr("width", this.props.width).attr("height", this.props.height);

    var legend = svg
      .selectAll(".legend")
      .data([0].concat(colorScale.quantiles()), function(d) {
        return d;
      })
      .enter()
      .append("g")
      .attr("class", "legend");

    /*make legend boxes */
    legend
      .append("rect")
      .attr("y", function(d, i) {
        return legendElementWidth * i;
      })
      .attr("x", 0)
      .attr("width", legendElementWidth)
      .attr("height", this.props.gridSize / 2)
      .style("fill", function(d, i) {
        return colors[i];
      });

    /*make legend labels*/
    legend
      .append("text")
      .attr("class", "mono")
      .text(function(d) {
        return "≥ " + Math.round(d);
      })
      .attr("y", function(d, i) {
        return legendElementWidth * i + 19;
      })
      .attr("x", this.props.gridSize / 1.5);
  }

  render() {
    return (
      <div className="legend__container">
        <h4 className="legend__title">Legend</h4>
        <div className="legend__copy">
          <p>Alohamora wand elf parchment, Wingardium Leviosa hippogriff.</p>
        </div>
        <svg id="legend-svg" />
      </div>
    );
  }
}

export default Legend;
