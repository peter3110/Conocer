
function updateLineChart() {
  // =========================================================================
  linechart_svg.selectAll("*").remove();

  // toma como referencia la data general
  var xxa = d3.extent(data, function(d) { return d.xAxis; })
  var xxb = d3.extent(data2, function(d) { return d.xAxis; })
  linechart_xScale.domain(
    [d3.min([xxa[0],xxb[0]]), d3.max([xxa[1],xxb[1]])]
  );

  var yya = d3.extent(data, function(d) { return d.yAxis; });
  var yyb = d3.extent(data2, function(d) { return d.yAxis; });
  linechart_yScale.domain(
    [d3.min([yya[0],yyb[0]]), d3.max([yya[1],yyb[1]])]
  );

  // Las curvas: la azul (general) y la roja (particular)
  linechart_svg
    .append("path")
    .attr("class", "line")
    .style("stroke", "blue")
    .attr("d", valueline(data));

  linechart_svg
    .append("path")
      .attr("class", "line")
      .style("stroke", "red")
      .attr("d", valueline(data2));

  // Agrego tooltips
  linechart_svg.selectAll("dot")
    .data(data)
  .enter().append("circle")
    .attr("r", 3) 
    .attr("cx", function(d) { return linechart_xScale(d.xAxis); })     
    .attr("cy", function(d) { return linechart_yScale(d.yAxis); })
    .on("mouseover", function(d) {    
      linechart_div.transition()    
          .duration(200)    
          .style("opacity", .9);    
      linechart_div.html("Gasto: " + d3.format(",.4r")(d.yAxis))  
          .style("left", 100 + "px")   
          .style("top", 100 + "px");  
      })          
    .on("mouseout", function(d) {   
      linechart_div.transition()    
          .duration(500)    
          .style("opacity", 0); 
    });


  linechart_svg.selectAll("dot")
    .data(data2)
  .enter().append("circle")
    .attr("r", 3) 
    .attr("cx", function(d) { return linechart_xScale(d.xAxis); })     
    .attr("cy", function(d) { return linechart_yScale(d.yAxis); })
    .on("mouseover", function(d) {    
      linechart_div.transition()    
          .duration(200)    
          .style("opacity", .9);    
      linechart_div.html("Gasto: " + d3.format(",.4r")(d.yAxis))  
          .style("left", 100 + "px")   
          .style("top", 100 + "px");  
      })          
    .on("mouseout", function(d) {   
      linechart_div.transition()    
          .duration(500)    
          .style("opacity", 0); 
    });


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
}