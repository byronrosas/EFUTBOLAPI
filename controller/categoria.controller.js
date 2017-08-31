'use strict'

var Categoria = require('../models/categoria.model');

function saveCategoria(req,res){
    var categoria = new Categoria();
    var params = req.body;
    categoria.nombre_categoria  = params.nombre_categoria;
    categoria.n_equipos_categoria= params.n_equipos_categoria;
    categoria.observacion_categoria= params.observacion_categoria;
    categoria.id_temporada = params.id_temporada;

    categoria.save(function(err,categoraGuardada){
        if(err){
            res.status(500).send({mensaje: "Error en el servidor"});
        }else{
            if (!categoraGuardada) {
                res.status(404).send({mensaje: "No se ha podido guardar la Categoria en la base de datos"});
            }else{
                res.status(200).send({categoria: categoraGuardada})
            }
        }
    }) ;
}

function getCategorias(req,res){
    Categoria.find({},function(err,categorias){
        if(err){
            res.status(500).send({mensaje: "Error en el servidor"});
        }else{
            if (!categorias) {
                res.status(404).send({mensaje: "No existen categorias creadas"});
            }else{
                res.status(200).send(categorias);
            }
        }
    });
}

function getCategoriaById (req,res){
    var categoriaId = req.params.id;
    Categoria.findById(categoriaId).exec(function(err,categorias){
        if(err){
            res.status(500).send({mensaje: "Error en el servidor"});
        }else{
            if (!categorias) {
                res.status(404).send({mensaje: "No existen la categoria"});
            }else{
                res.status(200).send({categoria:categorias});
            }
        }
    });
}

function updateCategoria(req,res){
    var categoriaId = req.params.id;
    var update = req.body;

    Categoria.findByIdAndUpdate(categoriaId,update,function(err,categoriaActualizada){
        if (err) {
            res.status(500).send({mensaje: "Error en el servidor"});
        }else{
            if (!categoriaActualizada) {
                res.status(404).send({mensaje: "No se ha podido actualizar la categoria"});
            }else{
                res.status(200).send({categoria:categoriaActualizada});
            }
        }
    });
}



module.exports ={
    saveCategoria,
    getCategorias,
    getCategoriaById,
    updateCategoria
}