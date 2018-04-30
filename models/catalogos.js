
var dbConnCentro  = require('../config/db');

var mdlCatalogo = {};


mdlCatalogo.ObtenerPaciente = function(data, callback){
	var resultado = {Pacientes:[]};
	try {
		if (dbConnCentro){
			var sql = 'call sp_obtener_paciente (?);';
			var params = [data.dpi];
			dbConnCentro.query(sql,params,function(error, result, fields){
				if (error){
					callback (null, resultado);
				}
				else {
					if (result[0].length > 0) {
						var cant = result[0].length;
						for (var i=0;i<cant;i++){
							var paciente = {
								id_paciente:0,
								dpi:'',
								nombre:'',
								apellido:'',
								nombre_completo:'',
								telefono:'',
								celular:'',
								direccion:'',
								estado:'',
								fec_nacimiento:''
							};
							paciente.id_paciente = result[0][i].id_paciente;
							paciente.dpi = result[0][i].dpi;
							paciente.nombre = result[0][i].nombre;
							paciente.apellido = result[0][i].apellido;
							paciente.nombre_completo = result[0][i].nombre_completo;
							paciente.telefono = result[0][i].telefono;
							paciente.celular = result[0][i].celular;
							paciente.direccion = result[0][i].direccion;
							paciente.estado = result[0][i].estado;
							paciente.fec_nacimiento = result[0][i].fec_nacimiento;
							resultado.Pacientes.push(paciente);
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
		var msj = "Error al obtener paciente, error:" + err.message;
		console.log("Error al obtener paciente, error:" + err.message);
		callback(null, resultado);
	}
}

mdlCatalogo.ObtenerCentros = function(data, callback){
	var resultado = {Centros:[]};
	try {
		if (dbConnCentro){
			var sql = 'call sp_obtener_centros ();';
			dbConnCentro.query(sql,function(error, result, fields){
				if (error){
					callback (null, resultado);
				}
				else {
					if (result[0].length > 0) {
						var cant = result[0].length;
						for (var i=0;i<cant;i++){
							var centro = {
								id_centro:0,
								nombre:'',
								direccion:''
							};
							centro.id_centro = result[0][i].id_centro;
							centro.nombre = result[0][i].nombre;
							centro.direccion = result[0][i].direccion;
							resultado.Centros.push(centro);
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
		var msj = "Error al obtener paciente, error:" + err.message;
		console.log("Error al obtener paciente, error:" + err.message);
		callback(null, resultado);
	}
}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = mdlCatalogo;
