const {
    carousel
} = require('../data/dataBase')
const db = require('../database/models')
const {
    Op
} = require("sequelize");


module.exports = {
    index: (req, res) => {
        const productsPromise = db.Products.findAll({
                where: {
                    discount: {
                        [Op.gte]: 5
                    }
                }
            })
        const categoriesPromise = db.Categories.findAll()    

        Promise.all([productsPromise, categoriesPromise])
            .then(([productsResult, categoriesResult]) => {  
                res.render('index', {
                    sliderTitle : "Ofertas especiales",
                    sliderProducts: productsResult,
                    carousel,
                    categories: categoriesResult,
                    session: req.session
            })
        }).catch(err => console.log(err))
        /* let sliderProducts = products.filter(product => product.discount >= 15)
        
        res.render('index', {
            sliderTitle : "Ofertas especiales",
            sliderProducts,
            carousel,
            categories,
            session: req.session
        }) */
    }
}