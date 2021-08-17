const { categories } = require('../data/dataBase')

module.exports = {
    register: (req, res) => {
        res.render('register', {
            categories
        })
    },
    login: (req, res) => {
        res.render('login', {
            categories
    })
    }
}