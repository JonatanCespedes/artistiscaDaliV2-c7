const { validationResult } = require('express-validator');
const fs = require('fs')
const db = require('../database/models')


module.exports = {
    signin: (req, res) => {
        res.render('adminLogin')
    },
    dashboard: (req, res) => {
        res.render('adminIndex', {
            session: req.session
        })
    }, 
    products: (req, res) => {
        db.Products.findAll()
        .then(products => {
            res.render('adminProducts', {
                products,
                session: req.session
            })
        })
    }, 
    productsCreate: (req, res) => {
        db.Categories.findAll({
            include: [{
                association: "subcategories"
            }]
        })
        .then(categories => {
            let subcategories = []
            categories.forEach(category => {
                category.subcategories.forEach(subcategory => {
                    subcategories.push(subcategory)
                })
            })
            
            res.render('adminProductCreateForm', {
                categories,
                subcategories,
                session: req.session
            })
        })
        .catch(err => console.log(err))
    }, 
    productStore: (req, res) => {
        let errors = validationResult(req);
        if (req.fileValidatorError) {
            let image = {
                param : "image",
                msg: req.fileValidatorError
            }
            errors.push(image)
        }
        res.send(errors)
        if (errors.isEmpty()) {

            let lastId = 1;
        
            products.forEach(product => {
                if(product.id > lastId){
                    lastId = product.id
                }
            });
    
            let arrayImages = [];
            if(req.files){
                req.files.forEach(image => {
                    arrayImages.push(image.filename)
                })
            }
    
            let { name, 
                price, 
                discount,
                category,
                subcategory, 
                description } = req.body;
            
            let newProduct = {
                id: lastId + 1,
                name,
                price,
                description,
                discount,
                category,
                subcategory,
                image: arrayImages.length > 0 ? arrayImages : ["default-image.png"]
            };
    
            products.push(newProduct);
    
            writeProductsJSON(products);
    
            res.redirect('/admin/products')

        } else {
            res.render('adminProductCreateForm', {
                subcategories,
                categories, 
                errors : errors.mapped(),
                old : req.body,
                session: req.session
            })
        }
       
    }, 
    productEdit: (req, res) => {
        let product = products.find(product => product.id === +req.params.id)
        res.render('adminProductEditForm', {
            categories, 
            subcategories,
            product,
            session: req.session
        })
    },
    productUpdate: (req, res) => {
        let errors = validationResult(req);
        if (req.fileValidatorError) {
            let image = {
                param : "image",
                msg: req.fileValidatorError
            }
            errors.push(image)
        }
        if (errors.isEmpty()) {
        let { name, 
			price, 
			discount,
			category,
            subcategory, 
			description } = req.body;

        let arrayImages = [];
        if(req.files){
            req.files.forEach(image => {
                arrayImages.push(image.filename)
            })
        }
    
        products.forEach(product => {
            if(product.id === +req.params.id){
                product.id = product.id,
                product.name = name,
                product.price = price,
                product.description = description,
                product.discount = discount,
                product.category = category,
                product.subcategory = subcategory
                product.image = arrayImages.length > 0 ? arrayImages : product.image 
            }
        })

        writeProductsJSON(products);

        res.redirect("/admin/products")
        
        } else {
            let product = products.find(product => product.id === +req.params.id)
            
            res.render('adminProductEditForm', {
                product,
                subcategories,
                categories, 
                errors : errors.mapped(),
                old : req.body,
                session: req.session
            })
        }
    },
    productDestroy: (req, res) => {
		products.forEach(product => {
            if(product.id === +req.params.id){
                fs.existsSync("./public/images/productos/", product.image[0])
                ? fs.unlinkSync("./public/images/productos/" + product.image[0])
                : console.log("-- No se encontró")
                let productToDestroy = products.indexOf(product);
                products.splice(productToDestroy, 1)
            }
        })

        writeProductsJSON(products);

        res.redirect("/admin/products")
    }
}