'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Personal=new Schema({
    nombre_personal:String,
    apellido_personal:String,
    rol_personal:String,
    fecha_nacimiento_personal:Date,
    cedula_personal:String,
    goles_persona:Number,
    TA_personal:Number,
    TR_personal:Number,
    sancion_personal:String,
    observacion_personal:String
});
var EquipoSchema = Schema({
    nombre_equipo:String,
    descripcion_equipo:String,
    anio_fundacion_equipo:Number,
    escudo_equipo:String,
    color_principal_equipo:String,
    color_secundario_equipo:String,
    observacion_equipo:String,
    personal_equipo:[Personal],
    id_categoria: { type: Schema.ObjectId, ref: 'Categoria'}
});

module.exports = mongoose.model('Equipo',EquipoSchema);
