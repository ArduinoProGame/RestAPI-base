const { Router} = require('express');
const {check} = require('express-validator');

const {usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
} = require('../controllers/usuarios');

const {esrolValido, emailExiste,usuarioIdExiste} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router= Router();
//Mis rutas o end points
router.get('/', usuariosGet); //usuariosGet es el controlador(funcion) que sirve a la peticion get 
router.put('/:id',
[
 check('id','No es un id de Mongo').isMongoId(),
 check('id').custom(usuarioIdExiste),
 check('rol').custom(esrolValido),
 validarCampos //Este midelware personalizado sirve para que de un error si no psas los check anteriores y la app no se guinde
], usuariosPut);  //usuariosPut es el controlador(funcion) que sirve a la peticion put
//Las rutas pueden recibir un parametro entre /(ruta) y el controlador de la ruta. Este es un middleware
//en este caso es el metodo check del modulo express-validator. Estos middlewares se ejecutan en orden
//el ultimo que se ejecuta es el validarCampos que es el middleware que creamos
router.post('/',[
    check('name','El nombre es obligatorio..').not().isEmpty(),
    //check('correo','El correo no es valido..').isEmail(),
    check('correo').custom(emailExiste),
    check('password','El password debe tener mas de 6 letras..').isLength({min:6}),
    //check('rol','Este rol no es valido..').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esrolValido), //Clase 124
    validarCampos
], usuariosPost); //usuariosPost es el controlador(funcion) que sirve a la peticion post
//Delete
router.delete('/:id',
[
    check('id','No es un id de Mongo').isMongoId(),
    check('id').custom(usuarioIdExiste),
    validarCampos
   ],usuariosDelete); //usuariosDelete es el controlador(funcion) que sirve a la peticion delete


 
module.exports=router;
