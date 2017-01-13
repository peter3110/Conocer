
// Variables del usuario
var gastoTotalInicial, gastoTotal;
var gastoAlimento, alimentos;
var gastoTransporte, transporte;
var gastoIndumentaria, indumentaria;
var gastoViviendaYServicios, viviendayservicios;
var gastoHogar, hogar;
var gastoSalud, salud;
var gastoEsparcimiento, esparcimiento;
var gastoEducacion, educacion;
var gastoOtros, otros;

var ponderadores;

// Variables generales (para todos los charts)
var color = d3.scale.category20();
var categorias;
var dataset;
var dataset_promedio, dataset_personal;

// Variables para el sidebar
var charts_legend = d3.select('#sidebar');

// Variables para el barchart
var barchart_margin, barchart_width, barchart_height;
var barchart_padding, barchart_outerPadding;
var barchart_y, barchart_x, barchart_xAxis, barchart_yAxis;
var barchart_svg;
var barchart_a, barchart_mid, barchart_w;


// Variables para el line-chart
var linechart_margin, linechart_width, linechart_height;
var linechart_xScale, linechart_yScale, linechart_xAxis, linechart_yAxis;

var linechart_div; // para tooltips
var valueline;
var linechart_svg;
var fecha, general, particular;
var data, data2;

// Variables para el donut-chart
var donut1, donut2;

// Variables para el multiline-chart
var multilinechart_margin, multilinechart_width, multiliechart_height;
var multilinechart_xScale, multilinechart_yScale, multilinechart_xAxis, multilinechart_yAxis;

var dataInf;
var multilinechart_line;
var multilinechart_svg;

/////