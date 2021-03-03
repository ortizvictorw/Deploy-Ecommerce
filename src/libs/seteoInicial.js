const Role = require ('../database/models/Role');

//**CREACION DE ROLES AL INICIO DE LA APLICACION**/

 const crearRoles = async () => {

    
            //**verifica si existen roles creados**//
    const contadorDeRoles = await Role.estimatedDocumentCount()

    if(contadorDeRoles > 0) return;

    //**si no existen los crea**//
    const valoresRoles = await Promise.all([
        new Role({nombre:"usuario"}).save(),
        new Role({nombre:"vendedor"}).save(),
        new Role({nombre:"administrador"}).save(),   
    ])   

} 

module.exports = crearRoles;
    
