const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios');
const { emailExiste } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();

router.get('/mostrar', getUsuarios)

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser mayor a 6 digitos').isLength({ main: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),



    validarCampos
], postUsuarios)

router.put('/editar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),

    validarCampos
], putUsuarios)

router.delete('/delete/:id', [
    check('id', 'No es un ID valido').isMongoId(),

    validarCampos
], deleteUsuarios)



module.exports = router;