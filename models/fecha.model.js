'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FechaSchema = Schema({
    n_fecha:Number,
    estado_fecha:Boolean, //Este es el estado de la fecha (Jugado:True o No jugado: False)
    fecha:Date,
    hora:String,
    id_categoria: { type: Schema.ObjectId, ref: 'Categoria'},
    id_estadio: { type: Schema.ObjectId, ref: 'Estadio'},
    id_equipo1: { type: Schema.ObjectId, ref: 'Equipo'},
    id_equipo2: { type: Schema.ObjectId, ref: 'Equipo'}
});


module.exports = mongoose.model('Fecha',FechaSchema);