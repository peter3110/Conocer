

// Creacion del BarChart
createBarChart();

// Creacion del LineChart
createLineChart()

// Creacion del MultiLineChart
createMultiLineChart()

// Creacion del DonutChart
createDonutCharts();

// Inicializacion de todos los charts
updateLineChart();
updateMultiLineChart();
updateDonutChart();

// Inicializacion del texto para el gasto total
d3.select("output#gastoTotal").text(d3.format(".1f")(gastoTotal));
