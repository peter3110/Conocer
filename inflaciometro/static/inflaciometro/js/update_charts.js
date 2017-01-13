
$('#personal-vs-promedio').change(function() {
   donut1.update(genDonutData("Personal"));
   donut2.update(genDonutData("Promedio")); 
});

// Funcion para updatear los charts segun el valor de los sliders
function updateCharts() {
//

  // =========================================================================
  // Updateo el donutchart
  donut1.update(genDonutData("Personal"));
  donut2.update(genDonutData("Promedio"));


  // =========================================================================
  // Updateo el linechart
  linechart_svg.selectAll("*").remove();

  linechart_xScale.domain(d3.extent(data, function(d) { return d.xAxis; }));
  linechart_yScale.domain(d3.extent(data, function(d) { return d.yAxis; }));

  linechart_xScale.domain(d3.extent(data2, function(d) { return d.xAxis; }));
  linechart_yScale.domain(d3.extent(data2, function(d) { return d.yAxis; }));

  // Las curvas: la azul (general) y la roja (particular)
  linechart_svg
    .append("path")
    .datum(data)
    .attr("class", "line")
    .style("stroke", "blue")
    .attr("d", linechart_general);

  linechart_svg
    .append("path")
    .datum(data2)
    .attr("class", "line")
    .style("stroke", "red")
    .attr("d", linechart_particular);

  // Actualizo los ejes
  linechart_svg
    .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + linechart_height + ")")
      .call(linechart_xAxis);

  linechart_svg
    .append("g")
      .attr("class", "y axis")
      .call(linechart_yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Gastos");


  // =========================================================================
  // Updateo el MultiLine Chart
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

//
}


