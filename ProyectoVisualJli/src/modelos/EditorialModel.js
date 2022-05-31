//Cargamos la conexion
var connection = require('../conexion')

//Creamos un objeto para ir almacenando lo que necesitamos 
var EditorialModel= {};

//obtenemos todas las Editoriales con un INNER JOIN para mostrar la informacion de las llaves foraneas
EditorialModel.getEditoriales = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT editoriales.id_editorial"
        +", editoriales.nom_Editorial"
        +", paises.pais"
        +" FROM editoriales"
        +" INNER JOIN paises ON editoriales.pais_editorial = paises.id_pais"
        +" ORDER BY nom_Editorial;";

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

//obtenemos todas las Editoriales con los ID de las llaves foraneas
EditorialModel.getEditorial1 = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT id_editorial, nom_Editorial, pais_editorial FROM editoriales ORDER BY nom_Editorial;";

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

//obtenemos una Editorial por su id 
EditorialModel.getEditorial = function (id,callback) {

    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para la BD
        var sql = "SELECT editoriales.id_editorial"
        +", editoriales.nom_Editorial"
        +", paises.pais"
        +" FROM editoriales"
        +" INNER JOIN paises ON editoriales.pais_editorial = paises.id_pais"
        +" WHERE id_editorial = "
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


//A�adir una nueva Editorial
EditorialModel.insertEditorial= function (EditorialData,callback) {
    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para crea registros de modo dinamico a la BD
        //Al poner SET ?, indica que es un JSON que se difinio en ruta cada campo con su informacion
        var sql = "INSERT INTO editoriales SET ?";

        //Se usa la conexion para enviar la instrucion SQL
        connection.query(sql, EditorialData, function (error, result){
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


//Actualizar una Editorial
EditorialModel.updateEditorial= function (EditorialData, callback) {
    //console.log("32 tal");
    if (connection) {
        var sql = "UPDATE editoriales SET"
        +" nom_Editorial = " + connection.escape(EditorialData.nom_Editorial)
        +", pais_editorial = " + connection.escape(EditorialData.pais_editorial)
        +" WHERE id_editorial = " + connection.escape(EditorialData.id_editorial) + ";";
        
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

module.exports = EditorialModel;