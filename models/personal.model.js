'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PersonalShema=new Schema({
    nombre_personal:String,
    apellido_personal:String,
    rol_personal:String,
    fecha_nacimiento_personal:Date,
    cedula_personal:String,
    goles_persona:Number,
    TA_personal:Number,
    TR_personal:Number,
    sancion_personal:String,
    observacion_personal:String,
    url_foto_personal:String,
    estado_personal:{type:Boolean,default:true}
});

module.exports = mongoose.model('Personal',PersonalShema);