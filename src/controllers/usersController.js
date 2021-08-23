const { categories, users, writeUsersJSON } = require('../data/dataBase')
const { validationResult } = require('express-validator')

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
                pass1,
                avatar
              } = req.body;
            
            let newUser = {
                id: lastId + 1,
                name,
                last_name,
                email,
                pass: pass1,
                avatar: req.file ? req.file.fileName : "default-image.png"
            };
    
            users.push(newUser);
    
            writeUsersJSON(users);
    
            res.redirect('/')

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