
// ============================= Calcula para cada usuario sus gastos tirados hacia atras =========================//
function calcular_gasto_ponderado(i) {
  return transporte * inflacion["Transporte y comunicaciones"][i] +
    alimentos * inflacion["Alimentos"][i] +
    indumentaria * inflacion["Indumentaria"][i] +
    viviendayservicios * inflacion["Vivienda y servicios"][i] +
    hogar * inflacion["Equipamiento y mantenimiento del hogar"][i] +
    salud * inflacion["Salud"][i] +
    esparcimiento * inflacion["Esparcimiento"][i] +
    educacion * inflacion["Educacion"][i] +
    otros * inflacion["Otros"][i];
}

// ============================= Inicializa y arma los sliders =========================//

var createSidebar = function(dataset) {

  var getCatNames = function(dataset) {
    var catNames = new Array();
    for (var i = 0; i < dataset[0].data.length; i++) {
      catNames.push(dataset[0].data[i].cat);
    }
    return catNames;
  };
  var catNames = getCatNames(dataset);
  
  var legends = charts_legend
    .selectAll('p')
    .data(catNames)
    .enter().append('p')
      .attr('display', 'inline-block');

  var item_height = 18;
  var item_width = 170;
  var circle_big_r = 8;
  var circle_small_r = 5;

  legends
    .append('svg')
      .attr('height',item_height)
      .attr('width', item_width)
      .append('circle')
        .attr('class', 'legend-icon')
        .attr('id', function(d,i) {return 'tag'+i; })
        .attr('transform', 'translate(10,8.5)')
        .attr('r', circle_small_r)
        .style('fill', function(d, i) {
           return color(i);
        });

  legends.selectAll('svg').append('text')
    .attr('transform', 'translate(10,10)')
    .attr('dx', '1em')
    .attr('dy', '.3em')
    .text(function(d) {
      if(d=="transporte") return "Gasto en Transporte"
      if(d=="alimentos") return "Gasto en Alimentos";
      if(d=="viviendayservicios") return "Gasto en vivienda y servicios";
      if(d=="hogar") return "Gasto en Hogar";
      if(d=="salud") return "Gasto en Salud";
      if(d=="indumentaria") return "Gasto en Indumentaria";
      if(d=="esparcimiento") return "Gasto en Esparcimiento";
      if(d=="otros") return "Gasto en Otros";
      if(d=="educacion") return "Gasto en Educacion";
    });

  legends.append('output')
    .attr('id', function(d, i) {
      return d;
    })
    .text(function(d, i) {
      if(d=="transporte") return d3.format(",.4r")(transporte);
      if(d=="alimentos") return d3.format(",.4r")(alimentos);
      if(d=="viviendayservicios") return d3.format(",.4r")(viviendayservicios);
      if(d=="hogar") return d3.format(",.4r")(hogar);
      if(d=="salud") return d3.format(",.4r")(salud);
      if(d=="indumentaria") return d3.format(",.4r")(indumentaria);
      if(d=="esparcimiento") return d3.format(",.4r")(esparcimiento);
      if(d=="otros") return d3.format(",.4r")(otros);
      if(d=="educacion") return d3.format(",.4r")(educacion);
    });

  legends.append('input')
    .attr('min', '0')
    .attr('max', '' + gastoTotalInicial)
    .attr('value', function(d, i) {return '' + ponderadores[d] * gastoTotalInicial } )
    .attr('step', '100')
    .attr('id',  function(d, i) {
      return d; 
    })
    .attr('type', 'range')
    .attr('onchange', function(d,i) {

      // Updateo la data en funcion del input en los sliders 
      d3.select("input[type=range]#"+d).on("input", function() {
        if(d=="transporte") { 
          gastoTotal = gastoTotal - transporte + parseInt(this.value);
          transporte = parseInt(this.value);
          
          d3.select("output#transporte").text(d3.format(",.4r")(transporte));
          data.forEach(function(val, i) { 
            data[i].yAxis = gastoTotal * inflacion["General"][i];
            data2[i].yAxis = calcular_gasto_ponderado(i);
            particular[i] = data2[i].yAxis;
          });
        }else if(d=="alimentos") { 
          gastoTotal = gastoTotal - alimentos + parseInt(this.value);
          alimentos = parseInt(this.value);
          d3.select("output#alimentos").text(d3.format(",.4r")(alimentos));
          data.forEach(function(val, i) {
            data[i].yAxis = gastoTotal * inflacion["General"][i];
            data2[i].yAxis = calcular_gasto_ponderado(i);
            particular[i] = data2[i].yAxis;
          });
        }else if(d=="viviendayservicios") { 
          gastoTotal = gastoTotal - viviendayservicios + parseInt(this.value);
          viviendayservicios = parseInt(this.value);
          d3.select("output#viviendayservicios").text(d3.format(",.4r")(viviendayservicios));
          data.forEach(function(val, i) {
            data[i].yAxis = gastoTotal * inflacion["General"][i];
            data2[i].yAxis = calcular_gasto_ponderado(i);
            particular[i] = data2[i].yAxis;
          });
        }else if(d=="indumentaria") { 
          gastoTotal = gastoTotal - indumentaria + parseInt(this.value);
          indumentaria = parseInt(this.value);
          d3.select("output#indumentaria").text(d3.format(",.4r")(indumentaria));
          data.forEach(function(val, i) {
            data[i].yAxis = gastoTotal * inflacion["General"][i];
            data2[i].yAxis = calcular_gasto_ponderado(i);
            particular[i] = data2[i].yAxis;
          });
        }else if(d=="hogar") { 
          gastoTotal = gastoTotal - hogar + parseInt(this.value);
          hogar = parseInt(this.value);
          d3.select("output#hogar").text(d3.format(",.4r")(hogar));
          data.forEach(function(val, i) {
            data[i].yAxis = gastoTotal * inflacion["General"][i];
            data2[i].yAxis = calcular_gasto_ponderado(i);
            particular[i] = data2[i].yAxis;
          });
        }else if(d=="salud") { 
          gastoTotal = gastoTotal - salud + parseInt(this.value);
          salud = parseInt(this.value);
          d3.select("output#salud").text(d3.format(",.4r")(salud));
          data.forEach(function(val, i) {
            data[i].yAxis = gastoTotal * inflacion["General"][i];
            data2[i].yAxis = calcular_gasto_ponderado(i);
            particular[i] = data2[i].yAxis;
          });
        }else if(d=="educacion") { 
          gastoTotal = gastoTotal - educacion + parseInt(this.value);
          educacion = parseInt(this.value);
          d3.select("output#educacion").text(d3.format(",.4r")(educacion));
          data.forEach(function(val, i) {
            data[i].yAxis = gastoTotal * inflacion["General"][i];
            data2[i].yAxis = calcular_gasto_ponderado(i);
            particular[i] = data2[i].yAxis;
          });
        }else if(d=="esparcimiento") { 
          gastoTotal = gastoTotal - esparcimiento + parseInt(this.value);
          esparcimiento = parseInt(this.value);
          d3.select("output#esparcimiento").text(d3.format(",.4r")(esparcimiento));
          data.forEach(function(val, i) {
            data[i].yAxis = gastoTotal * inflacion["General"][i];
            data2[i].yAxis = calcular_gasto_ponderado(i);
            particular[i] = data2[i].yAxis;
          });
        }else if(d=="otros") { 
          gastoTotal = gastoTotal - otros + parseInt(this.value);
          otros = parseInt(this.value);
          d3.select("output#otros").text(d3.format(",.4r")(otros));
          data.forEach(function(val, i) {
            data[i].yAxis = gastoTotal * inflacion["General"][i];
            data2[i].yAxis = calcular_gasto_ponderado(i);
            particular[i] = data2[i].yAxis;
          });
        }

        // Updateo texto de gasto total
        d3.select("output#gastoTotal").text(d3.format(",.4r")(gastoTotal));

        // Updateo graficos
        updateLineChart();
        updateMultiLineChart();
        updateDonutChart();
    });
  });
};

