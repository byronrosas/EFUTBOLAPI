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
    goles_equipo1 :[{ type : Schema.ObjectId, ref: 'Personal' }],
    tarjetas_amarilla_equipo1 : [{ type : Schema.ObjectId, ref: 'Personal' }],
    tarjetas_roja_equipo1 :[{ type : Schema.ObjectId, ref: 'Personal' }],
    codigo_sancion_equipo1 : {type: Schema.ObjectId, ref:'Sancion'},
    observacion_equipo1: String,
    
    id_equipo2 : { type: Schema.ObjectId, ref: 'Equipo'},
    goles_equipo2 :[{ type : Schema.ObjectId, ref: 'Personal' }],
    tarjetas_amarilla_equipo2 :[{ type : Schema.ObjectId, ref: 'Personal' }],
    tarjetas_roja_equipo2 :[{ type : Schema.ObjectId, ref: 'Personal' }],
    codigo_sancion_equipo2 :{type: Schema.ObjectId, ref:'Sancion'},
    observacion_equipo2: String,
    primera_segunda:Number   ,
    jugado:{type:Boolean,default:false}
});


module.exports = mongoose.model('Fecha',FechaSchema);
