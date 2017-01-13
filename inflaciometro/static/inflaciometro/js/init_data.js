
// Datos para el DonutChart
genDonutData("Promedio");

// Datos para el LineChart
fecha = inflacion["FECHA"];
general = new Array(12).fill(0);
particular = new Array(12).fill(0);

general.forEach(function(val, i) {
  general[i] = gastoTotal * inflacion["General"][i];
});

particular.forEach(function(val, i) {
  particular[i] = gastoAlimentos * inflacion["Alimentos"][i] +
    gastoTransporte * inflacion["Transporte y comunicaciones"][i] +
    gastoIndumentaria * inflacion["Indumentaria"][i] +
    gastoViviendaYServicios * inflacion["Vivienda y servicios"][i] +
    gastoHogar * inflacion["Equipamiento y mantenimiento del hogar"][i] +
    gastoSalud * inflacion["Salud"][i] +
    gastoEsparcimiento * inflacion["Esparcimiento"][i] +
    gastoEducacion * inflacion["Educacion"][i] +
    gastoOtros * inflacion["Otros"][i];
});

data = [];
data2 = [];

fecha.forEach(function(val, i) {
  data.push({ xAxis: fecha[i], yAxis: general[i] });
  data2.push({ xAxis: fecha[i], yAxis: particular[i] });

});

// Datos para el MultiLineChart
categorias = ["Alimentos", "Indumentaria", "Vivienda y servicios","Equipamiento y mantenimiento del hogar",
  "Salud", "Transporte y comunicaciones", "Esparcimiento", "Educacion", "Otros"];

dataInf = {"Alimentos": [], "Indumentaria": [], "Vivienda y servicios": [],
  "Equipamiento y mantenimiento del hogar": [],
  "Salud": [], "Transporte y comunicaciones": [], "Esparcimiento": [], "Educacion": [], "Otros": []
};

categorias.forEach(function(cat, i) {
  data.forEach(function(val, i) {
    if (i == 0) {
      dataInf[cat].push( {xAxis: fecha[i], yAxis: 0 });
    } else {
      dataInf[cat].push( {xAxis: fecha[i], yAxis: (inflacion[cat][i]/inflacion[cat][i-1]-1)*100 });
    }    
  })
});