'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CategoriaSchema = Schema({
    nombre_categoria:String,
    n_equipos_categoria:Number,
    observacion_categoria:String,
    id_temporada: { type: Schema.ObjectId, ref: 'Temporada'}
});

module.exports = mongoose.model('Categoria',CategoriaSchema);