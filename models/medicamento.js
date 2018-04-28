
var dbConn  = require('../config/db_farm');

var mdlMedicamento = {};

//funcionar para insertar diagnostico
mdlMedicamento.ConsultaExistencia = function(registro, callback)
{
	try {
		if (dbConn)
		{
      var sql = `call sp_obtiene_existencias(?);`;
     	var par = [registro.id_medicamento];
			var resultado = {Cantidad:0};
	    dbConn.query(sql, par, function (error, results, fields) {

				if(error)
				{
	        callback(null, {'resultado':0});
					//throw error;
				}
				else
				{
					if(results[0][0]){
						resultado.Cantidad = results[0][0].existencias;
					}
					//console.log();
					callback(null, resultado);
				}
			});
		}
	}
	catch(err) {
		console.log("Error: "+ err.message);
		callback(null, {'resultado':0});
	}
}

//funcionar para irealizat traslado de medicamento
mdlMedicamento.TrasladoMedicamento = function(registro, callback)
{
	try {
		if (dbConn)
		{
      var sql = `call sp_agrega_traslado(?,?,?);`;
			var fecha = new Date();
			var str_fecha = fecha.getDate() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getFullYear();
			//str_fecha  = "STR_TO_DATE('" + str_fecha + "', '%d-%m-%Y')";
     	var par = [str_fecha, registro.id_origen, registro.id_destino];
			var meds = registro.medicamentos;
			var resultado = {"Exito":null, "Error":"Error"};
			var idTraslado = 0;
			dbConn.query( sql, par, ( err, rows ) => {
				if(err){callback(null, resultado);}
				else
				{
					if(rows[0][0]){
						idTraslado = rows[0][0].Id_Traslado;
						console.log(idTraslado);
						resultado.Exito = 1;
						var cantMed = meds.length;
						for (i=0;i<cantMed;i++){
							var sql_1 = `call sp_agrega_detalle_traslado(?,?,?);`;
							var par_1 = [idTraslado, meds[i].Codigo, meds[i].Cantidad];
							dbConn.query(sql_1, par_1, ( err2, rows2 ) => {
								if (err2){
									resultado.Error = 1;
									resultado.Exito = null;
								}
					  	});
						}
						callback (null, resultado);
					} else{callback(null, resultado);}
				}
			});
			/*
	    dbConn.query(sql, par, function (error, results, fields) {
				if(error){callback(null, resultado);}
				else
				{
					if(results[0][0]){
						idTraslado = results[0][0].Id_Traslado;
						console.log(idTraslado);
					} else{callback(null, resultado);}
				}
			}).then(function(results){
				console.log(idTraslado);
			});*/

		}
	}
	catch(err) {
		console.log("Error: "+ err.message);
		callback(null, {'resultado':0});
	}
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = mdlMedicamento;
