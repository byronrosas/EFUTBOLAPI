'use strict'

var express = require('express');
var TemporadaController = require('../controller/temporada.controller.js');

var api = express.Router();

var md_auth = require('../midddlewards/autenticated');


api.post('/guardar', md_auth.ensureAuth , TemporadaController.saveTemporada);
api.get('/:id',TemporadaController.getTemporadaById);
api.get('/',TemporadaController.getTemporadas);
api.put('/actualizar/:id',md_auth.ensureAuth, TemporadaController.updateTemporada);

module.exports = api;