const db = require('../database/models')
const {
    Op
} = require("sequelize");


module.exports = {
    detail: (req, res) => {
        db.Products.findOne({
            where: {
                id: +req.params.id
            },
            include: [{
                association: "productImages"
            }]
        })
            .then(product => {
                db.Products.findAll({
                        where: {
                            subcategoryId: product.subcategoryId
                        }
                    })
                    .then(products => {
                        res.render('productDetail', {
                            sliderTitle: "Productos relacionados",
                            sliderProducts: products,
                            product,
                            session: req.session
                        })
                    })
            })
    },
    category: (req, res) => {
        db.Categories.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                association: "subcategories",
                include: [{
                    association: "products",
                    include: [{
                        association: "productImages"
                    }]
                }]
            }]
        })
        .then(category => {
            let subcategories = category.subcategories;
            let products = []
            subcategories.forEach(subcategory => {
                subcategory.products.forEach(product => products.push(product))
            })
            res.render('categories', {
                category,
                products,
                session: req.session
            })
        })
        .catch(err => console.log(err))

    }
}