
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
			var sql = 'call sp_traslado_paciente(?,?,?);';
			var params = [data.dpi, data.id_origen, data.id_destino];
			dbConn.query(sql,params,function(error, results, fields){
				if (error){
					callback (null, {resultado: error.message, error:true});
				}
				else {
					callback (null, {resultado: 'Traslado realizado con éxito.', error:false});
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
