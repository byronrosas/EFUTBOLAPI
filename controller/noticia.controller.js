'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Noticia = require('../models/noticia.model');


function getNoticias(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	var itemsPerPage = 3;
	Noticia.find().sort({'fecha_publicado':-1}).paginate(page, itemsPerPage, function(err, noticias, total){
		if(err){
			res.status(500).send({mensaje: 'Error en la petición.'});
		}else{
			if(!noticias){
				res.status(404).send({mensaje: 'No hay noticias !!'});
			}else{
                return res.status(200).send({
					total_items: total,
					mensaje:noticias
				});
			}
		}
	});
}

function saveNoticia(req, res){
	var noticia = new Noticia();
	var params = req.body;
	noticia.titulo = params.titulo;
	noticia.descripcion = params.descripcion;
	noticia.observacion = params.observacion;
	noticia.image = 'null';
	noticia.usuario = params.usuario;

	noticia.save((err, noticiaGuardada) => {
		if(err){
			res.status(500).send({mensaje: 'Error en el servidor'});
		}else{
			if(!noticiaGuardada){
				res.status(404).send({mensaje: 'No se ha guardado la noticia'});
			}else{
				res.status(200).send({mensaje: noticiaGuardada});
			}
		}
	});
}

function updateNoticia(req, res){
	var noticiaId = req.params.id;
	var update = req.body;

	Noticia.findByIdAndUpdate(noticiaId, update, (err, noticiaUpdated) => {
		if(err){
			res.status(500).send({mensaje: 'Error en el servidor'});
		}else{
			if(!noticiaUpdated){
				res.status(404).send({mensaje: 'No se ha actualizado la noticia'});
			}else{
				res.status(200).send({mensaje: noticiaUpdated});
			}
		}
	});
}

function deleteNoticia(req, res){
	var noticiaId = req.params.id; 

    Noticia.findByIdAndRemove(noticiaId,(err,noticiaEliminada)=>{
        if(err){
			res.status(500).send({mensaje: 'Error en el servidor'});
		}else{
			if(!noticiaEliminada){
				res.status(404).send({mensaje: 'La noticia no ha sido eliminado'});
			}else{
                res.status(200).send({mensaje: noticiaEliminada});
            }
        }

    });
}

function uploadImage(req, res){
	var albumId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) => {
				if(!albumUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({album: albumUpdated});
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/albums/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}


module.exports = {
	getNoticias,
	saveNoticia,
	updateNoticia,
	deleteNoticia,
	uploadImage,
	getImageFile
};