'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre_usuario: String,
    apellido_usuario: String,
    cedula_usuario:String,
    email_usuario: String,
    password_usuario: String,
    image_usuario: String,
    fecha_nacimiento_usuario:Date,
    genero_usuario:String    
});



module.exports = mongoose.model('Usuario',UsuarioSchema);
