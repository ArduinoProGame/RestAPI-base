const { validationResult} = require('express-validator');

//Aqui creamos nuestro middleware para validar los campos que van en la peticion del cliente hacia el //servidor
const validarCampos = (req,res,next)=>{
//Validacion del request(peticion del cliente)
const errors= validationResult(req); //errors es un objeto que recopila todos los errores de la peticion req
//del cliente
if (!errors.isEmpty()){
  return res.status(400).json(errors);
}
next(); //Continua con el siguiente middlewaree
}

module.exports = {
    validarCampos
}