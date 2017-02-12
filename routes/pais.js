var express = require('express');
var router = express.Router();

/*
router.use(function timeLog(req, res, next){
	console.log(req.body);
	next();
});
*/

router.post('/paiseditar', function(req, res){
  res.render('paiseditar', {
    title: 'Editar'
  });
});

//router.post('/paiseditar', function(req, res){
//  res.sendFile('paiseditar.html',{root: 'views/'});
//});


router.get('/pais', function(req, res){
  res.render('pais', {
    title: 'País'
  });
});

router.post('/ciudadjson', function(req, res, next) {
	var ciudad = require('../model/ciudad.js');
	 
	ciudad.obtenerCiudades().then(result => { res.send(result); }).catch(error => { res.send({error: error}); });
});

router.post('/paisjson', function(req, res, next) {
	var pais = require('../model/pais.js');
	 
	pais.obtenerPaises(req.body).then(result => { res.send(result); }).catch(error => { res.send({error: error}); });
});

module.exports = router;