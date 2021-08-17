let express = require('express');
let router = express.Router();
let { detail, category } = require('../controllers/productsController')

/* GET - Product Detail */
router.get('/detail/:id', detail)

router.get('/category/:id', category)

module.exports = router