//obtenemos instancia del modelo
//Cargamos las librerias
var express = require('express');
var router = express.Router();

//obtenemos el modelo PrestamoModel con toda la funcionalidad
var PrestamoModel = require('../modelos/PrestamoModel');


//creamos el ruteo de la clase
module.exports = function()
{
    //muestra el metodo CRUD  listar que muestra todos los prestamos con el INNER JOIN
    router.get("/", function(req, res)
    {
        //Llama el metodo de listar los registros a travez de la instancia de la clase modelo
        PrestamoModel.getPrestamos(function(error, data)
        {
            //Se resive la data y se forza a Json
            res.status(200).json(data);
        });
    });

    
    //muestra el metodo CRUD listar que muestra todos los prestamos con los ID de las llaves foraneas
    router.get("/c", function(req, res)
    {
        //Llama el metodo de listar los registros a travez de la instancia de la clase modelo
        PrestamoModel.getPrestamos1(function(error, data)
        {
            //Se resive la data y se forza a Json
            res.status(200).json(data);
        });
    });    

    //Muestra el metodo CRUD read(leer), que muestra el prestamo solicitado
    router.get("/:id", function (req, res) {
        //Se crea la variable para el ID que se recibe
        var id = req.params.id;

        //Se valida que el ID sea un numero
        if (!isNaN(id)) {
            //Se llama el metodo de listar los registros a travez de la instancia de la clase modelo y se envia el ID capturado
            PrestamoModel.getPrestamo(id, function (error, data) {
                //Si la persona no existe lo mostamos en forma json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //En otro caso mostramos una respuesta de no existe
                else {
                    res.json(404, { "msg": "Prestamo no Existe" });
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
        var PrestamoData = {
            //Aqui se usa req.body ya que se guardara clave valor, lo que se modifique quedara guardado de esa forma
            id_prestamo: null,        
            fecha_prestamo: req.body.fecha_prestamo,
            fecha_entrega: req.body.fecha_entrega,
            Detalles: req.body.Detalles,
            Prestamo_libro: req.body.Prestamo_libro,
            entrega_real: req.body.entrega_real,
            prestamo_persona: req.body.prestamo_persona,
            multa: req.body.multa
            
        };

        //Usamos la funcion anterior para insertar que esta en la instancia del modelo
        PrestamoModel.insertPrestamo(PrestamoData, function(error, data){
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
        var PrestamoData = {    
            id_prestamo: req.body.id_prestamo,        
            fecha_prestamo: req.body.fecha_prestamo,
            fecha_entrega: req.body.fecha_entrega,
            Detalles: req.body.Detalles,
            Prestamo_libro: req.body.Prestamo_libro,
            entrega_real: req.body.entrega_real,
            prestamo_persona: req.body.prestamo_persona,
            multa: req.body.multa
        };
        //Usamos la funcion para actualizar
        PrestamoModel.updatePrestamo(PrestamoData, function(error, data){
            //Se muestra el mensaje correspondiente
            if(data && data.msg){
                res.status(200).json(data);
            }else{
                res.status(500).send({error: "Que mal...:c"});
            }
        });
    });


//RUTA PARA LOS INFORMES

//Ruta para buscar prestamos filtrando por id de usuario y por un lapso de fecha --- REQUERIDA POR EL CLIENTE
router.get("/l/:idPersona/:fechaIni/:fechaFin", function (req, res) {
    //Se crea la variable para el ID que se recibe, la fecha de inicio y la fecha final
    var idPersona = req.params.idPersona;
    var fechaIni = req.params.fechaIni;
    var fechaFin = req.params.fechaFin;

    //Se valida que el ID sea un numero
    //if (!isNaN(idPersona)) { El NaN sirve para validar que sea un numero, pero como se recibe caracteres no es necesario
        //Se llama el metodo de listar los registros a travez de la instancia de la clase modelo y se envia el ID capturado
        PrestamoModel.getPrestamoFiltro(idPersona, fechaIni, fechaFin, function (error, data) {
            //Si la persona no existe lo mostamos en forma json
            if (typeof data !== 'undefined' && data.length > 0) {
                res.status(200).json(data);
            }
            //En otro caso mostramos una respuesta de no existe
            else {
                res.json(404, { "msg": "Prestamo no Existe" });
            }
        });
    /*}//Si hay algun error porque el ID no es numero
    else {
        res.status(500).json({ "msg": "error" });
    }*/
});        


    //Ruta del informe de prestamo por persona
    //Muestra el metodo para ver el prestamo de la persona solicitada
    router.get("/l/:idPersona", function (req, res) {
        //Se crea la variable para el ID que se recibe
        var idPersona = req.params.idPersona;

        //Se valida que el ID sea un numero
        if (!isNaN(idPersona)) {
            //Se llama el metodo de listar los registros a travez de la instancia de la clase modelo y se envia el ID capturado
            PrestamoModel.getPrestamoPersona(idPersona, function (error, data) {
                //Si la persona no existe lo mostamos en forma json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //En otro caso mostramos una respuesta de no existe
                else {
                    res.json(404, { "msg": "Prestamo no Existe" });
                }
            });
        }//Si hay algun error porque el ID no es numero
        else {
            res.status(500).json({ "msg": "error" });
        }
    });    


    //muestra la cantidad de prestamos por persona de mayor a menor
    router.get("/m/a/s", function(req, res)
    {
        //Llama el metodo de listar los registros a travez de la instancia de la clase modelo
        PrestamoModel.getPrestamoM(function(error, data)
        {
            //Se resive la data y se forza a Json
            res.status(200).json(data);
        });
    });

    //Muestra el libro mas prestado 
    router.get("/f/e", function(req, res)
    {
        //Llama el metodo de listar los registros a travez de la instancia de la clase modelo
        PrestamoModel.getPrestamoFecha(function(error, data)
        {
            //Se resive la data y se forza a Json
            res.status(200).json(data);
        });
    });    

    //Muestra el genero mas prestado 
    router.get("/g/e", function(req, res)
    {
        //Llama el metodo de listar los registros a travez de la instancia de la clase modelo
        PrestamoModel.getPrestamoGenero(function(error, data)
        {
            //Se resive la data y se forza a Json
            res.status(200).json(data);
        });
    });       

    
    //exportamos el objeto para tenerlo disponible  en el app
    return router;

}

        

