const { categories, users, writeUsersJSON } = require('../data/dataBase')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

module.exports = {
    /* Register form */
    register: (req, res) => {
        res.render('register', {
            categories,
            session:req.session
        })
    },
    /* Login form */
    login: (req, res) => {
        res.render('login', {
            categories,
            session:req.session
    })
    },
    /* User profile */
    profile: (req, res) =>{
            let user = users.find(user=> user.id === req.session.user.id);
            
            res.render('userProfile', {
                categories,
                session: req.session,
                user
            })
    },
    /* User profile */
    updateProfile: (req, res) =>{
        let errors = validationResult(req)
            
        if(errors.isEmpty()){
            let user = users.find(user => user.id === req.session.id)
            
            let { 
                name, 
                last_name,
                tel,
                address,
                pc,
                province,
                city
            } = req.body;

            user.id = user.id
            user.name = name
            user.last_name = last_name
            user.tel = tel
            user.address = address
            user.pc = pc
            user.province = province
            user.city = city
            user.avatar = req.file ? req.file.fileName : user.avatar

            writeUsersJSON(users)

            req.session.user = delete user.pass
            
            res.send(req.session)
                  
        } else{
            res.render('profile', {
                categories,
                errors: errors.mapped(),
                old: req.body,
                session:req.session 
            })   
        }
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)
            
        if(errors.isEmpty()){

            let user = users.find(user => user.email === req.body.email)

            req.session.user = { 
                id: user.id,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                avatar: user.avatar,
                rol: user.rol
            }

            if(req.body.remember){ // Si el checkbox está seleccionado creo la cookie
                res.cookie('userArtisticaDali',req.session.user,{maxAge:1000*60*2})
            }

            res.locals.user = req.session.user; //Creo la variable user en la propiedad locals dentro del objeto request y como valor le asigno los datos del usuario en sesión
        
            res.redirect('/')
                     
        } else{
            res.render('login', {
                categories,
                errors: errors.mapped(), 
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
                tel: "",
                address: "",
                pc:"",
                province:"",
                city:"",
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
        req.session.destroy();
        if(req.cookies.userArtisticaDali){
            res.cookie('userArtisticaDali','',{maxAge:-1})
        }
        
        return res.redirect('/')
    }
}