let db = require('../database/models')
module.exports = (req, res, next) => {
    db.Categories.findAll()
    .then(categories => {
        res.locals.categories = categories
    })
    next()
}