//Cargamos la conexion
const conexion = require('../conexion');
var connection = require('../conexion')

//Creamos un objeto para ir almacenando lo que necesitamos 
var LibroModel= {};

//obtenemos todo2s los libros con un INNER JOIN para mostrar la informacion de las llaves foraneas
LibroModel.getLibros = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT libros.id_Libro,"
        +" libros.titulo,"
        +" libros.paginas,"
        +" libros.edicion,"
        +" editoriales.nom_Editorial,"
        +" libros.fecha_Publicacion,"
        +" idiomas.idioma,"
        +" generos.genero,"
        +" personas.primer_Nombre 'Autor'," //Para cambiar los nombres de los campos que salen al buscar se pone en comillas sencillas 'Nombre'
        +" estados_libro.estado"
        +" FROM libros"
        +" INNER JOIN editoriales ON libros.editorial_libro = editoriales.id_editorial"
        +" INNER JOIN idiomas ON libros.idioma_libro = idiomas.id_idioma"
        +" INNER JOIN generos ON libros.genero_libro = generos.id_genero"
        +" INNER JOIN personas ON libros.autor_libro = personas.id_persona"
        +" INNER JOIN estados_libro ON libros.estado_libro = estados_libro.id_estado"
        +" ORDER BY titulo;";

        //Se usa la conexion para enviar la Instrucion SQL connection.query(sql, function (error, rows) 

        connection.query(sql, function (error, rows) {
            //Se  valida si hay error
            if (error) {
                throw error;
            } else {
                //Devuelve las filas como un Json (Clave, valor)
                callback(null, rows)
                //Devuelve las filas Json a una cadena de texto para Angular
                //callback(null, JSON.stringify(rows))
            }
        });
    }
}

//obtenemos todas los libros con los ID de las llaves foraneas
LibroModel.getLibros1 = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT id_Libro,"
        +" titulo,"
        +" paginas,"
        +" edicion,"
        +" editorial_libro,"
        +" fecha_Publicacion,"
        +" idioma_libro,"
        +" genero_libro,"
        +" autor_libro," 
        +" estado_libro"
        +" FROM libros ORDER BY titulo;";
        
        //Se usa la conexion para enviar la Instrucion SQL connection.query(sql, function (error, rows) 

        connection.query(sql, function (error, rows) {
            //Se  valida si hay error
            if (error) {
                throw error;
            } else {
                //Devuelve las filas como un Json (Clave, valor)
                callback(null, rows)
                //Devuelve las filas Json a una cadena de texto para Angular
                //callback(null, JSON.stringify(rows))
            }
        });
    }
}

//obtenemos un libro por su id 
LibroModel.getLibro = function (id,callback) {

    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para la BD
        var sql = "SELECT libros.id_Libro,"
        +" libros.titulo,"
        +" libros.paginas,"
        +" libros.edicion,"
        +" editoriales.nom_Editorial,"
        +" libros.fecha_Publicacion,"
        +" idiomas.idioma,"
        +" generos.genero,"
        +" personas.primer_Nombre 'Autor'," //Para cambiar los nombres de los campos que salen al buscar se pone en comillas sencillas 'Nombre'
        +" estados_libro.estado"
        +" FROM libros"
        +" INNER JOIN editoriales ON libros.editorial_libro = editoriales.id_editorial"
        +" INNER JOIN idiomas ON libros.idioma_libro = idiomas.id_idioma"
        +" INNER JOIN generos ON libros.genero_libro = generos.id_genero"
        +" INNER JOIN personas ON libros.autor_libro = personas.id_persona"
        +" INNER JOIN estados_libro ON libros.estado_libro = estados_libro.id_estado"
        +" WHERE id_Libro = "
         //Se captura el ID para usarlo en el WHERE
        + connection.escape(id) + ";";

        //Se usa la conexion para enviar la instruccion SQL 
        connection.query(sql, function (error, row) {
            //Se valida si hay error
            if (error) {
                throw error;
            } else {
                //Devuelve la fila como un Json
                callback(null, row);
                //Convierte la fila Json a una cadena de texto para Angular
                //callback(null, JSON.stringify(row));
            }
        });
    }
}


//A�adir un nuevo libro
LibroModel.insertLibro = function (LibroData,callback) {
    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para crea registros de modo dinamico a la BD
        //Al poner SET ?, indica que es un JSON que se difinio en ruta cada campo con su informacion
        var sql = "INSERT INTO libros SET ?";

        //Se usa la conexion para enviar la instrucion SQL
        connection.query(sql, LibroData, function (error, result){
            //Se valida si hay error
            if (error) {
                throw error;
            } else {
                //mensaje de exito
                callback(null, { "msg": "Registro Insertado"});
            }
        });
    }
}


//Actualizar un libro
LibroModel.updateLibro= function (LibroData, callback) {
    //console.log("32 tal");
    if (connection) {
        var sql = "UPDATE libros SET"
        +" titulo = " + connection.escape(LibroData.titulo)
        +", paginas = " + connection.escape(LibroData.paginas)
        +", edicion = " + connection.escape(LibroData.edicion)
        +", editorial_libro = " + connection.escape(LibroData.editorial_libro)
        +", fecha_Publicacion = " + connection.escape(LibroData.fecha_Publicacion)
        +", idioma_libro = " + connection.escape(LibroData.idioma_libro)
        +", genero_libro = " + connection.escape(LibroData.genero_libro)
        +", autor_libro = " + connection.escape(LibroData.autor_libro)
        +", estado_libro = " + connection.escape(LibroData.estado_libro)
        +" WHERE id_Libro = " + connection.escape(LibroData.id_Libro) + ";";
        
        //Console.log("37 tal "�+ sql);
        connection.query(sql, function (error, result) {
            //Se muestra el mensaje correspondiente
            if (error) {
                throw error;
            } else {
                callback(null, { "msg": "Registro Actualizado" });
            }
        });
    }
}

module.exports = LibroModel;