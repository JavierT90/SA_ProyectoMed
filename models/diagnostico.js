
var dbConn  = require('../config/db');

var mdlDiagnostico = {};

//funcionar para insertar diagnostico
mdlDiagnostico.insertar = function(registro, callback)
{
	try {
		if (dbConn)
		{
	    var sql = `CALL sp_agrega_enfermedad(?,?,?);`;
	    var par = [registro.Codigo,registro.Enfermedad,registro.Descripcion];
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

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = mdlDiagnostico;
