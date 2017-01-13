
// Funcion para crear line-chart
function createLineChart() {

  linechart_margin = {top: 20, right: 20, bottom: 30, left: 50};
  linechart_width = 600;
  linechart_height = 300;

  // Seteo las dimensiones del grafico
  linechart_xScale = d3.time.scale()
  .range([0, linechart_width])

  linechart_yScale = d3.scale
  .linear()
  .range([linechart_height - 20, 20]);

  // Seteo los ejes
  linechart_xAxis = d3.svg.axis()
  .scale(linechart_xScale)
  .orient("bottom");

  linechart_yAxis = d3.svg.axis()
  .scale(linechart_yScale)
  .orient("left");

  // Creacion de las curvas
  valueline = d3.svg.line()
  .x(function(d) { return linechart_xScale(d.xAxis); })
  .y(function(d) { return linechart_yScale(d.yAxis); });

  // Creacion de los tooltip
  // Define 'div' for tooltips
  linechart_div = d3.select("#linechart")
    .append("div")               // declare the tooltip div 
      .attr("class", "tooltip")  // apply the 'tooltip' class
      .style("opacity", 0); 


  // Creacion del chart propiamente dicho
  linechart_svg = d3.select("#linechart")
    .append("svg")
      .attr("width", linechart_width + linechart_margin.left + linechart_margin.right)
      .attr("height", linechart_height + linechart_margin.top + linechart_margin.bottom)
    .append("g")
      .attr("transform", "translate(" + linechart_margin.left + "," + linechart_margin.top + ")");

}