//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection(
	{
		host: '35.196.238.102',
		user: 'root',
		password: 'ubuntu1604',
		database: 'centro_salud'
	}
);

module.exports = connection;
