const {
    carousel,
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
                    [Op.gte]: 15
                }
            }
        })
        .then(products => {        
                res.render('index', {
                    sliderTitle : "Ofertas especiales",
                    sliderProducts: products,
                    carousel,
                    session: req.session
                })
            })
        .catch(err => console.log(err))    
    }
}