const { validationResult } = require("express-validator");
const fs = require("fs");
const db = require("../database/models");

module.exports = {
  categories: (req, res) => {
    db.Categories.findAll().then((categories) => {
      res.render("admin/categories/adminCategories", {
        categories,
        session: req.session,
      });
    });
  },
  categoryCreate: (req, res) => {
    res.render("admin/categories/adminCategoriesCreateForm", {
      session: req.session,
    });
  },
  categoryStore: (req, res) => {
    let errors = validationResult(req);
    if (req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      };
      errors.push(image);
    }
    if (errors.isEmpty()) {
      db.Categories.create({
        name: req.body.name,
        image: req.file ? req.file.filename : "default-image.png",
      }).then((result) => {
        res.redirect("/admin/products");
      });
    } else {
      res.render("adminProductCreateForm", {
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  categoryEdit: (req, res) => {
    db.Categories.findByPk(req.params.id).then((category) => {
      res.render("admin/categories/adminCategoriesEditForm", {
        category,
        session: req.session,
      });
    });
  },
  categoryUpdate: (req, res) => {
    let errors = validationResult(req);
    if (req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      };
      errors.push(image);
    }
    if (errors.isEmpty()) {
      db.Categories.findByPk(req.params.id).then((category) => {
        db.Categories.update(
          {
            name: req.body.name,
            image: req.file ? req.file.filename : category.image,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        ).then((result) => {
          res.redirect("/admin/products");
        });
      });
    } else {
      db.Categories.findByPk(req.params.id).then((category) => {
        res.render("admin/categories/adminCategoriesEditForm", {
          category,
          errors: errors.mapped(),
          old: req.body,
          session: req.session,
        });
      });
    }
  },
  categoryDestroy: (req, res) => {
    db.Subcategories.destroy({
      where: {
        categoryId: req.params.id,
      },
    }).then((result) => {
      db.Categories.findByPk(req.params.id).then((category) => {
        fs.existsSync("./public/images/productos/", category.image)
          ? fs.unlinkSync("./public/images/productos/" + category.image)
          : console.log("-- No se encontró");
        db.Categories.destroy({
          where: {
            id: req.params.id,
          },
        }).then((result) => {
          return res.redirect("/admin/categories");
        });
      });
    });
  },
};
