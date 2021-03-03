const express = require('express');
const router = express.Router();
const usuariosController = require ('../controllers/usuariosController')
const { verificacionToken , esAdministrador } = require('../middlewares/index')

/* GET a los usuarios -- endpoint:http://localhost:3000/api/usuarios */
router.get('/', usuariosController.listar);


/* POST a los usuarios -- endpoint:http://localhost:3000/api/usuarios */
router.post('/', usuariosController.register);

/* login del usuario -- endpoint:http://localhost:3000/api/usuarios/login */
router.post('/login', usuariosController.login);


/* PUT al usuario -- endpoint:http://localhost:3000/api/usuarios */
router.put('/:id',[verificacionToken,esAdministrador], usuariosController.editar);

/* DELETE al usuario -- endpoint:http://localhost:3000/api/usuarios */
router.delete('/:id',[verificacionToken,esAdministrador], usuariosController.eliminar);







module.exports = router;
