const Usuario = require('../models/usuarios');


const emailExiste = async( correo = '') => {
    
   
    const existeEmailDeUsuario = await Usuario.findOne( { correo } );
    if (existeEmailDeUsuario) {
        throw new Error(`El correo ${correo}, ya esta regostrado en la DB`);
    }
}


module.exports = {
    emailExiste
   
}