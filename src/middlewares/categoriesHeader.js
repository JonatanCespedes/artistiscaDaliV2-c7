let db = require('../database/models')
module.exports = (req, res, next) => {
    db.Categories.findAll({
        include: [{
            association: "subcategories"
        }]
    })
    .then(categories => {
        res.locals.categories = categories
        next()
    })
}