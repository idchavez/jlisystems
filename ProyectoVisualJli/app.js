var express = require('express');//guarda express que nosotros intalamos
var bodyParser = require('body-parser'), port = 3000;//rmanejo de cuerpo de la "pagina" y puerto
var http = require('http');//protocolo de intercambio de archivos
var path = require('path');//direccion

//Van las entidades que se usan, son las rutas
//var conectado = require('./src/conexion/index');
var tipdoc = require('./src/rutas/TipDocRuta');//ruta para tabla Tipos de documento
var persona = require('./src/rutas/PersonaRuta');//ruta para tabla Personas
var tiposPersona = require('./src/rutas/TiposPersonaRuta');//ruta para tabla tipo de Personas
var prestamo = require('./src/rutas/PrestamoRuta');//ruta para tabla prestamos
var pais = require('./src/rutas/PaisRuta');//ruta para tabla paises
var libro = require('./src/rutas/LibroRuta');//ruta para tabla libros
var idioma = require('./src/rutas/IdiomaRuta');//ruta para tabla idiomas
var genero = require('./src/rutas/GeneroRuta');//ruta para tabla generos
var estadoLibro = require('./src/rutas/EstadoLibroRuta');//ruta para tabla estados_libro
var editorial = require('./src/rutas/EditorialRuta');//ruta para tabla editoriales
var autor = require('./src/rutas/AutorRuta');//ruta para tabla Autores



var app = express();//recibe un constructor

// todos los entornos
app.set('port', process.env.PORT || port);//metodo para recibir puerto y proceso
app.use(bodyParser.json({type: 'application/json', limit: '10mb'}));//recibe un cuerpo y un objeto json
app.use(bodyParser.urlencoded({extended: false}));//recibe url codificada
app.use(express.static(path.join(__dirname, 'public')));//recibe direccion

//================================================================

app.use(function (req, res, next)
{

    // Stio web al que desea permitir que se conecte
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // A que métodos que desea dar permisos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // A que  encabezados se les va a dar permiso
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Establezca en verdadero si necesita que el sitio web incluya cookies en las solicitudes enviadas
    //a la API (por ejemplo, en caso de que use sesiones)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pase a la siguiente capa de middleware
    next();
  });

  //============================================================

  //Se colocan todas las tablas de esta forma, es todos los modelos
  app.use('/tipDoc', tipdoc());//ruta para el servicio
  app.use('/persona', persona());//ruta para el servicio
  app.use('/tiposPersona', tiposPersona());//ruta para el servicio
  app.use('/prestamo', prestamo());//ruta para el servicio
  app.use('/pais', pais());//ruta para el servicio
  app.use('/libro', libro());//ruta para el servicio
  app.use('/idioma', idioma());//ruta para el servicio
  app.use('/genero', genero());//ruta para el servicio
  app.use('/estadoLibro', estadoLibro());//ruta para el servicio
  app.use('/editorial', editorial());//ruta para el servicio
  app.use('/autor', autor());//ruta para el servicio



http.createServer(app).listen(app.get('port'), function ( )
{
    console.log('Servidor Express escuchando por el puerto ' + app.get('port'));
});

module.exports = app;

