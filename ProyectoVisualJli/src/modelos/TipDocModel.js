//Cargamos la conexion
var connection = require('../conexion')

//Creamos un objeto para ir almacenando lo que necesitamos 
var TipDocModel = {};

//obtenemos todos los tipos de documentos
TipDocModel.getTipDocs = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD
        var sql = "SELECT id_tipo_doc"
            + ", tipo_doc"
            + ", iniciales_doc"
            + " FROM tipos_documento"
            +" ORDER BY tipo_doc;";

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

//obtenemos un tipo doc por su id 
TipDocModel.getTipDoc = function (id,callback) {

    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para la BD
        var sql = "SELECT id_tipo_doc"
            + ", tipo_doc"
            + ", iniciales_doc"
            + " FROM tipos_documento"
            +" WHERE id_tipo_doc = "
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




//A�adir un nuevo tipo de documento
TipDocModel.insertTipDoc = function (TipDocData,callback) {
    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para crea registros de modo dinamico a la BD
        //Al poner SET ?, indica que es un JSON que se difinio en ruta cada campo con su informacion
        var sql = "INSERT INTO tipos_documento SET ?";

        //Se usa la conexion para enviar la instrucion SQL
        connection.query(sql, TipDocData, function (error, result){
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

//Actualizar un tipo de documento
TipDocModel.updateTipDoc = function (TipDocData, callback) {
    //console.log("32 tal");
    if (connection) {
        var sql = "UPDATE tipos_documento SET"
            + " tipo_doc = " + connection.escape(TipDocData.tipo_doc)
            + ", iniciales_doc = " + connection.escape(TipDocData.iniciales_doc)
            + " WHERE id_tipo_doc = " + connection.escape(TipDocData.id_tipo_doc) + ";";

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




module.exports = TipDocModel;