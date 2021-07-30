let productsDB = require('../data/productsDB')
const { products, carousel } = productsDB

module.exports = {
    index: (req, res) => {
        let sliderProducts = products.filter(product => product.discount >= 15)
        
        res.render('index', {
            products : products,
            sliderTitle : "Ofertas especiales",
            sliderProducts
        })
    }
}