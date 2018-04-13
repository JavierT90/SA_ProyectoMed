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

  app.get("/trasladoMed", function(req,res) {
    //almacenamos los datos del formulario en un objeto
    try {
        var cantRegistros = 0;
        var regOperados = 0;
        var param = {'idMedicamento': req.param('idMedicamento') };
        //
        mdlMedicamento.solicitaTraslado(param,function(error, data) {
          if(data && data.OperacionExitosa) {
            res.status(200).json(0);
          }
        });
    }
    catch(err){
      console.log("Error:" + err.message);
      res.status(500).json("joder tio");
    }
  });


};
