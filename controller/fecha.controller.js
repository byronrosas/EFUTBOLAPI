'use strict'

var path = require('path');
var fs = require('fs');
var Fecha = require('../models/fecha.model');


function saveFecha(req,res){
    console.log("Saving Fecha...");
    
    //Params (equipos[],idCategoria)
    var params=req.body;
    //LOGICA DE ENCUENTROS    
var equiposId=params.equipos;
var nEquipos;
var auxnEquipos;
var fechas;

// LOGICA
nEquipos=equiposId.length;

if((nEquipos%2)==0)
{
    //Equipos Pares  
    fechas=generarMatrizFechas(nEquipos,equiposId);  
}else{
    //Equipos impares
    auxnEquipos=nEquipos+1;  
    equiposId.push("Descanso");  
    fechas=generarMatrizFechas(auxnEquipos,equiposId);  
}

//FIN LOGICA DE ENCUENTROS
try{    
    var i=0;
    for(i in fechas){
        // Por fechas 
         
        console.log(fechas[i]);        
        fechas[i].forEach(function(f) {
            var fecha = new Fecha();
            fecha.n_fecha=i;
            fecha.estado_fecha=false;
            fecha.id_categoria=params.id_categoria; 
            if(f.e1=="Descanso"){
                fecha.id_equipo1=null;
            }else{
                fecha.id_equipo1=f.e1;
            }
            
            if(f.e2=="Descanso"){
                fecha.id_equipo2=null;
            }else{
                fecha.id_equipo2=f.e2;
            }        
            
            fecha.goles_equipo1=0;
            fecha.tarjetas_amarilla_equipo1=0;
            fecha.tarjetas_roja_equipo1=0;
            fecha.observacion_equipo1="No tiene observaciones."
            fecha.goles_equipo2=0;
            fecha.tarjetas_amarilla_equipo2=0;
            fecha.tarjetas_roja_equipo2=0;
            fecha.observacion_equipo2="No tiene observaciones."
    
            fecha.save((err,fechaGuardada) => {
                if(err){
                    console.log(err);
                    res.status(500).send({mensaje: "Error en el servidor"});
                }else{ 
                    if (!fechaGuardada) {
                       throw err;
                    }                                                                   
                }
            });
        }, this);                   
        
    }    
}catch(e){
    res.status(404).send({mensaje: 'Error al crear una fecha.'});
}finally{
    res.status(200).send({fechas:fechas});
}

    

}


function getFechaById(req,res){
    console.log("Getting by id Fecha...");
    var fechaId = req.params.id;
    Fecha.findById(fechaId).exec((err, fechaSelecionada) => {
        if (err) {
            res.status(500).send({ mensaje: "Error en el servidor" });
        } else {
            if (!fechaSelecionada) {
                res.status(404).send({ mensaje: "La fecha no se puede encontrar" });
            } else {
                res.status(200).send({fechaSelecionada });
            }
        }
    });
    
}

function getFechas(req,res){
    console.log("Getting  Fecha...");
    Fecha.find({},(err,fechas)=>{
        if(err){
            res.status(500).send({ mensaje: "Error en el servidor" });
        }else{
            if(!fechas){
                res.status(404).send({ mensaje: "No existen fechas creadas" });
            }else{
                res.status(200).send(fechas);
            }
        }
    });
    
}

function updateFecha(req,res){
    console.log("Updating Fecha...");
    var fechaId = req.params.id;
    var update = req.body;

    Fecha.findByIdAndUpdate(fechaId, update, function (err, fechaActualizada) {
        if (err) {
            res.status(500).send({ mensaje: "Error del servidor" });
        } else {
            if (!fechaActualizada) {
                res.status(404).send({ mensaje: "Error no se puede actualizar la fecha seleccionada" });
            } else {
                res.status(200).send({ fechaActualizada })
            }
        }
    })
}

function generarMatrizFechas(n,equiposId){
    var Fechas={};    
    var partidos={};
    var numFechas=n-1;
    var numPartidos=(n/2);
    for(var i=0;i<numFechas;i++){              
        for(var j=0;j<numPartidos;j++){
            partidos['p'+j]={
                e1:'',
                e2:''
            }
        }        
        Fechas['fecha'+i]=partidos;

    }
    console.log(Fechas);    
var indice2=n;
var indice1;
var fechasFinal={};
var aux,aux3=false;
    for(var i=0;i<numFechas;i++){   
        indice2=n-i-1;
        indice1=0;
        var aux2=1
        console.log("Qpasa:"+indice2); 
        aux=indice2;
        aux3=false;
        var encuentros=[];
        for(var j=0;j<numPartidos;j++){            
            //ID E1
            console.log(indice1);
            encuentros.push({
                e1:equiposId[indice1],
                e2:''
            });            
            if(i>=1 && i!=j && j<=i)
                {
                    indice1=aux+j+1;                    
                } else{
                    if(i!=0 && aux3==false){
                        aux3=true;
                        indice1=0;
                    }                    
                    indice1++;                    
                }                        
            //ID E2                      
            
            if(indice2==0 && aux2==1){
                indice2=n-1; 
                aux2=0;                                                                               
            } 
            console.log(indice2);
            encuentros[j].e2=equiposId[indice2];
            indice2=indice2-1;           
            
        }

        fechasFinal[i]=encuentros;
    }

    console.log(fechasFinal);  
    return fechasFinal;  
}  

module.exports = {
    saveFecha,
    getFechaById,
    getFechas,
    updateFecha
}