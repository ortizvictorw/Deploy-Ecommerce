//** MODULOS REQUERIDOS **/
require ('dotenv').config();
const coneccionDB = require ('./src/database/config')
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require ('cors');



//** ROUTERS **/
//** API ROUTERS **/
const ApiProductosRouter = require('./src/routes/productos');
const ApiUsuariosRouter = require('./src/routes/usuarios');
const ApiPAgosRouter = require('./src/routes/pagos');


//** REQUIRE DE CREACION DE ROLES AL INICIO **/
const CreateRole = require ('./src/libs/seteoInicial')


//** EJECUCION DE EXPRESS **/
const app = express();


//** CONECCION CON MONGO DB **/
coneccionDB();
//** CREACION DE ROLES AL INICIO **/
CreateRole();



//** MEDDLEWARES **/

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//** RUTAS **/



//** RUTAS API**/
app.use('/api/productos', ApiProductosRouter);
app.use('/api/usuarios', ApiUsuariosRouter);
app.use('/api/pagos', ApiPAgosRouter);

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(__dirname + "/public"));

module.exports = app;
