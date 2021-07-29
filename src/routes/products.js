let express = require('express');
let router = express.Router();
let controller = require('../controllers/productsController')

/* GET - Product Detail */
router.get('/detail/:id', controller.detail)

module.exports = router