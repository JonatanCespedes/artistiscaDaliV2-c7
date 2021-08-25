const { categories, users, writeUsersJSON } = require('../data/dataBase')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

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
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)

        if(errors.isEmpty()){
            users.forEach(user => {
                if(user.email == req.body.email){
                    if(bcrypt.compareSync(req.body.pass, user.pass)){
                        req.session.user = {
                            id: user.id,
                            userName: user.name + " " + user.last_name,
                            email: user.email,
                            avatar: user.avatar,
                            rol: user.rol
                        }
                    } 
                }
            })

            if(req.session.user == undefined){
                res.render('login', {
                    categories,
                    errorMsg: "Credenciales inválidas"
                })
            }
        }else{
            res.render('login', {
                categories,
                errors: errors.mapped()
            })
        }        

    },
    processRegister: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let lastId = 0;
        
            users.forEach(user => {
                if(user.id > lastId){
                    lastId = user.id
                }
            });
    
            let { 
                name, 
                last_name,
                email,
                pass1
              } = req.body;
            
            let newUser = {
                id: lastId + 1,
                name,
                last_name,
                email,
                pass: bcrypt.hashSync(pass1, 10),
                rol: "ROL_USER",
                avatar: req.file ? req.file.fileName : "default-image.png"
            };
    
            users.push(newUser);
    
            writeUsersJSON(users);
    
            res.redirect('/users/login')

        } else {
            res.render('register', {
                categories, 
                errors : errors.mapped(),
                old : req.body
            })
        }
    },
    logout: (req, res) => {

    }
}