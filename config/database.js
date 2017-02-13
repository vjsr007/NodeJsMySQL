exports.config = {
	mysql:
	{
	   host     : 'localhost',
	   user     : 'laravel',
	   password : 'laravel',
	   database : 'laravel'
	}
};

exports.ejecutarQuery = function(query, params){
    return new Promise(function (resolve, reject){
        try{
            var db = require('../config/database.js');
            var mysql = require('mysql');
            var connection = mysql.createConnection(db.config.mysql);

            connection.connect(function(err){
                if(!err) {
                    connection.query(
                        query,
                        params, 
                        function(err, rows, fields) {
                            connection.end();
                            if (!err)
                                resolve(rows[0]);
                            else
                                reject({error: err});
                            }
                    ); 
                } else {
                    reject({error: err});
                }
            });
        }
        catch(ex){
            reject({error: ex});
        }
    });
};