//obtenemos instancia del modelo
//Cargamos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo LibroModel con toda la funcionalidad
var LibroModel = require('../modelos/LibroModel');


//creamos el ruteo de la clase
module.exports = function()
{
    //muestra el metodo CRUD  listar que muestra todas las personas con el INNER JOIN
    router.get("/", function(req, res)
    {
        //Llama el metodo de listar los registros a travez de la instancia de la clase modelo
        LibroModel.getLibros(function(error, data)
        {
            //Se resive la data y se forza a Json
            res.status(200).json(data);
        });
    });

    //muestra el metodo CRUD listar que muestra todos los libros con los ID de las llaves foraneas
    router.get("/c", function(req, res)
    {
        //Llama el metodo de listar los registros a travez de la instancia de la clase modelo
        LibroModel.getLibros1(function(error, data)
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
            LibroModel.getLibro(id, function (error, data) {
                //Si el libro no existe lo mostamos en forma json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //En otro caso mostramos una respuesta de no existe
                else {
                    res.json(404, { "msg": "Libro no Existe" });
                }
            });
        }//Si hay algun error porque el ID no es numero
        else {
            res.status(500).json({ "msg": "error" });
        }
    });


    //Muestra y captura los datos del metodo CRUD crear, usando el verbo post, este es el que se coloca en Modelo como SET ?
    router.post("/", function(req, res){
        //Creamos un objeto Json con los datos de la persona
        var LibroData = {
            //Aqui se usa req.body ya que se guardara clave valor, lo que se modifique quedara guardado de esa forma
            id_Libro: null,
            titulo: req.body.titulo,
            paginas: req.body.paginas,
            edicion: req.body.edicion,
            editorial_libro: req.body.editorial_libro,
            fecha_Publicacion: req.body.fecha_Publicacion,
            idioma_libro: req.body.idioma_libro,
            genero_libro: req.body.genero_libro,
            autor_libro: req.body.autor_libro,
            estado_libro: req.body.estado_libro
            
        };

        //Usamos la funcion anterior para insertar que esta en la instancia del modelo
        LibroModel.insertLibro(LibroData, function(error, data){
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
        var LibroData = {    
            id_Libro: req.body.id_Libro,
            titulo: req.body.titulo,
            paginas: req.body.paginas,
            edicion: req.body.edicion,
            editorial_libro: req.body.editorial_libro,
            fecha_Publicacion: req.body.fecha_Publicacion,
            idioma_libro: req.body.idioma_libro,
            genero_libro: req.body.genero_libro,
            autor_libro: req.body.autor_libro,
            estado_libro: req.body.estado_libro,
        };
        //Usamos la funcion para actualizar
        LibroModel.updateLibro(LibroData, function(error, data){
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

        

