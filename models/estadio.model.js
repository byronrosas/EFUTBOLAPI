'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EstadioSchema = Schema({
    nombre_estadio: String,
    imagen_estadio: String,
    ruta_estadio: String,
    direccion_estadio:String,
    observacion_estadio: String
});

module.exports = mongoose.model('Estadio',EstadioSchema);