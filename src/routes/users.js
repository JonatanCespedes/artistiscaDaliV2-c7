let express = require('express');
let router = express.Router();
const { register, login, profile } = require('../controllers/usersController');

/* GET - Register form */
router.get('/register', register);

/* GET - Login form */
router.get('/login', login);

/* GET - User profile */
router.get('/profile', profile)

module.exports = router
