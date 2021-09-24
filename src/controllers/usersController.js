const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../database/models");

module.exports = {
  /* Register form */
  register: (req, res) => {
    res.render("register", {
      session: req.session,
    });
  },
  /* Login form */
  login: (req, res) => {
    res.render("login", {
      session: req.session,
    });
  },
  /* User profile */
  profile: (req, res) => {
    db.Users.findByPk(req.session.user.id).then((user) => {
      db.Addresses.findOne({
        where: {
          userId: user.id,
        },
      }).then((address) => {
        res.render("userProfile", {
          session: req.session,
          user,
          address,
        });
      });
    });
  },
  /* User profile edit form */
  editProfile: (req, res) => {
    db.Users.findByPk(req.params.id).then((user) => {
      db.Addresses.findOne({
        where: {
          userId: user.id,
        },
      }).then((address) => {
        res.render("userProfileEdit", {
          user,
          session: req.session,
          address
        });
      });
    });
  },
  /* User profile update method */
  updateProfile: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { name, last_name, tel, address, pc, province, city } = req.body;
      db.Users.update(
        {
          name,
          last_name,
          phone: tel,
          avatar: req.file && req.file.filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((result) => {
        db.Addresses.create({
          street: address,
          city: city,
          province: province,
          postal_code: pc,
          userId: req.params.id,
        }).then((result) => {
          res.redirect("/users/profile");
        });
      });
    } else {
      res.render("userProfileEdit", {
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  /* User process login */
  processLogin: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      db.Users.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        req.session.user = {
          id: user.id,
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
          rol: user.rol,
        };

        if (req.body.remember) {
          res.cookie("userArtisticaDali", req.session.user, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
            secure: true,
          });
        }

        res.locals.user = req.session.user; 

        res.redirect("/");
      });
    } else {
      res.render("login", {
        errors: errors.mapped(),
        session: req.session,
      });
    }
  },
  /* User process register */
  processRegister: (req, res) => {
    let errors = validationResult(req);
    if (req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      };
      errors.push(image);
    }
    if (errors.isEmpty()) {
      let { name, last_name, email, pass1 } = req.body;

      db.Users.create({
        name,
        last_name,
        email,
        pass: bcrypt.hashSync(pass1, 10),
        avatar: req.file ? req.file.filename : "default-image.png",
        rol: 0,
      }).then(() => {
        res.redirect("/users/login");
      });
    } else {
      res.render("register", {
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  /* User logout account */
  logout: (req, res) => {
    req.session.destroy();
    if (req.cookies.userArtisticaDali) {
      res.cookie("userArtisticaDali", "", { maxAge: -1 });
    }
    return res.redirect("/");
  },
};
