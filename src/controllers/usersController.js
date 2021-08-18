const { categories } = require('../data/dataBase')

module.exports = {
    /* Register form */
    register: (req, res) => {
        res.render('register', {
            categories
        })
    },
    /* Login form */
    login: (req, res) => {
        res.render('login', {
            categories
    })
    },
    /* User profile */
    profile: (req, res) =>{
        res.render('userProfile', {
            categories
        })
    }
}