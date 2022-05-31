//obtenemos instancia del modelo
//Cargamos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo PersonaModel con toda la funcionalidad
var PersonaModel = require('../modelos/PersonaModel');


//creamos el ruteo de la clase
module.exports = function()
{
    //muestra el metodo CRUD  listar que muestra todas las personas con el INNER JOIN
    router.get("/", function(req, res)
    {
        //Llama el metodo de listar los registros a travez de la instancia de la clase modelo
        PersonaModel.getPersonas(function(error, data)
        {
            //Se resive la data y se forza a Json
            res.status(200).json(data);
        });
    });

    //muestra el metodo CRUD listar que muestra todas las personas con los ID de las llaves foraneas
    router.get("/c", function(req, res)
    {
        //Llama el metodo de listar los registros a travez de la instancia de la clase modelo
        PersonaModel.getPersonas1(function(error, data)
        {
            //Se resive la data y se forza a Json
            res.status(200).json(data);
        });
    });    



    //Muestra el metodo CRUD read(leer), que muestra la persona solicitada
    router.get("/:id", function (req, res) {
        //Se crea la variable para el ID que se recibe
        var id = req.params.id;

        //Se valida que el ID sea un numero
        if (!isNaN(id)) {
            //Se llama el metodo de listar los registros a travez de la instancia de la clase modelo y se envia el ID capturado
            PersonaModel.getPersona(id, function (error, data) {
                //Si la persona no existe lo mostamos en forma json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //En otro caso mostramos una respuesta de no existe
                else {
                    res.json(404, { "msg": "Persona no Existe" });
                }
            });
        }//Si hay algun error porque el ID no es numero
        else {
            res.status(500).json({ "msg": "error" });
        }
    });


    //Muestra el metodo CRUD read(leer), que muestra la persona solicitada por medio del correo y la contraseña
    router.get("/:correo/:contrasena", function (req, res) {
        //Se crea la variable para el correo y la contraseña que se recibe por el usuario
        var correo = req.params.correo;
        var contrasena = req.params.contrasena;

        //Se valida que el ID sea un numero
        //if (!isNaN(idPersona)) { El NaN sirve para validar que sea un numero, pero como se recibe caracteres no es necesario
            //Se llama el metodo de listar los registros a travez de la instancia de la clase modelo y se envia el ID capturado
            PersonaModel.getPersonaSesion(correo, contrasena, function (error, data) {
                //Si la persona no existe lo mostamos en forma json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //En otro caso mostramos una respuesta de no existe
                else {
                    res.json(404, { "msg": "Cuenta no existe, correo o contraseña incorrecta" });
                }
            });
        /*}//Si hay algun error porque el ID no es numero
        else {
            res.status(500).json({ "msg": "error" });
        }*/       
    });    


    //Muestra y captura los datos del metodo CRUD crear, usando el verbo post, este es el que se coloca en Modelo como SET ?
    router.post("/", function(req, res){
        //Creamos un objeto Json con los datos de la persona
        var PersonaData = {
            //Aqui se usa req.body ya que se guardara clave valor, lo que se modifique quedara guardado de esa forma
            id_persona: null,
            primer_Nombre: req.body.primer_Nombre,
            segundo_Nombre: req.body.segundo_Nombre,
            primer_Apellido: req.body.primer_Apellido,
            segundo_Apellido: req.body.segundo_Apellido,
            fecha_Nacimiento: req.body.fecha_Nacimiento,
            tipo_de_persona: req.body.tipo_de_persona,
            tipo_doc_persona: req.body.tipo_doc_persona,
            num_documento: req.body.num_documento,
          //  correo: req.body.correo,
           // contraseña:req.body.correo,
        };

        //Usamos la funcion anterior para insertar que esta en la instancia del modelo
        PersonaModel.insertPersona(PersonaData, function(error, data){
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
        var PersonaData = {    
            id_persona: req.body.id_persona,
            primer_Nombre: req.body.primer_Nombre,
            segundo_Nombre: req.body.segundo_Nombre,
            primer_Apellido: req.body.primer_Apellido,
            segundo_Apellido: req.body.segundo_Apellido,
            fecha_Nacimiento: req.body.fecha_Nacimiento,
            tipo_de_persona: req.body.tipo_de_persona,
            tipo_doc_persona: req.body.tipo_doc_persona,
            num_documento: req.body.num_documento,
//            correo: req.body.correo,
  //          contraseña:req.body.correo,
        };
        //Usamos la funcion para actualizar
        PersonaModel.updatePersona(PersonaData, function(error, data){
            //Se muestra el mensaje correspondiente
            if(data && data.msg){
                res.status(200).json(data);
            }else{
                res.status(500).send({error: "Que mal...:c"});
            }
        });
    });

    //exportamos el objeto para tenerlo disponible  en el app
    return router;

}

        

