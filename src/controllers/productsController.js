const db = require("../database/models");
const { Op } = require("sequelize");
let axios = require('axios')

const BASE_URL = "http://localhost:3000/api";

module.exports = {
  detail: (req, res) => {
    db.Products.findOne({
      where: {
        id: +req.params.id,
      },
      include: [
        {
          association: "productImages",
        },
      ],
    }).then((product) => {
      db.Products.findAll({
        where: {
          subcategoryId: product.subcategoryId,
        },
      }).then((products) => {
        res.render("productDetail", {
          sliderTitle: "Productos relacionados",
          sliderProducts: products,
          product,
          session: req.session,
        });
      });
    });
  },
  category: (req, res) => {
    db.Categories.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          association: "subcategories",
          include: [
            {
              association: "products",
              include: [
                {
                  association: "productImages",
                },
              ],
            },
          ],
        },
      ],
    })
      .then((category) => {
        let subcategories = category.subcategories;
        let products = [];
        console.log(req.session.user.id)
        subcategories.forEach((subcategory) => {
          subcategory.products.forEach((product) => products.push(product));
        });
        res.render("categories", {
          category,
          products,
          session: req.session,
          user: req.session.user.id,
        });
      })
      .catch((err) => console.log(err));
  },
  subcategory: (req, res) => {
    db.Subcategories.findByPk(req.params.id, {
      include: [
        {
          association: "products",
          include: [
            {
              association: "productImages",
            },
          ],
        },
      ],
    })
      .then((subcategory) => {
        db.Categories.findByPk(subcategory.categoryId, {
          include: [{ association: "subcategories" }],
        }).then((category) =>
          res.render("subcategory", {
            category,
            products: subcategory.products,
            session: req.session,
          })
        );
      })
      .catch((err) => console.log(err));
  },
  search: (req, res) => {
      db.Products.findAll({
          where: {
              name: {
                  [Op.like]: `%${req.query.search}`
              }
          },
          include: [{association: "productImages"}]
      }).then(result => res.render('searchResult', {
          result,
          session: req.session,
          search: req.query.search
      }))
  },
  cart: (req, res) => {
    let user = req.session.user.id
    axios({
      method: 'get',
      url: `http://localhost:3000/api/cart/${user}`,
    })
    .then(response =>{
      let products = response.data.data?.order_items.map(item => {
        return {
          ...item.products,
          quantity: item.quantity
        }
      })
      res.render('productCart', {
        session: req.session,
        products: products !== undefined ? products : [],
        user: req.session.user.id
      })}
      
    )
    .catch(error => res.send(error))
  }
};
