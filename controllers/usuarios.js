const { response, request } = require('express');
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const getUsuarios = async (req = request, res = response) => {

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
    ]);

    res.json({
        msg: 'GET API de usuarios',
        listaUsuarios
    });

}

const postUsuarios = async (req = request, res = response) => {

    if (req.body.rol == "") {
        req.body.rol = "CLIENT"
    }

    const { nombre, correo, password, rol } = req.body;
    const usuarioDB = new Usuario({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await usuarioDB.save();

    res.status(201).json({
        msg: 'POST API de usuario',
        usuarioDB
    });

}

const putUsuarios = async (req = request, res = response) => {
    if (req.body.rol == "") {
        req.body.rol = "CLIENT"
    }

    const {rol,nombre} = req.usuario
    // const {nombre} = req.body;
    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg: `${nombre} no es admin asi que no puedes editar los datos de un admin`
        });
    }else{
        const { id } = req.params;
    
        //Ignoramos el _id al momento de editar y mandar la petición en el req.body
        const { _id, rol, estado, ...resto } = req.body;
    
        // //Encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(resto.password, salt);
    
        //editar y guardar
        const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);
    
        res.json({
            msg: 'PUT API de usuario',
            usuarioEditado
        });
    }

}


const deleteUsuarios = async (req = request, res = response) => {

    const {rol, nombre} = req.usuario
    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg: `${nombre} es un cliente, no puede eliminar los datos de un admin`
        });
    }else{
        const { id } = req.params;
    
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    
        res.json({
            msg: 'DELETE API de usuario',
            usuarioEliminado
        });
    }
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}