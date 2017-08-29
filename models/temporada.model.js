'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TemporadaSchema = Schema({
    nombre_temporada:String,
    fecha_inicio:Date,
    fecha_fin:Date,
    id_usuario: { type: Schema.ObjectId, ref: 'Usuario'}
});

module.exports = mongoose.model('Temporada',TemporadaSchema);