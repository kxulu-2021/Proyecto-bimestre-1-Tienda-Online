const { response, request } = require('express');
const Usuario = require('../models/usuarios');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const Producto = require('../models/productos');

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


    const salt = bcryptjs.genSaltSync();
    usuarioDB.password = bcryptjs.hashSync(password, salt);


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

    const { rol, nombre } = req.usuario

    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg: `${nombre} no es admin, no puede editar este registro`
        });
    } else {
        const { id } = req.params;


        const { _id, rol, estado, ...resto } = req.body;


        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(resto.password, salt);


        const usuarioEditado = await Usuario.findByIdAndUpdate(id, resto);

        res.json({
            msg: 'PUT API de usuario',
            usuarioEditado
        });
    }

}


const deleteUsuarios = async (req = request, res = response) => {

    const { rol, nombre } = req.usuario
    if (rol !== 'ADMIN') {
        return res.status(401).json({
            msg: `${nombre} es un cliente, no puede eliminar a un ADMIN`
        });
    } else {
        const { id } = req.params;

        const usuarioEliminado = await Usuario.findByIdAndDelete(id);

        res.json({
            msg: 'DELETE API de usuario',
            usuarioEliminado
        });
    }
}

const putCarritoDeCompras = async (req = request, res = response) => {
    const data = {
        usuario: req.usuario._id
    }

    const agregarProducto = await Usuario.findOneAndUpdate(
        { _id: data.usuario },
        { $push: { carrito: req.body.producto } },
        { new: true }
    )
    let totalShopCar = 0;
    const usuario = await Usuario.findOne({ _id: data.usuario })
    const ShopCarUser = usuario.carrito
    for (let ShopCarProduct of ShopCarUser) {
        const producto = await Producto.findOne({ _id: ShopCarProduct })
        totalShopCar = totalShopCar + producto.precio
    }
    const totalUser = await Usuario.findOneAndUpdate(
        { _id: data.usuario },
        { total: totalShopCar },
        { new: true }
    )
    res.status(201).json({
        agregarProducto,
        totalUser
    })
}

const putProductoDelCarrito = async (req = request, res = response) => {
    const productId = req.params.id;

    const data = {
        usuario: req.usuario._id
    }

    const usuario = await Usuario.findOne({ _id: data.usuario });
    const ShopCarProducts = usuario.carrito

    let actualizarShopCar
    for (let ShopCarProduct of ShopCarProducts) {
        actualizarShopCar = await Usuario.updateOne(
            { _id: data.usuario },
            { $pull: { carrito: productId } }
        )
    }
    let totalShopCar = 0;
    const users = await Usuario.findOne({ _id: data.usuario })
    const ShopCarUser = users.carrito
    for (let ShopCarProduct of ShopCarUser) {
        const product = await Producto.findOne({ _id: ShopCarProduct })
        totalShopCar = totalShopCar + product.precio
    }
    const totalUser = await Usuario.updateOne(
        { _id: data.usuario },
        { total: totalShopCar },
        { new: true }
    )

    res.status(410).json({
        actualizarShopCar,
        totalUser
    })
}

const EmptyShopCar = async (req = request, res = response) => {
    const { id } = req.params;

    const data = {
        usuario: req.usuario._id
    }

    const usuario = await Usuario.findOne({ _id: data.usuario });
    let emptyShopCar = await Usuario.findOneAndUpdate(
        { _id: data.usuario },
        { carrito: [] },
        { new: true }
    )
    let totalShopCar = 0;
    const users = await Usuario.findOne({ _id: data.usuario })
    const ShopCarUser = users.carrito
    for (let ShopCarProduct of ShopCarUser) {
        const producto = await Producto.findOne({ _id: ShopCarProduct })
        totalShopCar = totalShopCar + producto.precio
    }
    const totalUser = await Usuario.updateOne(
        { _id: data.usuario },
        { total: totalShopCar },
        { new: true }
    )

    res.json({
        emptyShopCar,
        totalUser
    })
}

const getCarritoDeCompras = async (req = request, res = response) => {
    const { id } = req.params

    const usuario = await Usuario.findOne({ _id: id }).populate('carrito', 'nombre')
    const ShopCarProducts = usuario.carrito
    const totalShopCar = usuario.total

    res.json({
        ShopCarProducts,
        totalShopCar
    })
}



module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios,
    putCarritoDeCompras,
    putProductoDelCarrito,
    EmptyShopCar,
    getCarritoDeCompras
}