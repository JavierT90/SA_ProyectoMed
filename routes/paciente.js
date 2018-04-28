var mdlPaciente  = require('../models/paciente');

module.exports = function(app) {

  app.get("/obtenerHistorial", function(req,res) {
    //almacenamos los datos del formulario en un objeto
    try {
        var cantRegistros = 0;
        var regOperados = 0;
        var param = {'DPI': req.param('DPI') };
        //
        mdlPaciente.obtenerHistorial(param,function(error, data) {
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

  app.post("/trasladarPaciente", function(request,res){
    try {
      var parametros = {dpi:request.body.dpi, id_origen:request.body.id_origen, id_destino:request.body.id_destino};
      mdlPaciente.trasladarPaciente(parametros, function(error, data){
        if (data && !(data.error)){
          res.status(200).json(data);
        }
        else {
            //res.status(500).json(data.resultado);
            res.status(200).json(data);
        }
      });
    }
    catch(err){
      console.log("Error:" + err.message);
      res.status(500).json(err.message);
    }
  });


  app.post("/obtenerPaciente", function(req,res){
    try {
        res.status(200).json(0);
    }
    catch(err){
      console.log("Error:" + err.message);
      res.status(500).json("joder tio");
    }

  });

};
