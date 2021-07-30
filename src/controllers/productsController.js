const { products } = require('../data/productsDB')


module.exports = {
    detail: (req, res) => {
        let productID = +req.params.id;
        
        let product = products.find(product => product.id === productID)
        let sliderProducts = products.filter(item => item.category === product.category)

        res.render('productDetail', {
            sliderTitle : "Productos relacionados",
            sliderProducts,
            product
        })
    }
}