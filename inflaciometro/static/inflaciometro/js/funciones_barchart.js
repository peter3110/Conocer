
//https://bl.ocks.org/cool-Blue/418d3f6d91915602e4fd
var barchart_data = [
  {'name': 'Alimentos',            'value': .05, 'gasto': 50., 'index': 1},
  {'name': 'Indumentaria',         'value': .30, 'gasto': 200., 'index': 2},
  {'name': 'Vivienda y servicios', 'value': .15, 'gasto': 30., 'index': 3},
  {'name': 'Hogar',                'value': .05, 'gasto': 150., 'index': 4},
  {'name': 'Salud',                'value': .10, 'gasto': 30., 'index': 5},
  {'name': 'Transporte',           'value': .20, 'gasto': 60., 'index': 6},
  {'name': 'Esparcimiento',        'value': .35, 'gasto': 400., 'index': 7},
  {'name': 'Educacion',            'value': .10, 'gasto': 300., 'index': 8},
  {'name': 'Otros',                'value': .20, 'gasto': 300., 'index': 9},
];

function createBarChart() {
  var n, total, w, op;

  // Creacion del barchart
  barchart_margin = {top: 80, right: 180, bottom: 80, left: 180};
  barchart_width = 960 - barchart_margin.left - barchart_margin.right;
  barchart_height = 500 - barchart_margin.top - barchart_margin.bottom;

  barchart_padding = 0.1;
  barchart_outerPadding = 0.3;
  barchart_x = d3.scale.ordinal()
    .rangeRoundBands([0, barchart_width], barchart_padding, barchart_outerPadding);

  barchart_y = d3.scale.linear()
    .range([barchart_height, 0]);

  barchart_xAxis = d3.svg.axis()
    .scale(barchart_x)
    .orient("bottom");

  barchart_yAxis = d3.svg.axis()
    .scale(barchart_y)
    .orient("left")
    .ticks(5, "%");

  barchart_svg = d3.select("#barchart")
    .append("svg")
      .attr("width", barchart_width + barchart_margin.left + barchart_margin.right)
      .attr("height", barchart_height + barchart_margin.top + barchart_margin.bottom)
    .append("g")
      .attr("transform", "translate(" + barchart_margin.left + "," + barchart_margin.top + ")");

  // Genero el barchart 
  barchart_a = alpha(barchart_data, v);   //scale factor between value and bar width
  barchart_w = Wi(barchart_data, v, barchart_a);

  // ANCHO DE BARRAS
  barchart_mid = Midi(barchart_data, function(d, i) {
    return +(bar_width(d, i));
  } , barchart_a); //mid-point displacement of bar i

  barchart_x.range(barchart_data.map(barchart_mid)); //force irregular intervals based on value
  barchart_x.domain(barchart_data.map(function (d) {
    return d.index;//'Gasto en '+ d.name;
  }));
  barchart_y.domain([0, d3.max(barchart_data, v)]);

  barchart_svg.append("text")
    .attr("class", "title")
    .attr("x", barchart_x(barchart_data[0].name))
    .attr("y", -26)
    .attr("shape-rendering", "crispEdges")
    .text("La inflacion por categorias: (el area representa tu gasto total mensual)");

  barchart_svg
    .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + 0 + "," + barchart_height + ")")
      .call(barchart_xAxis)
    .selectAll(".tick text")
      .call(wrap, function (d, i) {
        return barchart_w(i);
      });

    barchart_svg.append("g")
      .attr("class", "y axis")
      .call(barchart_yAxis);
    barchart_svg.selectAll(".bar")
      .data(barchart_data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("d", "bar")
          .style("fill", function(d,i) {
            return color(i);
          })
        .attr("x", function (d, i) {
          return barchart_x(d.name) - barchart_a * (bar_width(d,i))/2; //center the bar on the tick
        })
        //using x.range sets x.rangeBands to zero, compute width as a function of value
        .attr("width", barchart_x.rangeBand() || function (d, i) {
          return barchart_a * bar_width(d, i); //`a` already accounts for both types of padding
        })
        .attr("y", function (d) {
          return barchart_y(d.value);
        })
        .attr("height", function (d) {
          return barchart_height - barchart_y(d.value);
        });

  // Funciones auxiliares
  function bar_width(d, i) {
    return d.gasto / d3.sum($.map(barchart_data, function(e,h) {
          return [e.gasto];
    }))
  }

  function type(d) {
    d.value = +d.value;
    return d;
  }
  function v(d) {
    return +d.value;
  }

  //scale factor between value and bar width
  function alpha(values, value) {
    n = values.length;
    total = d3.sum(values, value);
    return (barchart_width - (n - 1) * barchart_padding * barchart_width / n - 2 * barchart_outerPadding * barchart_width / n) / total
  }
  function Wi(values, value, alpha) {
    return function (i) {
      return value(values[i]) * alpha
    }
  }
  //mid-point displacement of bar i: Midi(barchart_data, v, barchart_a)
  function Midi(values, value, alpha) {
    w = Wi(values, value, alpha);
    n = values.length;
    return function (_, i) {
      op = barchart_outerPadding * barchart_width / n;
      p = barchart_padding * barchart_width / n;
      return (op + w(i) / 2) + d3.sum(values.slice(0, i), value) * alpha;//+ i * p (agregar para separar barras)
    }
  }

  function wrap(text, width) {
    text.each(function (d, i) {
      var text = d3.select(this),
        words = text.html(d).text().split(/\s+/).reverse(), //reset html to clear any tspans added before
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em"),
      //[edit]add dWidth
        dWidth = typeof width === "function" ? width(d, i) : width;
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > dWidth/*[edit]*/) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }
}









