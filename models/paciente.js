
var dbConn  = require('../config/db');

var mdlPaciente = {};

//funcionar para insertar diagnostico
mdlPaciente.insertar = function(registro, callback)
{
	try {
		if (dbConn)
		{
      var sql = `INSERT INTO medicamento VALUES(?,?,?,?,?,?,?);`;
	     var par = [registro.Codigo,
				registro.Nombre,
				registro.Descripcion,
				registro.Existencias,
				registro.BajoPreescripcion,
				registro.Fabricante,
				registro.Precio];
	    dbConn.query(sql, par, function (error, results, fields) {
				if(error)
				{
	        callback(null, {'resultado':0});
					//throw error;
				}
				else
				{
					callback(null, {'resultado':1});
				}
			});
		}
	}
	catch(err) {
		console.log("Error: "+ err.message);
		callback(null, {'resultado':0});
	}
}

mdlPaciente.trasladarPaciente = function (data, callback) {
	try {
		if (dbConn){
			//var sql = 'call sp_traslado_paciente(?,?,?);';
			var sql = 'call sp_traslado_paciente ( ?, ?, ?);';
			var params = [data.dpi, data.id_origen, data.id_destino];
			var resultado = {"Exito":null, "Error":null}
			dbConn.query(sql,params,function(error, result, fields){
				if (error){
					resultado.Error = 1;
					resultado.Exito = null;
					callback (null, resultado);
				}
				else {
					if (result[0].length > 0) {
							resultado.Exito = 1;
							resultado.Error = null;
							callback (null, resultado);
					}
					else {
						resultado.Error = 1;
						resultado.Exito = null;
						callback (null, resultado);
					}
				}
			});
		}
	}
	catch(err){
		console.log("Error al trasladar paciente, error:" + err.message);
		callback(null, {resultado:'error', error:true});
	}
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = mdlPaciente;
