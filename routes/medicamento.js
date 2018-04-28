var mdlMedicamento  = require('../models/medicamento');

module.exports = function(app) {

  //función que usa el verbo http put para actualizar usuarios
  app.put("/msv_medicamento", function(req,res) {
    //almacenamos los datos del formulario en un objeto
    try {
        var cantRegistros = 0;
        var regOperados = 0;
        var datos = req.param('Medicamentos');
        //
        cantRegistros = datos.length;
        for (var contador = 0; contador < datos.length; contador++) {
          var registro = {};
          var numOperacion = 0;
          registro["Codigo"] = parseInt(datos[contador].Codigo);
          registro["Nombre"] = datos[contador].Nombre;
          registro["Descripcion"] = datos[contador].Descripcion;
          registro["Existencias"] = datos[contador].Existencias;
          registro["BajoPreescripcion"] = datos[contador].BajoPreescripcion;
          registro["Fabricante"] = datos[contador].Fabricante;
          registro["Precio"] = datos[contador].Precio;
          //se envia al modelo para insertar en la bd
          mdlMedicamento.insertar(registro,function(error, data) {
            if(data && data.resultado) {
              regOperados++;
            }
            numOperacion++;
            //console.log(c + ": " + regOperados + "/" + cantRegistros);
            if (numOperacion == cantRegistros){
              console.log("Registros: " + regOperados + "/" + cantRegistros);
              var respuesta = {operados:regOperados, total:cantRegistros};
              res.status(200).json(regOperados);
            }
          });
        }
    }
    catch(err){
      console.log("Error:" + err.message);
      res.status(500).json("joder tio");
    }
  });


  app.post("/ConsultaExistencia", function(request,res) {
    //almacenamos los datos del formulario en un objeto
    try {
      var parametros = {id_medicamento:request.body.Codigo};
      console.log(parametros);
        mdlMedicamento.ConsultaExistencia(parametros,function(error, data) {
          if(data) {
            res.status(200).json(data);
          }
        });
    }
    catch(err){
      console.log("Error:" + err.message);
      res.status(500).json("joder tio");
    }
  });

  app.post("/TrasladoMedicamento", function(request,res) {
    //almacenamos los datos del formulario en un objeto
    try {
      var parametros = {
        id_origen:request.body.Origen,
        id_destino:request.body.Destino,
        medicamentos:request.body.Medicamentos
       };
        mdlMedicamento.TrasladoMedicamento(parametros,function(error, data) {
          if(data) {
            res.status(200).json(data);
          }
        });
    }
    catch(err){
      console.log("Error:" + err.message);
      res.status(500).json("joder tio");
    }
  });

//

};
