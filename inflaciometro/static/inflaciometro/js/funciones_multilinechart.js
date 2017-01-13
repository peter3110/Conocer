
// Funcion para crear multiline-chart
function createMultiLineChart() {

  multilinechart_margin = {top: 20, right: 20, bottom: 30, left: 50};
  multilinechart_width = 600;
  multilinechart_height = 300;

  // Seteo las dimensiones del grafico
  multilinechart_xScale = d3.time.scale()
    .range([0, multilinechart_width]);

  multilinechart_yScale = d3.scale
    .linear()
    .range([multilinechart_height, 0]);

  // Seteo los ejes
  multilinechart_xAxis = d3.svg.axis()
  .scale(multilinechart_xScale)
  .orient("bottom");
  
  multilinechart_yAxis = d3.svg.axis()
  .scale(multilinechart_yScale)
  .orient("left");

  // Definicion de las lineas del grafico
  multilinechart_line = d3.svg.line() 
    .x(function(d) { return multilinechart_xScale(d.xAxis); })
    .y(function(d) { return multilinechart_yScale(d.yAxis); });

  // Creacion del MultiLineChart
  multilinechart_svg = d3.select("#multilinechart")
    .append("svg")
      .attr("width", multilinechart_width + multilinechart_margin.left + multilinechart_margin.right)
      .attr("height", multilinechart_height + multilinechart_margin.top + multilinechart_margin.bottom)
    .append("g")
      .attr("transform", "translate(" + multilinechart_margin.left + "," + multilinechart_margin.top + ")");

}