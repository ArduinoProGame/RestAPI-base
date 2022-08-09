/* 
Se crea este archivo para poner aqui los controladores de las rutas
que son las funciones flecha o llamados call backs que manejan las 
rutas que el cliente accede desde el navegador.
*/
const {request,response} = require('express');
//Importamos bcryptjs
const bcryptjs = require('bcryptjs');

const {validarCampo} = require('../middlewares/validar-campos')

//Importamos el modelo de mi coleccion de mongo(tabla) y le damos el nombre de Usuario.
//Siempre se pone la Mayuscula por que con este modelo crearemos instancias de usuario
const Usuario = require('../models/usuario'); 
const usuariosGet = async(req=request, res= response)=> {

  

     //const params = req.query; //Se puede desestructurar los parametros del url
     //https://www.udemy.com/course/node-de-cero-a-experto/learn/lecture/24761596#overview
     //const {q,pagina= 2, limit} = req.query;
     const {limite = 5,desde= 0}= req.query;
     const query = {estado:true};
    /*
     const usuarios= await Usuario.find(query)
     .limit(limite)
     .skip(desde);

     const total = await Usuario.countDocuments(query);
     */
     //Los await find y countDocuments se ejecutan uno despues del otro, es decir se suman
     //Los tiempos de las respuesta. Para ejecutarlos en forma simultanea existe Promise.all([arreglos de promesas])
      
     const [total, usuarios] = await Promise.all(
      [
        Usuario.countDocuments(query),
        Usuario.find(query)
          .limit(limite)
          .skip(desde)

      ]
     );
     
        res.json({
            msg: 'get API-controller',
            //params
            //q,
            //pagina,
            //limit
            total,
            usuarios
            
        })
      }
const usuariosPut = async (req, res= response)=> {

   //const id = req.params.id;
   const {id} = req.params;
   const {password,google,correo,...resto} = req.body;
//Validar en la base de datos
   if(password){
    //Encriptamos la contraseña
    const salt= bcryptjs.genSaltSync();
    resto.password= bcryptjs.hashSync(password,salt);

   }
   const usuarioup= await Usuario.findByIdAndUpdate(id,resto)
    res.json({
        msg: 'put API-controller',
        id,
        usuarioup
        
    })
  }
  const usuariosPost = async (req, res= response)=> {
    //Validacion del request(peticion del cliente)
    
    //https://www.udemy.com/course/node-de-cero-a-experto/learn/lecture/9616022#overview
    const {name,correo,password,rol} = req.body;
    //Creamos la instancia del usuario.Ojo lo que recibe en el body lo envia a la instancia usuario
    //pero aquello que no esta definido en el modelo mongoose lo ignora
    const usuario = new Usuario( {name,correo,password,rol});
        
    //Encriptamos la contraseña
    const salt= bcryptjs.genSaltSync();
    usuario.password= bcryptjs.hashSync(password,salt);

    //Guardar en base de datos
    await usuario.save(); //Esta linea le dice a la app que grabe en la base de datos en mongo Atlas (cloud)
    //const body = req.body;
    //const {name,edad} = req.body;
    res.json({
        msg: 'post API-controller',
        //name,
        //edad
        usuario
    })
  }
  const usuariosDelete = async (req, res= response)=> {

    const {id} = req.params;
    //Borrar registro(document) de la tabla(coleccion)
    //const usuariodel = await Usuario.findByIdAndDelete(id);
    //Para no perder la integridad referencial en la base de datos es mejor poner el estado del usuario a false
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});  

    res.json({
      "Usuario bloqueado":usuario});
  }
  

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}