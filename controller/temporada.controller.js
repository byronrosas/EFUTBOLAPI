'use strict'

var Temporada = require('../models/temporada.model');

//medtodo para subir imagenes
function saveTemporada(req,res){

    var temporada = new Temporada();
    var params=req.body;

    temporada.nombre_temporada = params.nombre_temporada;
    temporada.fecha_inicio = params.fecha_inicio;
    temporada.fecha_fin = params.fecha_fin;
    temporada.id_usuario = params.id_usuario;

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