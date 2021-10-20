let express = require('express');
let router = express.Router();
let controller = require('../controllers/api/apiController.js')

router.get('/categories', controller.allCategories);
router.get('/categories/:id', controller.oneCategory);

module.exports = router;
