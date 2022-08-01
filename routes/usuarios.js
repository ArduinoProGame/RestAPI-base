const { Router} = require('express');
const {usuariosGet,usuariosPut,usuariosPost,usuariosDelete} = require('../controllers/usuarios')

const router= Router();
//Mis rutas o end points
router.get('/', usuariosGet); //usuariosGet es el controlador(funcion) que sirve a la peticion get 
router.put('/:id', usuariosPut);  //usuariosPut es el controlador(funcion) que sirve a la peticion put
router.post('/', usuariosPost); //usuariosPost es el controlador(funcion) que sirve a la peticion post
router.delete('/', usuariosDelete); //usuariosDelete es el controlador(funcion) que sirve a la peticion delete


 
module.exports=router;
