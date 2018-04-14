var mdlPaciente  = require('../models/medicamento');

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

  app.post("/obtenerPaciente", function(req,res){
    res.status(200).json(0);
  });

};
