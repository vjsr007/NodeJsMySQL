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
                    connection.query(query, params,
                        function(err, rows, fields) {
                            var result = new Array;
                            connection.end();
                            if (!err){
                                
                                if(Array.isArray(rows)){
                                    result = rows;
                                }
                                else{
                                    result.push(rows);
                                }
                                
                                resolve(result);
                            }
                            else{
                                reject({error: err});
                            }
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

exports.ejecutarSP = function(query, params){
    return new Promise(function (resolve, reject){
        try{
            var db = require('../config/database.js');
            var mysql = require('mysql');
            var connection = mysql.createConnection(db.config.mysql);

            connection.connect(function(err){
                if(!err) {
                    connection.query(query, params,
                        function(err, rows, fields) {
                            var result = new Array;
                            connection.end();
                            if (!err){
                                
                                if(Array.isArray(rows[0])){
                                    result = rows[0];
                                }
                                else{
                                    result.push(rows[0]);
                                }
                                
                                resolve(result);
                            }
                            else{
                                reject({error: err});
                            }
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