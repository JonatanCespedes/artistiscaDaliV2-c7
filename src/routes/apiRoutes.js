let express = require('express');
let router = express.Router();
let controller = require('../controllers/api/apiController.js')
let orderController = require('../controllers/api/orderController')

router.get('/categories', controller.allCategories);
router.get('/categories/:id', controller.oneCategory);
/* Cart */
router.post('/cart/:product/:quantity', orderController.addToCart)
router.get('/cart', orderController.productsInCart)
router.delete('/cart/removeOne/:item', orderController.removeOneFromCart)
router.delete('/cart/removeAll/:item', orderController.removeAllFromCart)
router.delete('/cart/clearCart', orderController.clearCart)

module.exports = router;
