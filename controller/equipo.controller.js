'use strict'

var Equipo = require('../models/equipo.model');

var path = require('path');
var fs = require('fs');

function saveEquipo(req, res) {
    var equipo = new Equipo();

    var params = req.body;

    equipo.nombre_equipo = params.nombre_equipo;
    equipo.descripcion_equipo = params.descripcion_equipo;
    equipo.anio_fundacion_equipo = params.anio_fundacion_equipo;
    //equipo.escudo_equipo = ;
    equipo.color_principal_equipo = params.color_principal_equipo;
    equipo.color_secundario_equipo = params.color_secundario_equipo;
    equipo.observacion_equipo = params.observacion_equipo;
    equipo.id_categoria = params.id_categoria;

    if (req.files) {

        var file_path = req.files.escudo_equipo.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[3];
        //console.log(file_split);
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        //console.log(ext_split);
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

            equipo.escudo_equipo = file_name;
            //console.log(equipo)
            equipo.save((err, equipoGuardado) => {
                if (err) {
                    res.status(500).send({ mensaje: "Error en el servidor" });
                } else {
                    if (!equipoGuardado) {
                        res.status(404).send({ mensaje: "Error al guardar el Equipo" });
                    } else {
                        res.status(200).send({ saveEquipo: equipoGuardado });
                    }
                }
            });

        } else {
            res.status(200).send({
                mensaje: "Extension del archivo no valido"
            });
        }
    } else {
        equipo.escudo_equipo = "default";
        equipo.save((err, equipoGuardado) => {
            if (err) {
                res.status(500).send({ mensaje: "Error en el servidor" });
            } else {
                if (!equipoGuardado) {
                    res.status(404).send({ mensaje: "Error al guardar el Equipo" });
                } else {
                    res.status(200).send({ saveEquipo: equipoGuardado });
                }
            }
        });
        // res.status(200).send({
        //     message: "No ha subido Ninguna Imagen"
        // });
    }
}
function updateEquipo(req, res) {
    var equipoId = req.params.id;
    var update = req.body;

    Equipo.findByIdAndUpdate(equipoId, update, function (err, equipoActualizado) {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!equipoActualizado) {
                res.status(404).send({ mensaje: "Error no se puede actualizar el equipo" });
            } else {
                res.status(200).send({ equipoActualizado })
            }
        }
    })

}

function getImagenFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './public/images/escudos/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file))
        } else {
            res.status(200).send({ mensaje: "No existe la Imagen de Escudo" })
        }
    });
}

function uploadImage(req, res) {
    var equipoId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[3];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

            Equipo.findByIdAndUpdate(equipoId, { escudo_equipo: file_name }, (err, escudoActualizado) => {
                if (!escudoActualizado) {
                    res.status(404).send({ mensaje: 'No se ha podido actualizar el usuario' });
                } else {
                    res.status(200).send({ mensaje: escudoActualizado });
                }
            });

        } else {
            res.status(200).send({ mensaje: 'Extensión del archivo no valida' });
        }

    } else {
        res.status(200).send({ mensaje: 'No has subido ninguna imagen...' });
    }
}

function getEquipo(req, res) {
    var equipoId = req.params.id;
    Equipo.findById(equipoId).exec((err, equipoEncontrado) => {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!equipoEncontrado) {
                res.status(404).send({ mensaje: "El equipo no se puede encontrar" });
            } else {
                res.status(200).send({ equipoEncontrado });
            }
        }
    });
}

function getEquiposCategoria(req, res) {
    var categoriaId = req.params.categoria_perteneciente
    Equipo.find({ id_categoria: categoriaId }).sort('nombre_equiupo').exec((err, equiposEncontrados) => {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!equiposEncontrados) {
                res.status(404).send({ mensaje: "No existen equipos en esta Categoria" })
            } else {
                res.status(200).send({ equiposEncontrados });
            }
        }
    })

}

module.exports = {
    saveEquipo,
    updateEquipo,
    getImagenFile,
    uploadImage,
    getEquipo,
    getEquiposCategoria
}