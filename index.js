
'use strict'

var mongoose = require('mongoose');
var app = require('./app');

//    puerto servidor web del backen
var port = process.env.PORT || 3999;

mongoose.connect('mongodb://efutbol_db:123Root@ds111204.mlab.com:11204/efutbol_db',(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log("La Base de Datos Esta Corriendo Exitosamente");
        app.listen(port,function(){
            console.log("Servidor de E-futbol esta corriendo en el pueto :) : localhost:"+port);
        })
    }
});

