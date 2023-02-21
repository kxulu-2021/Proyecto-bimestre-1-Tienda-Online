const{ Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    }  

});


module.exports = model('Producto',ProductoSchema)