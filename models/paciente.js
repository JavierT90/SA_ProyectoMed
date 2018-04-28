
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

mdlPaciente.DespachoReceta = function(data, callback){
	try {
		if (dbConn){
			//var sql = 'call sp_traslado_paciente(?,?,?);';
			var sql = 'call sp_obtiene_despachos_x_receta (?);';
			var params = [data.id_receta];
			var resultado = {"Despachos":"{}"}
			dbConn.query(sql,params,function(error, result, fields){
				if (error){
					callback (null, resultado);
				}
				else {
					if (result[0].length > 0) {
						var Despachos = [];
						var items = result[0].length;
						for (i=0;i<items;i++){
							var receta = {Receta:0,Fecha:'',DPI:'',Medicamentos:[]};
							receta.Fecha = result[0][i].Fecha;
							receta.Receta = result[0][i].Receta;
							receta.DPI = result[0][i].DPI;
							Despachos.push(receta);

						}
						if (result[1].length > 0) {
							var items2 = result[1].length;
							for (j=0;j<items2;j++){
								var medicamento = {Codigo:0,Nombre:'',Cantidad:0};
								medicamento.Codigo = result[1][j].Codigo;
								medicamento.Nombre = result[1][j].Nombre;
								medicamento.Cantidad = result[1][j].Cantidad;
								var id = result[1][j].Receta;
								for (a=0;a<items;a++){
									if (Despachos[a].Receta == id){
										Despachos[a].Medicamentos.push(medicamento);
									}
								}
							}
						}
						//console.log(result);
						//resultado.Despachos = JSON.stringify(Despachos);
						resultado.Despachos = Despachos;
						callback (null, resultado);
					}
					else {
						callback (null, resultado);
					}
				}
			});
		}
	}
	catch(err){
		var msj = "Error al trasladar paciente, error:" + err.message;
		console.log("Error al trasladar paciente, error:" + err.message);
		var resultado = {"Exito":0, "Error":msj}
		callback(null, resultado);
	}
}


mdlPaciente.HistorialPaciente = function(data, callback){
	try {
		if (dbConn){
			//var sql = 'call sp_traslado_paciente(?,?,?);';
			var sql = 'call sp_obtiene_historial_medico (?);';
			var params = [data.dpi];
			var resultado = {
				Exito:0,
				DPI: data.dpi,
				Nombre: '',
				Apellido: '',
				Telefono: '',
				Direccion: '',
				Fecha_Nacimiento:'',
				Historial: [],
				Traslados: []
			};
			dbConn.query(sql,params,function(error, result, fields){
				if (error){
					callback (null, resultado);
				}
				else {
					if (result[0].length > 0) {
						resultado.Exito = 1;
						resultado.Nombre = result[0][0].Nombre;
						resultado.Apellido = result[0][0].Apellido;
						resultado.Telefono = result[0][0].Telefono;
						resultado.Direccion = result[0][0].Direccion;
						resultado.Fecha_Nacimiento = result[0][0].Fecha_Nacimiento;
						if (result[1].length > 0) {
							var cant = result[1].length;
							for(var i=0; i<cant; i++){
								var Historia = {Fecha:'',Descripcion:'',Diagnosticos:[], Receta:[]};
								Historia.Descripcion = result[1][i].Descripcion;
								Historia.Fecha = result[1][i].Fecha;
								var Diagnostico = {Diagnostico: result[1][i].Diagnostico};
								Historia.Diagnosticos.push(Diagnostico);
								var receta = {Medicamento: result[1][i].Medicamento};
								Historia.Receta.push(receta);
								resultado.Historial.push(Historia);
							}
						}
						if (result[2].length > 0) {
							var cant2 = result[2].length;
							for(var j=0; j<cant2; j++){
								var traslado = {Origen:'',Destino:'',Fecha:''};
								traslado.Origen = result[2][j].Origen;
								traslado.Destino = result[2][j].Destino;
								traslado.Fecha = result[2][j].Fecha;
								resultado.Traslados.push(traslado);
							}
						}
						callback (null, resultado);
					}
					else {
						callback (null, resultado);
					}
				}
			});
		}
	}
	catch(err){
		var msj = "Error al trasladar paciente, error:" + err.message;
		console.log("Error al trasladar paciente, error:" + err.message);
		var resultado = {"Exito":0, "Error":msj}
		callback(null, resultado);
	}
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = mdlPaciente;
