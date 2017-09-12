'use strict'

var path = require('path');
var fs = require('fs');
var Personal = require('../models/personal.model');


function savePersonal(req,res){
    
    var personal = new Personal();
    var params=req.body;
    console.log("Aqui esta el contenido ----------->");
    console.log(params)

    personal.nombre_personal = params.nombre_personal ;
    personal.apellido_personal = params.apellido_personal ;
    personal.rol_personal = params.rol_personal ;
    personal.fecha_nacimiento_personal = params.fecha_nacimiento_personal ;
    personal.cedula_personal = params.cedula_personal ;
    personal.observacion_personal = params.observacion_personal ;

    if (req.files && req.files.url_foto_personal != undefined) {
                console.log("Con Foto");
                var file_path = req.files.url_foto_personal.path;
                var file_split = file_path.split('\\');
                var file_name = file_split[3];
                //console.log(file_split);
                var ext_split = file_name.split('\.');
                var file_ext = ext_split[1];
                //console.log(ext_split);
                if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
        
                    personal.url_foto_personal = file_name;
                    //console.log(equipo)
                    personal.save((err, personaGuardada) => {
                        if (err) {
                            res.status(500).send({ mensaje: "Error en el servidor" });
                        } else {
                            if (!personaGuardada) {
                                res.status(404).send({ mensaje: "Error al guardar el Personal" });
                            } else {
                                res.status(200).send({ personal: personaGuardada });
                            }
                        }
                    });
        
                } else {
                    res.status(200).send({
                        mensaje: "Extension del archivo no valido"
                    });
                }
            } else {
                console.log("Sin Foto");
                //personal.url_foto_personal = "default_foto";
                personal.save((err, personaGuardada) => {
                    if (err) {
                        console.log("el Error = "+err);
                        res.status(500).send({ mensaje: "Error en el servidor" });
                    } else {
                        if (!personaGuardada) {
                            res.status(404).send({ mensaje: "Error al guardar el Personal" });
                        } else {
                            console.log( personaGuardada);
                            res.status(200).send({ personal: personaGuardada });
                        }
                    }
                });
                // res.status(200).send({
                //     message: "No ha subido Ninguna Imagen"
                // });
            }
    

}

function updatePersonal(req, res) {
    var personalID = req.params.id;
    var update = req.body;

    Personal.findByIdAndUpdate(personalID, update, function (err, personaActualizada) {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!personaActualizada) {
                res.status(404).send({ mensaje: "Error no se puede actualizar el equipo" });
            } else {
                res.status(200).send({ personaActualizada })
            }
        }
    })

}


function getImagenFile(req, res) {
    var imageFile = req.params.imageFile;
    var path_file = './public/images/foto_personal/' + imageFile;
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file))
        } else {
            res.status(200).send({ mensaje: "No existe la Imagen de Escudo" })
        }
    });
}

function uploadImage(req, res) {
    var personalID = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.url_foto_personal.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[3];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {

            Personal.findByIdAndUpdate(personalID, { url_foto_personal: file_name }, (err, fotoActualizadoa) => {
                if (!fotoActualizadoa) {
                    res.status(404).send({ mensaje: 'No se ha podido actualizar el usuario' });
                } else {
                    res.status(200).send({ mensaje: fotoActualizadoa });
                }
            });

        } else {
            res.status(200).send({ mensaje: 'Extensión del archivo no valida' });
        }

    } else {
        res.status(200).send({ mensaje: 'No has subido ninguna imagen...' });
    }
}

function deletePersonal(req, res) {
    var personalID = req.params.id;
    Personal.findByIdAndRemove(personalID, function (err, deletePersonal) {
        if (err) {
            res.status(500).send({ message: "Error al eliminar la sanción." });
        } else {
            if (!deletePersonal) {
                res.status(404).send({ message: "La Persona no ha  podido ser eliminado." });
            } else {
                res.status(200).send({deletePersonal});
            }
        }
    });
}

module.exports = {
    savePersonal,
    uploadImage,
    getImagenFile,
    updatePersonal,
    deletePersonal
}