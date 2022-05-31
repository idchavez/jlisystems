//obtenemos instancia del modelo
//Cargamos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo EstadoLibroModel con toda la funcionalidad
var EstadoLibroModel = require('../modelos/EstadoLibroModel');


//creamos el ruteo de la clase
module.exports = function()
{
    //muestra el metodo CRUD  listar que muestra todos los Estado_Libro
    router.get("/", function(req, res)
    {
        //Llama el metodo de listar los registros a travez de la instancia de la clase modelo
        EstadoLibroModel.getEstadoLibros(function(error, data)
        {
            //Se resive la data y se forza a Json
            res.status(200).json(data);
        });
    });



    //Muestra el metodo CRUD read(leer), que muestra el Estado_Libro solicitado
    router.get("/:id", function (req, res) {
        //Se crea la variable para el ID que se recibe
        var id = req.params.id;

        //Se valida que el ID sea un numero
        if (!isNaN(id)) {
            //Se llama el metodo de listar los registros a travez de la instancia de la clase modelo y se envia el ID capturado
            EstadoLibroModel.getEstadoLibro(id, function (error, data) {
                //Si el genero existe lo mostramos en forma json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //En otro caso mostramos una respuesta de no existe
                else {
                    res.json(404, { "msg": "Registro no Existe" });
                }
            });
        }//Si hay algun error porque el ID no es numero
        else {
            res.status(500).json({ "msg": "error" });
        }
    });


    //Muestra y captura los datos del metodo CRUD crear, usando el verbo post, este es el que se coloca en Modelo como SET ?
    router.post("/", function(req, res){
        //Creamos un objeto Json con los datos del Estado_Libro
        var EstadoLibroData = {
            id_estado: null,
            estado: req.body.estado,        
        };

        //Usamos la funcion anterior para insertar que esta en la instancia del modelo
        EstadoLibroModel.insertEstadoLibro(EstadoLibroData, function(error, data){
            //Se muestra el mensaje correspondiente
            if (data){
                res.status(200).json(data);
            }else{
                res.status(500).send({error: "Que mal :C"});
            }
        });
    });

    //Muestra y captura los datos para el metodo CRUD update (actualizar), usando el verbo put
    router.put("/", function(req, res){
        //Almacenamos los datos de la peticion en un objeto
        //console.log(" 38");
        var EstadoLibroData = {    
            id_estado: req.body.id_estado,
            estado: req.body.estado
        };
        //Usamos la funcion para actualizar
        EstadoLibroModel.updateEstadoLibro(EstadoLibroData, function(error, data){
            //Se muestra el mensaje correspondiente
            if(data && data.msg){
                res.status(200).json(data);
            }else{
                res.status(500).send({error: "Que mal...:c"});
            }
        });
    });



    //exportamos el objeto para tenerlo disponible en el app
    return router;

}

        