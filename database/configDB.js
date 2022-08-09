const mongoose = require('mongoose');

/* 
const uri= `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.gzlj2.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongo.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>console.log("Base de dato conectada"))
.catch(e=>console.log(e))
*/
//const uri = "mongodb+srv://user_node_cafe:iyE6uNWfFcgQA3vj@cluster0.gzlj2.mongodb.net/cafeDB";
const uri = process.env.MONGO_CLOUD;
const dbConnection = async ()=> {
    
    await mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology: true})
    .then(()=>console.log("Server connected to dataBase"))
    .catch(e=>console.log(e));

}
module.exports = {
    dbConnection
}