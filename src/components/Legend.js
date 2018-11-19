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
      .text(function(d) {
        return "≥ " + Math.round(d);
      })
      .attr("x", function(d, i) {
        return legendElementWidth * i;
      })
      .attr("y", height / 1.8 + gridSize);
  }