const { check, body } = require('express-validator');
const bcrypt = require('bcryptjs')
const db = require('../database/models')

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    check('pass')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña'),

    body('custom')
        .custom((value, {req})=> {
            return db.Users.findOne({
                where:{
                    email: req.body.email
                }
            })
            .then(user => {
                if(!bcrypt.compareSync(req.body.pass, user.dataValues.pass)){
                    return Promise.reject()
                }
            })
            .catch((err) => {
                return Promise.reject("Email o contraseña incorrectos")
            })
        })
]    