let productsDB = require('../data/productsDB')

module.exports = {
    index: (req, res) => {
        let sliderProducts = productsDB.filter(product => product.discount >= 15)
        
        res.render('index', {
            products : productsDB,
            sliderTitle : "Ofertas especiales",
            sliderProducts
        })
    }
}