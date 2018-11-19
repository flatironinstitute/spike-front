import React, { Component } from "react";
import * as d3 from "d3";

class Heatmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      svgElem: undefined,
      builtData: []
    };
  }

  componentDidMount() {
    if (!this.state.builtData.length) {
      this.buildViz();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.results !== nextProps.results) {
      return true;
    }
    return false;
  }

  async buildViz() {
    const builtData = await this.buildData();
    this.setState(builtData);
    if (builtData.length) {
      const svg = d3.select(this.state.svgElem);
      this.buildGrid("#react-d3-heatMap", svg, builtData);
    }
  }

  buildData() {
    return this.props.results.map(result => {
      return {
        study: result.study,
        in_range: result.in_range,
        sorter: result.sorter
      };
    });
  }

  buildGrid(id, svg, builtData) {
    var margin = { top: 50, right: 0, bottom: 100, left: 226 },
      width = 1024 - margin.left - margin.right,
      height = 830 - margin.top - margin.bottom,
      gridSize = Math.floor(width / 4),
      legendElementWidth = gridSize * 0.5;

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
    // groups = studies
    // years = sorters

    // Make an SVG with the correct height and width
    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /*label studies */
    svg
      .selectAll(".label__study")
      .data(this.props.studies)
      .enter()
      .append("text")
      .text(function(d) {
        return d;
      })
      .attr("x", 0)
      .attr("y", function(d, i) {
        return i * gridSize;
      })
      .style("text-anchor", "end")
      .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
      .attr("className", "mono");

    /*label sorters */
    svg
      .selectAll(".label__sorter")
      .data(this.props.sorters)
      .enter()
      .append("text")
      .text(function(d) {
        return d;
      })
      .attr("x", function(d, i) {
        return i * gridSize;
      })
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize / 2 + ", -6)")
      .attr("className", "mono");

    /*plot the heatmap*/
    // TODO refactor dis
    let sortersArr = this.props.sorters;
    let studiesArr = this.props.studies;
    var heatMap = svg
      .selectAll(".sorter")
      .data(builtData)
      .enter()
      .append("rect")
      .attr("x", function(d, i) {
        return sortersArr.indexOf(d.sorter) * gridSize;
      })
      .attr("y", function(d) {
        return (studiesArr.indexOf(d.study) + 0.25) * gridSize;
      })
      .attr("rx", 4)
      .attr("ry", 4)
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

    // TODO: Refactor into a new function
    /*make legend using colors */
    var legend = svg
      .selectAll(".legend")
      .data([0].concat(colorScale.quantiles()), function(d) {
        return d;
      })
      .enter()
      .append("g")
      .attr("className", "legend");

    /*make legend boxes */
    legend
      .append("rect")
      .attr("x", function(d, i) {
        return legendElementWidth * i;
      })
      .attr("y", height / 1.8)
      .attr("width", legendElementWidth)
      .attr("height", gridSize / 2)
      .style("fill", function(d, i) {
        return colors[i];
      });

    /*make legend labels*/
    legend
      .append("text")
      .attr("className", "mono")
      .data(builtData)
      .text(function(d) {
        console.log(d, typeof d, "🌭");
        return "≥ " + Math.round(d);
      })
      .attr("x", function(d, i) {
        return legendElementWidth * i;
      })
      .attr("y", height / 1.8 + gridSize);
  }
  render() {
    return (
      <div className="heatmap" id="react-d3-heatMap">
        <g>
          <svg
            ref={elem => {
              if (!this.state.svgElem) this.setState({ svgElem: elem });
            }}
          />
        </g>
      </div>
    );
  }
}

export default Heatmap;
