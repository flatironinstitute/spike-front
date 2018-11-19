import React, { Component } from "react";
import * as d3 from "d3";
import d3Tip from "d3-tip";

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
      legendElementWidth = gridSize * 1.5;

    const buckets = 9;
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
        d3.min(this.state.builtData, function(d) {
          return d.in_range;
        }),
        d3.max(this.state.builtData, function(d) {
          return d.in_range;
        })
      ])
      .range(colors);

    // TARO TRANSLATION FYI
    // groups = studies
    // years = sorters

    // Make an SVG with the correct height and width
    var grid = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    /*label studies */
    var studies = svg
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
    var sorters = svg
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
  }

  // TODO: Implement this for results props.
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.color !== nextProps.color) {
  //     return true;
  //   }
  //   if (this.state.count !== nextState.count) {
  //     return true;
  //   }
  //   return false;
  // }

  // async buildViz() {
  //   const builtData = await this.buildData(
  //     600,
  //     800,
  //     true,
  //     [11],
  //     this.props.results
  //   );
  //   this.setState(builtData);
  //   if (builtData.length) {
  //     const svg = d3.select(this.state.svgElem);
  //     this.buildGrid("#react-d3-heatMap", 600, 800, true, [12], svg, builtData);
  //   }
  // }

  // async buildData(gridWidth, gridHeight, square, dims, results) {
  //   var builtData = [];
  //   var gridItemWidth = dims[0];
  //   var gridItemHeight = square ? gridItemWidth : dims[1];
  //   var startX = gridItemWidth; // / 2;
  //   var startY = gridItemHeight / 2;
  //   var stepX = gridItemWidth;
  //   var stepY = gridItemHeight;
  //   var xpos = startX;
  //   var ypos = startY;

  //   let reOrgs = [];
  //   this.props.studies.forEach(study => {
  //     reOrgs.push(results.filter(res => res.study === study));
  //   });

  //   //parent array
  //   for (var index_a = 0; index_a < reOrgs.length; index_a++) {
  //     builtData.push([]);
  //     //nested array
  //     for (var index_b = 0; index_b < reOrgs[index_a].length; index_b++) {
  //       // formerly suitecount
  //       let studyName = reOrgs[index_a][index_b].study;
  //       // formerly patientcount
  //       let inRange = reOrgs[index_a][index_b].in_range;
  //       // formerly percentageLT
  //       let sorterName = reOrgs[index_a][index_b].sorter;

  //       let newObj = {
  //         study: studyName,
  //         in_range: inRange,
  //         width: gridItemWidth,
  //         height: gridItemHeight,
  //         x: xpos,
  //         y: ypos,
  //         sorter: sorterName
  //       };
  //       builtData[index_a].push(newObj);
  //       xpos += stepX;
  //     }
  //     xpos = startX;
  //     ypos += stepY;
  //   }

  //   return builtData;
  // }

  // getMaxNum() {
  //   let rangeCounts = this.props.results.map(study => study.in_range);
  //   return d3.max(rangeCounts);
  // }

  // buildGrid(id, width, height, square, dims, svg, builtData) {
  //   // TODO: reconfigure this function be called on the individual row level.
  //   const maxNum = this.getMaxNum();
  //   const domainScale = [
  //     0,
  //     1,
  //     Math.round(maxNum / 5),
  //     Math.round(maxNum / 4),
  //     Math.round(maxNum / 3),
  //     Math.round(maxNum / 2),
  //     maxNum
  //   ];

  //   const colorRange = ["#384CA2", "#AE9567"];
  //   let color = d3
  //     .scaleLinear()
  //     .domain(domainScale)
  //     .range(colorRange);

  //   var tip = d3Tip()
  //     .attr("class", "d3-tip")
  //     .html(function(d) {
  //       return (
  //         "<span style='bg-color:#CCCCCC;font-size:12;font-color:#555;opacity:.8;'>" +
  //         d +
  //         " above the accuracy threshold</span>"
  //       );
  //     });

  //   var grid = svg
  //     .attr("width", width)
  //     .attr("height", height)
  //     .attr("class", "grid")
  //     .call();

  //   var row = grid
  //     .selectAll(".row")
  //     .data(builtData)
  //     .enter()
  //     .append("svg:g")
  //     .attr("className", "row");

  //   var col = row
  //     .selectAll(".cell")
  //     .data(function(d) {
  //       return d;
  //     })
  //     .enter()
  //     .append("svg:rect")
  //     .attr("class", "cell")
  //     .attr("x", function(d) {
  //       return d.x;
  //     })
  //     .attr("y", function(d) {
  //       return d.y;
  //     })
  //     .attr("width", function(d) {
  //       return d.width;
  //     })
  //     .attr("height", function(d) {
  //       return d.height;
  //     })
  //     .on("mouseover", function(d) {
  //       d3.select(this)
  //         .style("stroke", "rgb(255,0,0)")
  //         .style("stroke-width", "2.5px")
  //         .style("border", "1px solid #FFFFFF")
  //         .style("padding", "2px");
  //       tip.show(d.in_range);
  //     })
  //     .on("mouseout", function(d) {
  //       d3.select(this)
  //         .style("stroke", "#555")
  //         .style("stroke-width", "1px")
  //         .style("border", "1px solid #DDDDDD")
  //         .style("padding", "1px");
  //       tip.hide(d.in_range);
  //     })
  //     .on("click", function() {
  //       console.log(d3.select(this));
  //     })
  //     .style("fill", function(d) {
  //       return color(d.in_range);
  //     })
  //     .style("stroke", "#555");

  //   var text = row
  //     .selectAll(".label")
  //     .data(function(d) {
  //       return d;
  //     })
  //     .enter()
  //     .append("svg:text")
  //     .transition()
  //     .duration(2500)
  //     .delay(500)
  //     .attr("x", function(d) {
  //       return d.x + d.width / 2;
  //     })
  //     .attr("y", function(d) {
  //       return d.y + d.height / 2;
  //     })
  //     .attr("text-anchor", "middle")
  //     .attr("dy", ".35em")
  //     .text(function(d) {
  //       return d.in_range;
  //     });

  //   // top label for the y axis
  //   grid
  //     .append("text")
  //     .attr("x", 0)
  //     .attr("y", 20)
  //     .style("text-anchor", "left")
  //     .text("Studies");

  //   //build side labels for the y axis
  //   let nextStartY = dims[0] + 5; //20 + 15 + Math.round(dims[0]/2)
  //   for (let obj in builtData) {
  //     grid
  //       .append("text")
  //       .attr("x", 20)
  //       .attr("y", nextStartY + (nextStartY - 5) * obj)
  //       .style("text-anchor", "left")
  //       .text(builtData[obj][0].study);
  //   }

  //   // build label for the x axis
  //   // use the length of the first nested array to determine how many (aka range)
  //   let nextStartX = dims[0] - 5;
  //   nextStartY = height - 2;
  //   console.log("🗺️ BUILT DATA IN bUILD GRID", builtData);
  //   for (var i = 0; i < builtData[0].length + 1; i++) {
  //     grid
  //       .append("text")
  //       .attr("x", function() {
  //         var ret = nextStartX;
  //         // TODO: use variable
  //         nextStartX += 11; //(i === 0 ? (ret + 55) : (ret + 60));
  //         return ret;
  //       })
  //       .attr("y", nextStartY)
  //       .style("text-anchor", "bottom")
  //       .text(i > 0 ? i * 10 + "%" : i); //special req to account for "less than 10%"
  //   }

  //   grid
  //     .append("text")
  //     .attr("x", (nextStartX -= 50))
  //     .attr("y", (nextStartY -= 30))
  //     .style("text-anchor", "left")
  //     .text("Uncontrolled");

  //   grid
  //     .append("text")
  //     .attr("x", nextStartX)
  //     .attr("y", (nextStartY += 15))
  //     .style("text-anchor", "left")
  //     .text("Care Opportunities");
  // }

  // PROPS
  // studies
  // sorters
  // results

  render() {
    console.log("🐙", this.props.sorters, this.props.studies);
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
