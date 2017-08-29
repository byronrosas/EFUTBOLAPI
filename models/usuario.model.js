'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre_usuario: String,
    apellido_usuario: String,
    cedula_usuario:String,
    email: String,
    password: String,
    image: String,
    fecha_nacimiento_usuario:Date,
    genero_usuario:String    
});



module.exports = mongoose.model('Usuario',UsuarioSchema);
