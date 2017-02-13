 //Estados Model
 (function(){
    
    exports.obtenerEstados = function(params){
        var db = require('../config/database.js');
        return db.ejecutarQuery("SELECT * FROM estado");
    };

 })();