const{ Schema, model } = require('mongoose');

const FacturaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del cliente es obligatorio']
    },
    nit: {
        type: String,
        required: [true, 'El NiT es obligatorio']
    },
    direccion: {
        type: String,
        required: [true, 'La direccion es obligatoria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligatoria']
    },
    total: {
        type: String,
        required: [true, 'El total es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }  

});


module.exports = model('Factura',FacturaSchema)