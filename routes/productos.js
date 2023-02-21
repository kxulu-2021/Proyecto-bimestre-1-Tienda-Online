const { Router } = require('express');
const { getProductos, postProductos, putProductos, deleteProductos } = require('../controllers/productos');

const router = Router();

router.get('/mostrar', getProductos)
router.post('/agregar', postProductos)
router.put('/editar/:id', putProductos)
router.delete('/delete/:id', deleteProductos)



module.exports = router;