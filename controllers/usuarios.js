/* 
Se crea este archivo para poner aqui los controladores de las rutas
que son las funciones flecha o llamados call backs que manejan las 
rutas que el cliente accede desde el navegador.
*/
const {response} = require('express');

const usuariosGet = (req, res= response)=> {

     //const params = req.query; //Se puede desestructurar los parametros del url
     //https://www.udemy.com/course/node-de-cero-a-experto/learn/lecture/24761596#overview
     const {q,pagina= 2, limit} = req.query;
        res.json({
            msg: 'get API-controller',
            //params
            q,
            pagina,
            limit
        })
      }
const usuariosPut = (req, res= response)=> {

   //const id = req.params.id;
   const {id} = req.params;
    res.json({
        msg: 'put API-controller',
        id
    })
  }
  const usuariosPost = (req, res= response)=> {

    //const body = req.body;
    const {name,edad} = req.body;
    res.json({
        msg: 'post API-controller',
        name,
        edad
    })
  }
  const usuariosDelete = (req, res= response)=> {
    res.json({
        msg: 'delete API-controller'
    })
  }
  

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}