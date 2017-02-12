var express = require('express');
        var router = express.Router();
        router.get('/estado', function(req, res){
        res.render('estado', {
        title: 'Estado'
        });
                });
        router.post('/estadojson', function(req, res, next) {
        var estado = require('../model/estado.js');
                estado.obtenerEstados().then(result => { res.send(result); }).catch(error => { res.send({error: error}); });
                });
        module.exports = router;