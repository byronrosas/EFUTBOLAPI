'use strict'

var Categoria = require('../models/categoria.model');

function saveCategoria(req, res) {
    var categoria = new Categoria();
    var params = req.body;
    categoria.nombre_categoria = params.nombre_categoria;
    categoria.n_equipos_categoria = params.n_equipos_categoria;
    categoria.observacion_categoria = params.observacion_categoria;
    categoria.id_temporada = params.id_temporada;

    categoria.save(function (err, categoraGuardada) {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!categoraGuardada) {
                res.status(404).send({ mensaje: "No se ha podido guardar la Categoria en la base de datos" });
            } else {
                res.status(200).send({ categoria: categoraGuardada })
            }
        }
    });
}

function getCategorias(req, res) {
    var find = Categoria.find({})
    find.populate({ path: 'codigo_equipo' }).exec(function (err, categorias) {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!categorias) {
                res.status(404).send({ mensaje: "No existen categorias creadas" });
            } else {
                res.status(200).send(categorias);
            }
        }
    });
}

function getCategoriaById(req, res) {
    var categoriaId = req.params.id;
    Categoria.findById(categoriaId).exec(function (err, categorias) {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!categorias) {
                res.status(404).send({ mensaje: "No existen la categoria" });
            } else {
                res.status(200).send({ categoria: categorias });
            }
        }
    });
}

function updateCategoria(req, res) {
    var categoriaId = req.params.id;
    var update = req.body;

    Categoria.findByIdAndUpdate(categoriaId, update, function (err, categoriaActualizada) {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!categoriaActualizada) {
                res.status(404).send({ mensaje: "No se ha podido actualizar la categoria" });
            } else {
                res.status(200).send({ categoria: categoriaActualizada });
            }
        }
    });
}

function updateEquipoCategoria(req, res) {

    var categoriaId = req.params.id;
    var update = req.body.codigo_equipo;

    Categoria.findById(categoriaId, (err, actualizado) => {
        console.log("ARREGLO = " + actualizado.codigo_equipo)
        if(actualizado.codigo_equipo.length==0){
            Categoria.findByIdAndUpdate(categoriaId, { $push: { codigo_equipo: update } }, function (err, actualizado) {
                if (err) {
                    res.status(500).send({ mensaje: "Error en el Servidor" });
                } else {
                    if (!actualizado) {
                        res.status(404).send({ mensaje: "No se ha podido Guardar el Equipo en la Categoria" });
                    } else {
                        res.status(200).send({ categoria: actualizado });
                    }
                }
            });            
        }else{

        for (var index = 0; index < actualizado.codigo_equipo.length; index++) {
            console.log(index);
            if (actualizado.codigo_equipo[index] == update) {
                console.log("Ya existe este id");
                res.status(200).send({mensaje : "Ya existe Un equipo guardado con este id: "+update});               
                break;
            }else{
                console.log("No hay coincidencias");
                if(index==actualizado.codigo_equipo.length-1){
                    Categoria.findByIdAndUpdate(categoriaId, { $push: { codigo_equipo: update } }, function (err, actualizado) {
                                if (err) {
                                    res.status(500).send({ mensaje: "Error en el Servidor" });
                                } else {
                                    if (!actualizado) {
                                        res.status(404).send({ mensaje: "No se ha podido Guardar el Equipo en la Categoria" });
                                    } else {
                                        res.status(200).send({ categoria: actualizado });
                                    }
                                }
                            });
                }
            }
        }
    }
    });
    
    // console.log("Estado de la varible: " + equipoEncontrado);
    // if (equipoEncontrado == true) {
    //     console.log("No existe este id asi que lo vamos a agregar");
    //     Categoria.findByIdAndUpdate(categoriaId, { $push: { codigo_equipo: update } }, function (err, actualizado) {
    //         if (err) {
    //             res.status(500).send({ mensaje: "Error en el Servidor" });
    //         } else {
    //             if (!actualizado) {
    //                 res.status(404).send({ mensaje: "No se ha podido Guardar el Equipo en la Categoria" });
    //             } else {
    //                 res.status(200).send({ categoria: actualizado });
    //             }
    //         }
    //     });
    //     equipoEncontrado = false;
    // }else{
    //     res.status(200).send({mensaje: "El equipo ya esat guardado"})
    // }
}



module.exports = {
    saveCategoria,
    getCategorias,
    getCategoriaById,
    updateCategoria,
    updateEquipoCategoria
}


Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
  });