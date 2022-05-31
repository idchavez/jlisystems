//Cargamos la conexion
var connection = require('../conexion')

//Creamos un objeto para ir almacenando lo que necesitamos 
var PaisModel = {};

//obtenemos todos los tipos de paises
PaisModel.getPaises = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD
        var sql = "SELECT id_pais"
            + ", pais"
            + " FROM paises"
            +" ORDER BY pais;";

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

//obtenemos un pais por su id 
PaisModel.getPais = function (id,callback) {

    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para la BD
        var sql = "SELECT id_pais"
            + ", pais"
            + " FROM paises"
            +" WHERE id_pais = "
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


//A�adir un nuevo pais
PaisModel.insertPais = function (PaisData,callback) {
    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para crea registros de modo dinamico a la BD
        //Al poner SET ?, indica que es un JSON que se difinio en ruta cada campo con su informacion
        var sql = "INSERT INTO paises SET ?";

        //Se usa la conexion para enviar la instrucion SQL
        connection.query(sql, PaisData, function (error, result){
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


//Actualizar un pais
PaisModel.updatePais = function (PaisData, callback) {
    //console.log("32 tal");
    if (connection) {
        var sql = "UPDATE paises SET"
            + " pais = " + connection.escape(PaisData.pais)
            + " WHERE id_pais = " + connection.escape(PaisData.id_pais) + ";";

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


module.exports = PaisModel;