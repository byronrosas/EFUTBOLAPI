'use strict'

var Temporada = require('../models/temporada.model');

//medtodo para subir imagenes
function saveTemporada(req,res){

    var temporada = new Temporada();
    var params=req.body;
    console.log("Aquiiii..................>>>");
    console.log(params);
    temporada.nombre_temporada = params.nombre_temporada;
    temporada.fecha_inicio = params.fecha_inicio;
    temporada.fecha_fin = params.fecha_fin;
    temporada.id_usuario =         params.id_usuario;
   
    if (req.files) {

                var file_path = req.files.url_reglamento_temporada.path;
                var file_split = file_path.split('\\');
                var file_name = file_split[3];
                //console.log(file_split);
                var ext_split = file_name.split('\.');
                var file_ext = ext_split[1];
                //console.log(ext_split);
                if (file_ext == 'pdf') {
        
                    temporada.url_reglamento_temporada = file_name;
                    //console.log(equipo)
                    temporada.save((err,temporadaGuardada) => {
                        if(err){
                            res.status(500).send({mensaje: "Error en el servidor"});
                        }else{
                            if (!temporadaGuardada) {
                                res.status(404).send({mensaje: 'Error al crear una Temporada'});
                            }else{
                                res.status(200).send({temporada: temporadaGuardada});
                            }
                        }
                    });
        
                } else {
                    console.log("Archivo no valido");
                    res.status(200).send({
                        mensaje: "Extension del archivo no valido"
                    });
                }
            } else {
                 temporada.url_reglamento_temporada = "null";
                 temporada.save((err,temporadaGuardada) => {
                    if(err){
                        res.status(500).send({mensaje: "Error en el servidor"});
                    }else{
                        if (!temporadaGuardada) {
                            res.status(404).send({mensaje: 'Error al crear una Temporada'});
                        }else{
                            res.status(200).send({temporada: temporadaGuardada});
                        }
                    }
                });
                // res.status(200).send({
                //     message: "No ha subido Ninguna Imagen"
                // });
            }



    
}



function updateTemporada(req, res) {
    var temporadaId = req.params.id;
    var update = req.body;

    Temporada.findByIdAndUpdate(temporadaId, update, function (err, temporadaActualizada) {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!temporadaActualizada) {
                res.status(404).send({ mensaje: "Error no se puede actualizar la temporada seleccionada" });
            } else {
                res.status(200).send({ temporadaActualizada })
            }
        }
    })
}

function updateTemporadaEstado(req,res){
    var temporadaId = req.params.id;
    var update = req.body.estado_temporada;
    Temporada.findByIdAndUpdate(temporadaId, update, function (err, temporadaActualizada) {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!temporadaActualizada) {
                res.status(404).send({ mensaje: "Error no se puede actualizar la temporada seleccionada" });
            } else {
                res.status(200).send({ temporadaActualizada })
            }
        }
    })
}

function getTemporadas(req,res){
    Temporada.find({},(err,temporadas)=>{
        if(err){
            res.status(500).send({ mensaje: "Error en el servidor" });
        }else{
            if(!temporadas){
                res.status(404).send({ mensaje: "No existen temporadas creadas" });
            }else{
                res.status(200).send(temporadas);
            }
        }
    });
}

function getTemporadaById(req,res){
    var temporadaId = req.params.id;
    Temporada.findById(temporadaId).exec((err, temporadaSelecionada) => {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!temporadaSelecionada) {
                res.status(404).send({ mensaje: "La temoprada no se puede encontrar" });
            } else {
                res.status(200).send({temporadaSelecionada });
            }
        }
    });
}


module.exports = {
    saveTemporada,
    getTemporadas,
    getTemporadaById,
    updateTemporada
}