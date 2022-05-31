//Cargamos la conexion
var connection = require('../conexion')

//Creamos un objeto para ir almacenando lo que necesitamos 
var AutorModel= {};

//obtenemos todos los Autores con un INNER JOIN para mostrar la informacion de las llaves foraneas
AutorModel.getAutores = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT autores.id_autor,"
        +" personas.primer_Nombre 'Autor', paises.pais , autores.Biografia , autores.Estudios , autores.mail"
        +" FROM autores"
        +" INNER JOIN personas ON autores.id_autor = personas.id_persona"
        +" INNER JOIN paises ON autores.pais_autor = paises.id_pais ORDER BY Biografia;";
        
        //Se usa la conexion para enviar la Instrucion SQL connection.query(sql, function (error, rows) 

        connection.query(sql, function (error, rows) {
            //Se  valida si hay error
            if (error) {
                throw error;
            } else {
                //Devuelve las filas como un Json (Clave, valor)
                //callback(null, rows)
                //Devuelve las filas Json a una cadena de texto para Angular
                callback(null, JSON.stringify(rows))
            }
        });
    }
}

//obtenemos todos los Autores con los ID de las llaves foraneas
AutorModel.getAutor1 = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT id_autor, pais_autor, Biografia, Estudios, mail FROM autores ORDER BY Biografia;";

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

//obtenemos un Autor por su id 
AutorModel.getAutor = function (id,callback) {

    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para la BD
        var sql = "SELECT autores.id_autor,"
        +" personas.primer_Nombre 'Autor', paises.pais , autores.Biografia , autores.Estudios , autores.mail"
        +" FROM autores"
        +" INNER JOIN personas ON autores.id_autor = personas.id_persona"
        +" INNER JOIN paises ON autores.pais_autor = paises.id_pais"
        +" WHERE id_autor = "
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


//A�adir un nuevo Autor
AutorModel.insertAutor= function (AutorData,callback) {
    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para crea registros de modo dinamico a la BD
        //Al poner SET ?, indica que es un JSON que se difinio en ruta cada campo con su informacion
        var sql = "INSERT INTO autores SET ?";

        //Se usa la conexion para enviar la instrucion SQL
        connection.query(sql, AutorData, function (error, result){
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


//Actualizar un Autor
AutorModel.updateAutor = function (AutorData, callback) {
    //console.log("32 tal");
    if (connection) {
        var sql = "UPDATE autores SET"
        +" pais_autor = " + connection.escape(AutorData.pais_autor)
        +", Biografia = " + connection.escape(AutorData.Biografia)
        +", Estudios = " + connection.escape(AutorData.Estudios)
        +", mail = " + connection.escape(AutorData.mail)
        +" WHERE id_autor = " + connection.escape(AutorData.id_autor) + ";";
        
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

module.exports = AutorModel;