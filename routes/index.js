var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

router.get('/home', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

router.get('/pais', function(req, res){
  res.render('pais', {
    title: 'País'
  });
});

router.get('/estado', function(req, res){
  res.render('estado', {
    title: 'Estado'
  });
});

router.post('/ciudadjson', function(req, res, next) {
	var ciudad = require('../model/ciudad.js');
	 
	ciudad.obtenerCiudades().then(result => { res.send(result); }).catch(error => { res.send({error: error}); });
});

router.post('/paisjson', function(req, res, next) {
	var pais = require('../model/pais.js');
	 
	pais.obtenerPaises().then(result => { res.send(result); }).catch(error => { res.send({error: error}); });
});

module.exports = router;