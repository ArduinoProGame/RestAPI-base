const Role= require('../models/role');
const Usuario=require('../models/usuario')

const rolValido= async (rol='')=>{
    const rolExist = await Role.findOne({rol});
    if(!rolExist){
            throw new Error(`Este rol ${rol} no esta registrado en la base de datos`)
    }
}

const emailExiste = async (correo= '')=>{

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}
const usuarioIdExiste = async (id)=>{

    // Verificar si el correo existe
    const existeId = await Usuario.findById(id);
    if ( !existeId ) {
        throw new Error(`El id: ${ id }, no existe`);
    }
}
module.exports= {
    rolValido,
    emailExiste,
    usuarioIdExiste
}