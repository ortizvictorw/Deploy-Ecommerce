//** Coneccion a la base de Datos Mongodb **/
const mongoose = require ('mongoose');
const coneccionDB = ()=>{
    const baseURL=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.svigf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
    mongoose.set('useCreateIndex', true)
    
    mongoose.connect(baseURL, { useNewUrlParser: true, useUnifiedTopology: true  } )
    .then(db =>console.log('conexion exitosa a Mongodb'))
    .catch(err => console.error(err));
}
module.exports = coneccionDB;

