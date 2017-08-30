'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipoSchema = Schema({
    nombre_equipo:String,
    descripcion_equipo:String,
    anio_fundacion_equipo:Number,
    escudo_equipo:String,
    color_principal_equipo:String,
    color_secundario_equipo:String,
    observacion_equipo:String,
    //personal_equipo:[{ type : ObjectId, ref: 'Personal' }],
    id_categoria: { type: Schema.ObjectId, ref: 'Categoria'}
});

module.exports = mongoose.model('Equipo',EquipoSchema);
