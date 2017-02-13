 //Paises Model
 (function(){
     
    exports.obtenerPaises = function(params){
        var db = require('../config/database.js');
        
        return db.ejecutarQuery("CALL spObtenerPaises(?, ?, ?, ?)",[params.Activo,params.Nombre, params.Codigo, params.PaisID]);
    };

 })();