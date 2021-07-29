let productsDB = require('../data/productsDB')

module.exports = {
    detail: (req, res) => {
        res.render('productDetail')
    }
}