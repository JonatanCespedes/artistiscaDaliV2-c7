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
let uploadCategoriesFile = require('../middlewares/uploadCategoriesFiles');
let productsValidator = require('../validations/productsValidator');
let userAdminCheck = require('../middlewares/userAdminCheck');
let userSession = require('../middlewares/userSession')
let {categories, categoryCreate, categoryStore, categoryEdit, categoryUpdate, categoryDestroy} = require('../controllers/adminCategoriesController')
let categoriesValidator = require('../validations/categoriesValidator')
let {subcategories, subcategoryCreate, subcategoryStore, subcategoryEdit, subcategoryUpdate, subcategoryDestroy} = require('../controllers/adminSubcategoriesController')
let subcategoriesValidator = require('../validations/subcategoriesValidator')

/* GET - Admin Signin */
router.get('/', signin);

/* GET - Admin Dashboard */
router.get('/index', userSession, userAdminCheck,dashboard);

/******************/
/* CRUD PRODUCTOS */
/******************/

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

/******************/
/* CRUD CATEGORIES */
/******************/

/* GET - All categories*/
router.get('/categories', userSession, userAdminCheck,categories);

/* Create Category*/
router.get('/categories/create', userSession, userAdminCheck,categoryCreate);
router.post('/categories/create', uploadCategoriesFile.single('image'), categoriesValidator, categoryStore);

/* Edit Category*/
router.get('/categories/edit/:id', userSession, userAdminCheck,categoryEdit);
router.put('/categories/edit/:id', uploadCategoriesFile.single('image'), categoriesValidator, categoryUpdate);

/* Delete Category*/
router.delete('/categories/delete/:id', categoryDestroy);

/******************/
/* CRUD SUBCATEGORIES */
/******************/

/* GET - All subcategories*/
router.get('/subcategories', userSession, userAdminCheck,subcategories);

/* Create subcategory*/
router.get('/subcategories/create', userSession, userAdminCheck,subcategoryCreate);
router.post('/subcategories/create', upload.single('image'), subcategoriesValidator, subcategoryStore);

/* Edit subcategory*/
router.get('/subcategories/edit/:id', userSession, userAdminCheck,subcategoryEdit);
router.put('/subcategories/edit/:id', upload.single('image'), subcategoriesValidator, subcategoryUpdate);

/* Delete subcategory*/
router.delete('/subcategories/delete/:id', subcategoryDestroy);


module.exports = router;
