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

  async buildViz() {
    const builtData = await this.buildData(
      600,
      800,
      true,
      [11],
      this.props.results
    );
    this.setState(builtData);
    if (builtData.length) {
      const svg = d3.select(this.state.svgElem);
      this.buildGrid("#react-d3-heatMap", 600, 800, true, [11], svg, builtData);
    }
  }

  async buildData(gridWidth, gridHeight, square, dims, results) {
    var builtData = [];
    var gridItemWidth = dims[0];
    var gridItemHeight = square ? gridItemWidth : dims[1];
    var startX = gridItemWidth; // / 2;
    var startY = gridItemHeight / 2;
    var stepX = gridItemWidth;
    var stepY = gridItemHeight;
    var xpos = startX;
    var ypos = startY;

    let reOrgs = [];
    this.props.studies.forEach(study => {
      reOrgs.push(results.filter(res => res.study === study));
    });

    //parent array
    for (var index_a = 0; index_a < reOrgs.length; index_a++) {
      builtData.push([]);
      //nested array
      for (var index_b = 0; index_b < reOrgs[index_a].length; index_b++) {
        // formerly suitecount
        let studyName = reOrgs[index_a][index_b].study;
        // formerly patientcount
        let inRange = reOrgs[index_a][index_b].in_range;
        // formerly percentageLT
        let sorterName = reOrgs[index_a][index_b].sorter;

        builtData[index_a].push({
          study: studyName,
          in_range: inRange,
          width: gridItemWidth,
          height: gridItemHeight,
          x: xpos,
          y: ypos,
          sorter: sorterName
        });
        xpos += stepX;
      }
      xpos = startX;
      ypos += stepY;
    }

    return builtData;
  }

  getMaxNum() {
    let rangeCounts = this.props.results.map(study => study.in_range);
    return d3.max(rangeCounts);
  }

  buildGrid(id, width, height, square, dims, svg, builtData) {
    // TODO: reconfigure this function be called on the individual row level.
    const maxNum = this.getMaxNum();
    const domainScale = [
      0,
      1,
      Math.round(maxNum / 5),
      Math.round(maxNum / 4),
      Math.round(maxNum / 3),
      Math.round(maxNum / 2),
      maxNum
    ];
    const colorRange = ["#384CA2", "#AE9567"];

    let color = d3
      .scaleLinear()
      .domain(domainScale)
      .range(["#384CA2", "#AE9567"]);

    // TODO: why is color returning a function.
    // console.log("🖥️", domainScale, color);

    var tip = d3Tip()
      .attr("class", "d3-tip")
      .html(function(d) {
        return (
          "<span style='bg-color:#CCCCCC;font-size:12;font-color:#555;opacity:.8;'>" +
          d +
          " above the accuracy threshold</span>"
        );
      });

    var grid = svg
      .attr("width", width)
      .attr("height", height)
      .attr("class", "grid")
      .call(tip);

    var row = grid
      .selectAll(".row")
      .data(builtData)
      .enter()
      .append("svg:g")
      .attr("class", "row");

    var col = row
      .selectAll(".cell")
      .data(function(d) {
        return d;
      })
      .enter()
      .append("svg:rect")
      .attr("class", "cell")
      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      })
      .attr("width", function(d) {
        return d.width;
      })
      .attr("height", function(d) {
        return d.height;
      })
      .on("mouseover", function(d) {
        d3.select(this)
          .style("stroke", "rgb(255,0,0)")
          .style("stroke-width", "2.5px")
          .style("border", "1px solid #FFFFFF")
          .style("padding", "2px");
        tip.show(d.in_range);
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .style("stroke", "#555")
          .style("stroke-width", "1px")
          .style("border", "1px solid #DDDDDD")
          .style("padding", "1px");
        tip.hide(d.in_range);
      })
      .on("click", function() {
        console.log(d3.select(this));
      })
      .style("fill", function(d) {
        return color(d.in_range);
      })
      .style("stroke", "#555");

    var text = row
      .selectAll(".label")
      .data(function(d) {
        return d;
      })
      .enter()
      .append("svg:text")
      .transition()
      .duration(2500)
      .delay(500)
      .attr("x", function(d) {
        return d.x + d.width / 2;
      })
      .attr("y", function(d) {
        return d.y + d.height / 2;
      })
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .text(function(d) {
        return d.in_range;
      });

    // top label for the y axis
    grid
      .append("text")
      .attr("x", 0)
      .attr("y", 20)
      .style("text-anchor", "left")
      .text("Studies");

    //build side labels for the y axis
    let nextStartY = dims[0] + 5; //20 + 15 + Math.round(dims[0]/2)
    for (let obj in builtData) {
      grid
        .append("text")
        .attr("x", 20)
        .attr("y", nextStartY + (nextStartY - 5) * obj)
        .style("text-anchor", "left")
        .text(builtData[obj][0].study);
    }

    // build label for the x axis
    // use the length of the first nested array to determine how many (aka range)
    let nextStartX = dims[0] - 5;
    nextStartY = height - 2;
    console.log("🐖 BUILT DATA IN bUILD GRID", builtData[0]);
    for (var i = 0; i < builtData[0].length + 1; i++) {
      grid
        .append("text")
        .attr("x", function() {
          var ret = nextStartX;
          nextStartX += 59; //(i === 0 ? (ret + 55) : (ret + 60));
          return ret;
        })
        .attr("y", nextStartY)
        .style("text-anchor", "bottom")
        .text(i > 0 ? i * 10 + "%" : i); //special req to account for "less than 10%"
    }

    grid
      .append("text")
      .attr("x", (nextStartX -= 50))
      .attr("y", (nextStartY -= 30))
      .style("text-anchor", "left")
      .text("Uncontrolled");

    grid
      .append("text")
      .attr("x", nextStartX)
      .attr("y", (nextStartY += 15))
      .style("text-anchor", "left")
      .text("Care Opportunities");
  }

  // PROPS
  // studies
  // sorters
  // results

  render() {
    return (
      <div className="heatmap" id="react-d3-heatMap">
        <svg
          ref={elem => {
            if (!this.state.svgElem) this.setState({ svgElem: elem });
          }}
        />
      </div>
    );
  }
}

export default Heatmap;
