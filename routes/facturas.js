const { Router } = require('express');
const { postFacturas, putFacturas, deleteFacturas, getFacturas } = require('../controllers/facturas');


const router = Router();

router.get('/mostrar', getFacturas)
router.post('/agregar', postFacturas)
router.put('/editar/:id', putFacturas)
router.delete('/delete/:id', deleteFacturas)



module.exports = router;