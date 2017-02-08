 //Obtiene ciudades
 exports.obtenerEstados = function(){ 
  return new Promise(function (resolve, reject){
	var db = require('../config/database.js');
	var mysql = require('mysql');
	var connection = mysql.createConnection(db.config.mysql);

	connection.connect(function(err){
		if(!err) {
			connection.query('SELECT * FROM estado', function(err, rows, fields) {
			connection.end();
			if (!err)
				resolve(rows);
			else
				reject({error: err});
			}); 
		} else {
			reject({error: err});
		}
	});
  });
};