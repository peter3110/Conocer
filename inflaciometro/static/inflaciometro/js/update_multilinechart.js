
function updateMultiLineChart() {
  multilinechart_svg.selectAll("*").remove();
  categorias.forEach(function(cat, i) {
    multilinechart_xScale.domain(d3.extent(dataInf[cat], function(d) { return d.xAxis; }));
    multilinechart_yScale.domain(d3.extent(dataInf[cat], function(d) { return d.yAxis; }));
  });

  // Las curvas
  categorias.forEach(function(cat, i) {
    multilinechart_svg
      .append("path")
        .datum(dataInf[cat])
        .attr("class", "line")
        .style("stroke", function() {
          return color(i);
        })
        .attr("d", multilinechart_line);
  });

    // Actualizo los ejes
  multilinechart_svg
    .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + multilinechart_height + ")")
      .call(multilinechart_xAxis);

  multilinechart_svg
    .append("g")
      .attr("class", "y axis")
      .call(multilinechart_yAxis);
}