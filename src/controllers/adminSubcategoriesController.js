const { validationResult } = require("express-validator");
const fs = require("fs");
const db = require("../database/models");

module.exports = {
  subcategories: (req, res) => {
    db.Subcategories.findAll().then((subcategories) => {
      res.render("admin/subcategories/adminSubcategories", {
        subcategories,
        session: req.session,
      });
    });
  },
  subcategoryCreate: (req, res) => {
    res.render("admin/subcategories/adminSubcategoriesCreateForm", {
      session: req.session,
    });
  },
  subcategoryStore: (req, res) => {
    let errors = validationResult(req);
    if (req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      };
      errors.push(image);
    }
    if (errors.isEmpty()) {
      db.Subcategories.create({
        name: req.body.name,
        categoryId: req.body.category,
      }).then((result) => {
        res.redirect("/admin/subcategories");
      });
    } else {
      res.render("adminSubcategoriesCreateForm", {
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  subcategoryEdit: (req, res) => {
    db.Subcategories.findByPk(req.params.id).then((subcategory) => {
      res.render("admin/subcategories/adminSubcategoriesEditForm", {
        subcategory,
        session: req.session,
      });
    });
  },
  subcategoryUpdate: (req, res) => {
    let errors = validationResult(req);
    if (req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      };
      errors.push(image);
    }
    if (errors.isEmpty()) {
        db.Subcategories.update(
          {
            name: req.body.name,
            categoryId: req.body.categoryId
          },
          {
            where: {
              id: req.params.id,
            },
          }
        ).then((result) => {
          res.redirect("/admin/subcategories");
        });
    } else {
      db.Subcategories.findByPk(req.params.id).then((subcategory) => {
        res.render("admin/subcategories/adminSubcategoriesEditForm", {
          subcategory,
          errors: errors.mapped(),
          old: req.body,
          session: req.session,
        });
      });
    }
  },
  subcategoryDestroy: (req, res) => {
    db.Products.findAll({
      where: {
        subcategoryId: req.params.id
      }
    }).then(products => {
      products.forEach(product => {
        db.ProductImages.findAll({
          where: {
            productId: product.id
          }
        }).then(images => {
          images.forEach((image) => {
            fs.existsSync("./public/images/productos/", image.image)
              ? fs.unlinkSync("./public/images/productos/" + image.image)
              : console.log("-- No se encontró");
          });
        })
        db.ProductImages.destroy({
          where: {
            productId: product.id
          }
        }).then((result)=> {})
      })
      db.Products.destroy({
        where: {
          subcategoryId: req.params.id,
        },
      }).then((result) => {
        db.Subcategories.destroy({
          where: {
            id: req.params.id,
          },
        }).then((result) => {
          return res.redirect("/admin/subcategories");
        });
      });
    })
  },
};
