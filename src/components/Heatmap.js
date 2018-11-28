import React, { Component } from "react";
import * as d3 from "d3";
import HeatmapLabelYAxis from "./HeatmapLabelYAxis";
import HeatmapLabelXAxis from "./HeatmapLabelXAxis";
import Legend from "./Legend";

class Heatmap extends Component {
  constructor(props) {
    super(props);
    // TODO: refactor out and replace colors.
    this.state = {
      colors: [
        "#ffffd9",
        "#edf8b1",
        "#c7e9b4",
        "#7fcdbb",
        "#41b6c4",
        "#1d91c0",
        "#225ea8",
        "#253494",
        "#081d58"
      ]
    };
  }

  componentDidMount() {
    const svg = d3.select("#heatmap-svg");
    this.buildGrid(svg, this.props.builtData);
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
      .range(this.state.colors);

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
      .style("fill", this.state.colors[0]);

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
    const copyHeight = 19 * index + 9;
    const translation = this.props.gridSize * index + halfGrid + copyHeight;
    return translation * -1;
  }

  render() {
    const toTop = this.props.height + 300;
    return (
      <div className="container container__heatmap--row">
        <div className="heatmap__legend col--2">
          <Legend
            gridSize={this.props.gridSize}
            colors={this.state.colors}
            builtData={this.props.builtData}
            width={this.props.width}
            height={this.props.height}
          />
        </div>
        <div className="heatmap__col col--6">
          <g className="heatmap">
            <svg id="heatmap-svg" />
            {this.props.studies.map((study, i) => (
              <HeatmapLabelYAxis
                key={i * this.props.gridSize + "Y"}
                x={0}
                y={i * this.props.gridSize}
                label={study}
                translateY={this.getTranslationY(i)}
                translateX={20}
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
        {/* TODO: Refactor into a separate component */}
        <div className="unitdetail col--4">
          <h4 className="unitdetail__title">Detail View TK</h4>
          <div className="unitdetail__copy">
            <ul className="unitdetail__list">
              <li>firing_rate: 2.33</li>
              <li>in_range: 80</li>
              <li>num_events: 1398</li>
              <li>peak_channel: 0</li>
              <li>recording: "001_synth"</li>
              <li>snr: 25.396783859187707</li>
              <li>sorter: "MountainSort4-thr3"</li>
              <li>study: "magland_synth_noise10_K10_C4"</li>
            </ul>
            <p>
              Boggarts lavender robes, Hermione Granger Fantastic Beasts and
              Where to Find Them. Bee in your bonnet Hand of Glory elder wand,
              spectacles House Cup Bertie Bott’s Every Flavor Beans Impedimenta.
              Stunning spells tap-dancing spider Slytherin’s Heir mewing kittens
              Remus Lupin. Palominos scarlet train black robes, Metamorphimagus
              Niffler dead easy second bedroom. Padma and Parvati Sorting Hat
              Minister of Magic blue turban remember my last.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Heatmap;
