const { response, request } = require('express');
const Productos = require('../models/productos');



const getProductos = async (req = request, res = response) => {

    const query = { estado: true };

    const listaProductos = await Promise.all([
        Productos.countDocuments(query),
        Productos.find(query)
    ]);

    res.json({
        msg: 'Get API de Productos', listaProductos
    });
}

const postProductos = async (req = request, res = response) => {
    const { nombre, descripcion } = req.body;

    const productoDB = new Productos({ nombre, descripcion });

    await productoDB.save();

    res.json({
        msg: 'POST API de Productos',
        productoDB
    });
}

const putProductos = async (req = request, res = response) => {
    const { id } = req.params;


    const { _id, estado, ...resto } = req.body;


    const productoEditado = await Productos.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de Producto',
        productoEditado
    });
}

const deleteProductos = async (req = request, res = response) => {
    const { id } = req.params;


    const productoEliminado = await Productos.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE API de Producto',
        productoEliminado
    });
}

module.exports = {
    getProductos,
    postProductos,
    putProductos,
    deleteProductos
}