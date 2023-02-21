const { response, request } = require('express');
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const getUsuarios = async (req = request, res = response) => {

    const query = { estado: true };

    const listaUsuarios = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ]);

    res.json({
        msg: 'Get API de Usuarios', listaUsuarios
    });
}

const postUsuarios = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;

    const usuarioDB = new Usuario({ nombre, correo,  password, rol});

    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);

    await usuarioDB.save();

    res.json({
        msg: 'POST API de Usuario',
        usuarioDB
    });
}

const putUsuarios = async (req = request, res = response) => {
    const { id } = req.params;


    const { _id, estado, ...resto } = req.body;


    const UsuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Usuario',
        UsuarioEditado
    });
}

const deleteUsuarios = async (req = request, res = response) => {
    const { id } = req.params;


    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE API de Producto',
        usuarioEliminado
    });
}

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}