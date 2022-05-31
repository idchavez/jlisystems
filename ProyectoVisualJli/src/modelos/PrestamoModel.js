//Cargamos la conexion
var connection = require('../conexion')

//Creamos un objeto para ir almacenando lo que necesitamos 
var PrestamoModel= {};

//obtenemos todas los prestamos con un INNER JOIN para mostrar la informacion de las llaves foraneas
PrestamoModel.getPrestamos = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT prestamos.id_prestamo, prestamos.fecha_prestamo"
        +", prestamos.fecha_entrega"
        +", prestamos.Detalles"
        +", libros.titulo"
        +", generos.genero"
        +", prestamos.entrega_real"
        +", personas.primer_Nombre"
        +", prestamos.multa"
        +" FROM prestamos"
        +" INNER JOIN libros ON prestamos.Prestamo_libro = libros.id_Libro INNER JOIN personas ON prestamos.prestamo_persona = personas.id_persona"
        +" INNER JOIN generos ON genero_libro=generos.id_genero"
        +" ORDER BY Detalles;";

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



//obtenemos todo los prestamos con los ID de las llaves foraneas
PrestamoModel.getPrestamos1 = function (callback) {
    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT id_prestamo,"
        +" fecha_prestamo, fecha_entrega, Detalles, Prestamo_libro, entrega_real, prestamo_persona, multa"
        +" FROM prestamos ORDER BY Detalles;";
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


//obtenemos una prestamo por su id 
PrestamoModel.getPrestamo = function (id,callback) {

    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para la BD
        var sql = "SELECT prestamos.id_prestamo, prestamos.fecha_prestamo"
        +", prestamos.fecha_entrega"
        +", prestamos.Detalles"
        +", libros.titulo"
        +", generos.genero"
        +", prestamos.entrega_real"
        +", personas.primer_Nombre"
        +", prestamos.multa"
        +" FROM prestamos"
        +" INNER JOIN libros ON prestamos.Prestamo_libro = libros.id_Libro INNER JOIN personas ON prestamos.prestamo_persona = personas.id_persona"
        +" INNER JOIN generos ON genero_libro=generos.id_genero"
        +" WHERE id_prestamo = "
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

//A�adir una nuevo prestamo
PrestamoModel.insertPrestamo= function (PrestamoData,callback) {
    //Se valida la conexion
    if (connection) {
        //Se hace la instruccion SQL para crea registros de modo dinamico a la BD
        //Al poner SET ?, indica que es un JSON que se difinio en ruta cada campo con su informacion
        var sql = "INSERT INTO prestamos SET ?";

        //Se usa la conexion para enviar la instrucion SQL
        connection.query(sql, PrestamoData, function (error, result){
            //Se valida si hay error
            if (error) {
                throw error;
            } else {
                //mensaje de exito
                callback(null, { "msg": "Prestamo Insertado"});
            }
        });
    }
}

//Actualizar un prestamo
PrestamoModel.updatePrestamo = function (PrestamoData, callback) {
    //console.log("32 tal");
    if (connection) {
        var sql = "UPDATE prestamos SET"
        +" fecha_prestamo = " + connection.escape(PrestamoData.fecha_prestamo)
        +", fecha_entrega = " + connection.escape(PrestamoData.fecha_entrega)
        +", Detalles = " + connection.escape(PrestamoData.Detalles)
        +", Prestamo_libro = " + connection.escape(PrestamoData.Prestamo_libro)
        +", entrega_real = " + connection.escape(PrestamoData.entrega_real)
        +", prestamo_persona = " + connection.escape(PrestamoData.prestamo_persona)
        +", multa = " + connection.escape(PrestamoData.multa)
        +" WHERE id_prestamo = " + connection.escape(PrestamoData.id_prestamo) + ";"
            
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

//INFORMES REALIZADOS

//Buscar prestamos filtrando por id de usuario y por un lapso de fecha/ INFORME PRINCIPAL REQUERIDO POR EL CLIENTE
PrestamoModel.getPrestamoFiltro = function (idPersona, fechaIni, fechaFin, callback){
    //Se valida la conexion
    if(connection){
        //Se hace la instruccion SQL para BD y buscar los prestamos del lector indicado
        /** var sql = "SELECT `id_prestamo`, tipos_documento.tipo_doc'Documento',"
        +" personas.num_documento'Numero de identificacion', personas.primer_Nombre'Nombre',"
        +" libros.titulo'Libro',`fecha_prestamo`, `fecha_entrega`, `Detalles`, `entrega_real`, `multa`"
        +" FROM `prestamos`"
        +" INNER JOIN personas ON prestamos.prestamo_persona = personas.id_persona"
        +" INNER JOIN libros ON prestamos.Prestamo_libro = libros.id_Libro"
        +" INNER JOIN tipos_documento on personas.tipo_doc_persona = tipos_documento.id_tipo_doc"
        //Se captura el ID, la fecha de INICIO y la fehca FINAL para usarlo en el WHERE        
        +" WHERE prestamo_persona LIKE "
        + connection.escape(idPersona) + " AND fecha_prestamo BETWEEN " 
        + connection.escape(fechaIni) + " AND "
        + connection.escape(fechaFin) + " ORDER BY fecha_prestamo LIMIT 500;";*/

        
        var sql = "SELECT `id_prestamo`, "
        +"prestamos.prestamo_persona 'Nombre', "
        +"prestamos.Prestamo_libro'Libro',`fecha_prestamo`, "
        +"`fecha_entrega`, "
        +"`Detalles`, "
        +"`entrega_real`, "
        +"`multa` "
        +"FROM `prestamos`WHERE prestamo_persona LIKE "
        + connection.escape(idPersona) +" AND fecha_prestamo BETWEEN "
        + connection.escape(fechaIni) +" AND "
        + connection.escape(fechaFin) + " ORDER BY fecha_prestamo LIMIT 500;";
        
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

//INFORME PARA PODER VER LOS PRESTAMOS POR CADA LECTOR, PARA BUSCAR EN POSTMAN ES prestamo/l/id de la persona
PrestamoModel.getPrestamoPersona = function (idPersona, callback){
    //Se valida la conexion
    if(connection){
        //Se hace la instruccion SQL para BD y buscar los prestamos del lector indicado
        var sql = "SELECT `id_prestamo`, `fecha_prestamo`'fecha de Prestamo',"
        +" `fecha_entrega` 'Fecha de entrega', `Detalles`, libros.titulo,"
        +" `entrega_real`'Fecha de entrega', personas.primer_Nombre 'Nombre',"
        +" `multa`"
        +" FROM `prestamos`"
        +" INNER JOIN libros ON prestamos.Prestamo_libro = libros.id_Libro"
        +" INNER JOIN personas on prestamos.prestamo_persona = personas.id_persona"
        +" WHERE prestamo_persona LIKE "
        //Se captura el ID para usarlo en el WHERE
        + connection.escape(idPersona) + " ORDER BY fecha_prestamo LIMIT 500;";
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

//Determinar o mostrar el user con mas prestamos, se mostrara de mayor a menor, PARA BUSCAR EN POSTMAN  
PrestamoModel.getPrestamoM = function (callback){

    //Se valida la conexion con la BD
    if (connection) {
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT tipos_documento.tipo_doc'Documento',"
        +" personas.num_documento'Numero de identificacion',"
        +" personas.primer_Nombre'Nombre', COUNT(id_prestamo) AS Total_prestados"
        +" FROM prestamos"
        +" INNER JOIN personas ON prestamos.prestamo_persona = personas.id_persona"
        +" INNER JOIN tipos_documento on personas.tipo_doc_persona = tipos_documento.id_tipo_doc"
        +" GROUP BY prestamo_persona HAVING Total_prestados > 0 ORDER BY Total_prestados DESC;"
                
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


// Para poder mirar el total de veces que se ha prestado un libro y se ordena de mayor a menor
PrestamoModel.getPrestamoFecha = function (callback){

    //Se valida la conexion con la BD
    if (connection) {

        
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT libros.titulo , Detalles, COUNT(id_prestamo) AS Total_de_veces_prestado FROM prestamos INNER JOIN libros ON prestamos.Prestamo_libro = libros.id_Libro INNER JOIN personas ON prestamos.prestamo_persona = personas.id_persona GROUP BY libros.titulo HAVING Total_de_veces_prestado > 0 ORDER BY Total_de_veces_prestado DESC;";

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

// Para poder mirar cual es el genero de libro que se solicita mas ordenado de mayor a menor
PrestamoModel.getPrestamoGenero = function (callback){

    //Se valida la conexion con la BD
    if (connection) {

        
        //Se hace la instrucion SQL para la BD, en este caso se usa INNER JOIN para que cuando se imprima la tabal muestre la informacion de cada campo, no mostrara llaves foraneas
        var sql = "SELECT generos.genero, COUNT(id_prestamo) AS Total_solicitudes FROM prestamos INNER JOIN libros ON prestamos.Prestamo_libro = libros.id_Libro INNER JOIN personas ON prestamos.prestamo_persona = personas.id_persona INNER JOIN generos ON genero_libro=generos.id_genero GROUP BY generos.genero HAVING Total_solicitudes > 0 ORDER BY Total_solicitudes DESC;";

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





//Libro mas prestado
//Genero de libro mas prestado

module.exports = PrestamoModel;