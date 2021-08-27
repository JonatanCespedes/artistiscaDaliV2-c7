let express = require('express');
let router = express.Router();
const { register, 
    login, 
    profile, 
    processLogin,
    processRegister,
    logout,
    updateProfile } = require('../controllers/usersController');
let loginValidator = require('../validations/loginValidator')    
let registerValidator = require('../validations/registerValidator');
let upload = require('../middlewares/uploadAvatar'); 

/* GET - Register form */
router.get('/register', register);
router.post('/register', upload.single('avatar'), registerValidator,processRegister);

/* GET - Login form */
router.get('/login', login);
router.post('/login', loginValidator, processLogin);
router.get('/logout', logout);

/* GET - User profile */
router.get('/profile', profile)
router.put('/profile/edit/:id', updateProfile)

module.exports = router
