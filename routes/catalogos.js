var mdlCatalogo  = require('../models/catalogos');

module.exports = function(app) {
  app.post("/Catalogos/Paciente", function(request,res){
    try {
      var parametros = {dpi:request.body.DPI};
      mdlCatalogo.ObtenerPaciente(parametros, function(error, data){
        if (data && !(data.error)){
          res.status(200).json(data);
        }
        else {
            res.status(200).json(data);
        }
      });
    }
    catch(err){
      console.log("Error:" + err.message);
      res.status(500).json(err.message);
    }
  });

  app.post("/Catalogos/Centros", function(request,res){
    try {
      var parametros = {};
      mdlCatalogo.ObtenerCentros(parametros, function(error, data){
        if (data && !(data.error)){
          res.status(200).json(data);
        }
        else {
            res.status(200).json(data);
        }
      });
    }
    catch(err){
      console.log("Error:" + err.message);
      res.status(500).json(err.message);
    }
  });
};
