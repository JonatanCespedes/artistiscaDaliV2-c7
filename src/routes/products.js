let express = require('express');
let router = express.Router();
let { detail, category, subcategory, search } = require('../controllers/productsController')

/* GET - Product Detail */
router.get('/detail/:id', detail)
/* GET - List products for category */
router.get('/category/:id', category)
/* GET - List products for subcategory */
router.get('/subcategory/:id', subcategory)
/* GET - List products for search */
router.get('/search', search)

module.exports = router