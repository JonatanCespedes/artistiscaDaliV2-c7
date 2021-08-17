let express = require('express');
let router = express.Router();
const { register, login } = require('../controllers/usersController')

router.get('/register', register)
router.get('/login', login)

module.exports = router
