let express = require('express');
let router = express.Router();
let controller = require('../controllers/api/apiController.js')
let orderController = require('../controllers/api/orderController')

router.get('/categories', controller.allCategories);
router.get('/categories/:id', controller.oneCategory);
/* Cart */
router.post('/cart/:product/:quantity/:user', orderController.addToCart)
router.get('/cart/:user', orderController.productsInCart)
router.delete('/cart/removeOne/:item/:user', orderController.removeOneFromCart)
router.delete('/cart/removeAll/:item/:user', orderController.removeAllFromCart)
router.delete('/cart/clearCart/:user', orderController.clearCart)

module.exports = router;
