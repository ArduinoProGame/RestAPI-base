//Para recuperar mi proyecto de Git si se borro algo puedo hacer con
//el siguiente comando: git checkout -- .
//https://www.udemy.com/course/node-de-cero-a-experto/learn/lecture/9608776#overview

require('dotenv').config();

const Server = require('./models/server.js');

const server = new Server();

server.listen();