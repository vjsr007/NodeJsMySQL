 //Ciudades Model
 (function(){
     
    exports.obtenerCiudades = function(params){
        var db = require('../config/database.js');
        return db.ejecutarQuery("SELECT * FROM ciudad");
    };

 })();