const { Router } = require('express');
const { check } = require('express-validator');
const { getCategoria, postCategoria, putCategoria, deleteCategoria } = require('../controllers/categoria');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/mostrar', getCategoria)

router.post('/agregar', [
    check('nombre', 'El nombre del prodcuto no puede ir vacio').not().isEmpty(),
    check('proveedor', 'El nombre del proveedor no puede ir vacio').not().isEmpty(),
    check('descripcion', 'La descripcion no puede ir vacio').not().isEmpty(),

    validarCampos

], postCategoria)

router.put('/editar/:id', [
    check('id', 'No es un ID valido').isMongoId(),

    validarCampos
], putCategoria)

router.delete('/delete/:id', [
    check('id', 'No es un ID valido').isMongoId(),

    validarCampos
], deleteCategoria)



module.exports = router;