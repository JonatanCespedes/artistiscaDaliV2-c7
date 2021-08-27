let express = require('express');
let router = express.Router();
let { 
    signin,
    dashboard, 
    products, 
    productsCreate, 
    productStore,
    productEdit, 
    productDestroy,
    productUpdate} = require('../controllers/adminController');
let upload = require('../middlewares/uploadFiles');
let productsValidator = require('../validations/productsValidator');
let userAdminCheck = require('../middlewares/userAdminCheck');
let userSession = require('../middlewares/userSession')

/* GET - Admin Signin */
router.get('/', signin);

/* GET - Admin Dashboard */
router.get('/index', userSession, userAdminCheck,dashboard);

/* GET - Admin products*/
router.get('/products', userSession, userAdminCheck,products);

/* Create Product*/
router.get('/products/create', userSession, userAdminCheck,productsCreate);
router.post('/products/create', upload.array('image'), productsValidator, productStore);

/* Edit Product*/
router.get('/products/edit/:id', userSession, userAdminCheck,productEdit);
router.put('/products/edit/:id', upload.array('image'), productsValidator, productUpdate);

/* Delete Product*/
router.delete('/products/delete/:id', productDestroy);


module.exports = router;
