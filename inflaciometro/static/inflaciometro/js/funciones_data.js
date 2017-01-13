function genDonutData(typeDonut) {

  if (typeDonut=="Promedio"){
      dataset = [
        {"type":"Gasto",
          "data":[{"cat":"alimentos",
          "val":ponderadores['alimentos']*gastoTotal},
          {"cat":"indumentaria",
          "val":ponderadores['indumentaria']*gastoTotal},
          {"cat":"viviendayservicios",
          "val":ponderadores['viviendayservicios']*gastoTotal},
          {"cat":"hogar",
          "val":ponderadores['hogar']*gastoTotal},
          {"cat":"salud",
          "val":ponderadores['salud']*gastoTotal},
          {"cat":"transporte",
          "val":ponderadores['transporte']*gastoTotal},
          {"cat":"esparcimiento",
          "val":ponderadores['esparcimiento']*gastoTotal},
          {"cat":"educacion",
          "val":ponderadores['educacion']*gastoTotal},
          {"cat":"otros",
          "val":ponderadores['otros']*gastoTotal}],
          "total":gastoTotal}]

  }else if (typeDonut=="Personal") {
      dataset = [{
        "type":"Gasto",
        "data":[{"cat":"alimentos",
        "val":alimentos},
        {"cat":"indumentaria",
        "val":indumentaria},
        {"cat":"viviendayservicios",
        "val":viviendayservicios},
        {"cat":"hogar",
        "val":hogar},
        {"cat":"salud",
        "val":salud},
        {"cat":"transporte",
        "val":transporte},
        {"cat":"esparcimiento",
        "val":esparcimiento},
        {"cat":"educacion",
        "val":educacion},
        {"cat":"otros",
        "val":otros}],
        "total":gastoTotal}]
  }
  
  return dataset;
}