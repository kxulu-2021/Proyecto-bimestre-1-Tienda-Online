const { Router } = require('express');
const { check } = require('express-validator');
const { getProductos, postProductos, putProductos, deleteProductos } = require('../controllers/productos');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/mostrar', getProductos)

router.post('/agregar', [
    check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion del producto es obligatoria').not().isEmpty(),
    check('descripcion', 'La descripcion no pacepta numeros').isString(),

   validarCampos
],postProductos)

router.put('/editar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
   
    validarCampos
], putProductos)

router.delete('/delete/:id', [
    check('id', 'No es un ID valido').isMongoId(),

    validarCampos
], deleteProductos)



module.exports = router;