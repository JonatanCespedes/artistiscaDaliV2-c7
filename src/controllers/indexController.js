const {
    products,
    carousel,
    categories
} = require('../data/dataBase')
const db = require('../database/models')
const {
    Op
} = require("sequelize");


module.exports = {
    index: (req, res) => {
        db.Products.findAll({
                where: {
                    discount: {
                        [Op.gte]: 15
                    }
                }
            })
            .then(products => {
                console.log(products)
            })
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