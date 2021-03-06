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

  app.post("/TrasladarPaciente", function(request,res){
    try {
      var parametros = {dpi:request.body.Paciente, id_origen:request.body.Origen, id_destino:request.body.Destino};
      mdlPaciente.TrasladarPaciente(parametros, function(error, data){
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

  app.post("/DespachoReceta", function(request,res){
    try {
      var parametros = {id_receta:request.body.Receta};
      mdlPaciente.DespachoReceta(parametros, function(error, data){
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

  app.post("/HistorialPaciente", function(request,res){
    try {
      var parametros = {dpi:request.body.DPI};
      mdlPaciente.HistorialPaciente(parametros, function(error, data){
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

  app.post("/ReporteMorbilidad", function(request,res){
    try {
      var parametros = {};
      mdlPaciente.ReporteMorbilidad(parametros, function(error, data){
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
