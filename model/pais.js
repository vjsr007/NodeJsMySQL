 //Paises Model
 (function(){
     
    exports.obtenerPaises = function(params){
        var db = require('../config/database.js');
        return db.ejecutarSP("CALL spObtenerPaises(?, ?, ?, ?)",[params.Activo,params.Nombre, params.Codigo, params.PaisID]);
    };

 })();