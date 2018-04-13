//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',
		password: 'admin',
		database: 'centro_salud'
	}
);

module.exports = connection;
