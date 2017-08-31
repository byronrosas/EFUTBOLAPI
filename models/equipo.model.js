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
    personal_equipo:[{ type : Schema.ObjectId, ref: 'Personal' }],
    estado_equipo:{type:Boolean,default:true},
    logros_equipo:[String]
});

module.exports = mongoose.model('Equipo',EquipoSchema);
