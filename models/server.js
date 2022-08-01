
const express = require('express')
const cors = require('cors');
class Server  {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //Middleware
        this.middleware();
        //Rutas de la aplicacion
        this.rutas();
    }

    
    middleware(){
        //cors
        this.app.use(cors());

        //Parseo. Indicar a express de que forma el backend(server)recibira los request del cliente
        //que envia datos en el body estos son: post,put o delete
        this.app.use(express.json());

        //Archivos staticos de mi aplicacion
        this.app.use(express.static('public'))
    }
    //Rutas(end points)
    rutas(){
       //Le dice cuando el cliente en el navegador tipee la ruta /api/usuarios
       //vaya al recurso de este server: routes/usuarios
        this.app.use('/api/usuarios', require('../routes/usuarios'))
    }
    
    listen(){
        
        this.app.listen(this.port, console.log("Server running  at port ..." + this.port))
    }
}

module.exports = Server;
