//Cargamos la conexion
var connection = require('../conexion')

//Creamos un objeto para ir almacenando lo que necesitamos 
var PersonaModel= {};

//obtenemos todas las personas con un INNER JOIN para mostrar la informacion de las llaves foraneas
PersonaModel.getPersonas = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT personas.id_persona"
        +", personas.primer_Nombre"
        +", personas.segundo_Nombre"
        +", personas.primer_Apellido"
        +", personas.segundo_Apellido"
        +", personas.fecha_Nacimiento"
        +", tipos_persona.tipo_persona"
        +", tipos_documento.tipo_doc"
        +", personas.num_documento"
     //   +", correo"
       // +", contraseña"
        +" FROM personas"
        +" INNER JOIN tipos_persona ON personas.tipo_de_persona = tipos_persona.id_tipo_persona INNER JOIN tipos_documento ON personas.tipo_doc_persona = tipos_documento.id_tipo_doc"
        +" ORDER BY primer_Nombre;";

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

//obtenemos todas las personas con los ID de las llaves foraneas
PersonaModel.getPersonas1 = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT id_persona,"
        +" primer_Nombre,"
        +" segundo_Nombre,"
        +" primer_Apellido,"
        +" segundo_Apellido,"
        +" fecha_Nacimiento,"
        +" tipo_de_persona,"
        +" tipo_doc_persona,"
        +" num_documento"
      //  +", correo"
       // +", contraseña"        
        +" FROM personas ORDER BY primer_Nombre;";

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

//obtenemos una persona por su id 
PersonaModel.getPersona = function (id,callback) {

    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para la BD
        var sql = "SELECT personas.id_persona"
        +", personas.primer_Nombre"
        +", personas.segundo_Nombre"
        +", personas.primer_Apellido"
        +", personas.segundo_Apellido"
        +", personas.fecha_Nacimiento"
        +", tipos_persona.tipo_persona"
        +", tipos_documento.tipo_doc"
        +", personas.num_documento"
      //  +", correo"
       // +", contraseña"        
        +" FROM personas"
        +" INNER JOIN tipos_persona ON personas.tipo_de_persona = tipos_persona.id_tipo_persona INNER JOIN tipos_documento ON personas.tipo_doc_persona = tipos_documento.id_tipo_doc"
        +" WHERE id_persona = "
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

//obtenemos una persona por su CORREO y por CONTRASEÑA las dos debe estar bien para poder generar la busquedad
PersonaModel.getPersonaSesion = function (correo, contrasena, callback) {

    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para BD y buscar los prestamos del lector indicado
        var sql = "SELECT `id_persona`, personas.primer_Nombre , personas.segundo_Nombre ,"
        +" personas.primer_Apellido , personas.segundo_Apellido , personas.fecha_Nacimiento ,"
            +" tipos_persona.tipo_persona , tipos_documento.tipo_doc , personas.num_documento "
          //  +" correo , contraseña"
            +" FROM personas"
            +" INNER JOIN tipos_persona ON personas.tipo_de_persona = tipos_persona.id_tipo_persona"
            +" INNER JOIN tipos_documento ON personas.tipo_doc_persona = tipos_documento.id_tipo_doc"
            //Se captura el correo y la contraseña para usarlo en el WHERE        
            +" WHERE correo LIKE " + connection.escape(correo) + "AND contraseña LIKE "
            + connection.escape(contrasena) + "ORDER BY personas.primer_Nombre LIMIT 500;";

            //Se usa la conexion para enviar la instruccion SQL 
            connection.query(sql, function (error, row) {
                //Se valida si hay error
                if (error) {
                    throw error;
                } else {
                    //Devuelve la fila como un Json
                    //callback(null, row);
                    //Convierte la fila Json a una cadena de texto para Angular
                    callback(null, JSON.stringify(row));
                }
            });
  
    }
}



//A�adir una nueva persona
PersonaModel.insertPersona= function (PersonaData,callback) {
    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para crea registros de modo dinamico a la BD
        //Al poner SET ?, indica que es un JSON que se difinio en ruta cada campo con su informacion
        var sql = "INSERT INTO personas SET ?";

        //Se usa la conexion para enviar la instrucion SQL
        connection.query(sql, PersonaData, function (error, result){
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


//Actualizar una persona
PersonaModel.updatePersona= function (PersonaData, callback) {
    //console.log("32 tal");
    if (connection) {
        var sql = "UPDATE personas SET"
        +" primer_Nombre = " + connection.escape(PersonaData.primer_Nombre)
        +", segundo_Nombre = " + connection.escape(PersonaData.segundo_Nombre)
        +", primer_Apellido = " + connection.escape(PersonaData.primer_Apellido)
        +", segundo_Apellido = " + connection.escape(PersonaData.segundo_Apellido)
        +", fecha_Nacimiento = " + connection.escape(PersonaData.fecha_Nacimiento)
        +", tipo_de_persona = " + connection.escape(PersonaData.tipo_de_persona)
        +", tipo_doc_persona = " + connection.escape(PersonaData.tipo_doc_persona)
        +", num_documento = " + connection.escape(PersonaData.num_documento)
      //  +", correo = " + connection.escape(PersonaData.correo)
      //  +", contraseña = " + connection.escape(PersonaData.contraseña)   
        +" WHERE id_persona = " + connection.escape(PersonaData.id_persona) + ";";
        
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

module.exports = PersonaModel;