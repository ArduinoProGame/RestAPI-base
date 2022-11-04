const { Schema, model} = require('mongoose');

//Definimos el schema(diseño) de mi coleccion(tabla sql) le damos un nombre en este caso SchemaUser
const SchemaUser = Schema ({
    name: {
        type: String,
        required: [true, "Nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "Correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Clave es obligatorio"],
        
    },
    img: {
        type:String
    },
    rol:{
        type: String,
        required: [true, "Ingrese el rol"],
        //enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type:Boolean,
        default: false
    }

});
//En esta parte puedo escribir metodos que sobre escriban los metodos de mongoose.
//El metodo .toJSON permite borrar __V que es la version y el password
//https://www.udemy.com/course/node-de-cero-a-experto/learn/lecture/24779006#overview
//Cuando se manda a llamar toJSON ejecutara la function que quita la version y el password.
//No usa funcion flecha por que esta no permite usar this, solamente function permite this
//Y este this se refiere a la instancia de SchemaUser con todos sus objetos
SchemaUser.methods.toJSON = function(){
    const {__v,password,...usuario}= this.toObject(); //Esto saca del modelo la version y el password y retorna el resto
    return usuario;
}
//Se hace uso del metodo model, pide el nombre de la coleccion(tabla sql) y el nombre
//donde defini el schema de mi colleccion. usuario es el nombre que le indico aqui pero mongoose
//la nombra a la coleccion en plural(usuarios)
module.exports= model('Usuario', SchemaUser);
 