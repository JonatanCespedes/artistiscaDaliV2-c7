const { validationResult } = require("express-validator");
const fs = require("fs");
const db = require("../database/models");

module.exports = {
  signin: (req, res) => {
    res.render("admin/adminLogin");
  },
  dashboard: (req, res) => {
    res.render("admin/adminIndex", {
      session: req.session,
    });
  },
  products: (req, res) => {
    db.Products.findAll().then((products) => {
      res.render("admin/products/adminProducts", {
        products,
        session: req.session,
      });
    });
  },
  productsCreate: (req, res) => {
    db.Categories.findAll({
      include: [
        {
          association: "subcategories",
        },
      ],
    })
      .then((categories) => {
        res.render("admin/products/adminProductCreateForm", {
          categories,
          session: req.session,
        });
      })
      .catch((err) => console.log(err));
  },
  productStore: (req, res) => {
    let errors = validationResult(req);
    if (req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      };
      errors.push(image);
    }

    if (errors.isEmpty()) {
      let arrayImages = [];
      if (req.files) {
        req.files.forEach((image) => {
          arrayImages.push(image.filename);
        });
      }

      let { name, price, discount, subcategory, description } = req.body;

      db.Products.create({
        name,
        price,
        description,
        discount,
        subcategoryId: subcategory,
      }).then((product) => {
        if (arrayImages.length > 0) {
          let images = arrayImages.map((image) => {
            return {
              image: image,
              productId: product.id,
            };
          });
          db.ProductImages.bulkCreate(images)
            .then(() => res.redirect("/admin/products"))
            .catch((err) => console.log(err));
        } else {
          db.ProductImages.create({
            image: "default-image.png",
            productId: product.id,
          })
            .then(() => res.redirect("/admin/products"))
            .catch((err) => console.log(err));
        }
      });
    } else {
      res.render("admin/products/adminProductCreateForm", {
        subcategories,
        categories,
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  productEdit: (req, res) => {
    db.Products.findByPk(req.params.id).then((product) => {
      res.render("admin/products/adminProductEditForm", {
        product,
        session: req.session,
      });
    });
  },
  productUpdate: (req, res) => {
    let errors = validationResult(req);
    if (req.fileValidatorError) {
      let image = {
        param: "image",
        msg: req.fileValidatorError,
      };
      errors.push(image);
    }
    if (errors.isEmpty()) {
      let { name, price, discount, category, subcategory, description } =
        req.body;

      let arrayImages = [];
      if (req.files) {
        req.files.forEach((image) => {
          arrayImages.push(image.filename);
        });
      }

      db.Products.update(
        {
          name,
          price,
          discount,
          category,
          subcategory,
          description,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((result) => {
        if (result) {
          if (arrayImages.length > 0) {
            let images = arrayImages.map((image) => {
              return {
                image: image,
                productId: req.params.id,
              };
            });
            db.ProductImages.findAll({
              where: {
                productId: req.params.id,
              },
            }).then((result) => {
              result.forEach((image) => {
                fs.existsSync("./public/images/productos/", image.image[0])
                  ? fs.unlinkSync("./public/images/productos/" + image.image[0])
                  : console.log("-- No se encontró");
              });
              db.ProductImages.destroy({
                where: {
                  productId: req.params.id,
                },
              }).then(
              db.ProductImages.bulkCreate(images).then(
                res.redirect("/admin/products")
              )
            )
          });
          }
          res.redirect("/admin/products");
        }
      });

    } else {
      db.Products.findByPk(req.params.id).then(product => {
        res.render("admin/products/adminProductEditForm", {
          product,
          errors: errors.mapped(),
          old: req.body,
          session: req.session,
        });
      })
    }
  },
  productDestroy: (req, res) => {
    db.ProductImages.findAll({
      where: {
        productId: req.params.id,
      },
    }).then((result) => {
      result.forEach((image) => {
        fs.existsSync("./public/images/productos/", image.image[0])
          ? fs.unlinkSync("./public/images/productos/" + image.image[0])
          : console.log("-- No se encontró");
      });
      db.ProductImages.destroy({
        where: {
          productId: req.params.id,
        },
      }).then((result) => {
        db.Products.destroy({
          where: {
            id: req.params.id,
          },
        }).then(res.redirect("/admin/products"));
      });
    });
  },
};
