var mdlDiagnostico  = require('../models/diagnostico');

module.exports = function(app) {

  //función que usa el verbo http put para actualizar usuarios
  app.put("/msv_diagnostico", function(req,res) {
    //almacenamos los datos del formulario en un objeto
    try {
        var cantRegistros = 0;
        var regOperados = 0;
        var datos = req.param('Diagnosticos');
        //
        cantRegistros = datos.length;
        for (var contador = 0; contador < datos.length; contador++) {
          var registro = {};
          var numOperacion = 0;
          registro["Codigo"] = parseInt(datos[contador].Codigo);
          registro["Enfermedad"] = datos[contador].Enfermedad;
          registro["Descripcion"] = datos[contador].Descripcion;
          //se envia al modelo para insertar en la bd
          mdlDiagnostico.insertar(registro,function(error, data) {
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

};
