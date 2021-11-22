let db = require("../../database/models");

module.exports = {
  addToCart: (req, res) => {
    let productID = req.params.product;
    let quantity = req.params.quantity;
    let userId = req.params.user;

    if (userId) {
      // Si hay usuaria en sesion
      db.Orders.findAll({
        // Consulto si hay una órden creada para la usuaria
        where: {
          userId: userId,
        },
        include: [
          {
            association: "order_items", include: [{association: "products"}]
          },
        ],
      }).then((result) => {
        // Si existe una orden, la actualizo.
        if (result.length > 0) {
          // Array de items de la orden
          let products = result[0].order_items || null;
          // Busco si el item a agregar existe en la orden
          let item = products?.find((item) => item.productId === +productID);
          // Si el item ya está en la orden, actualizo la cantidad del item
          if (item) {
            let newQuantity = +quantity + item.quantity;
            db.Order_items.update(
              {
                productId: productID,
                quantity: newQuantity,
              },
              {
                where: {
                  id: item.id,
                },
              }
            )
              .then((result) => {
                res.json({
                  status: 200,
                  msg: "Producto actualizado",
                });
              })
              .catch((error) =>
                res.json({
                  errors: error,
                })
              );
          } else {
            //Si el item no está en la órden, lo agrego
            db.Order_items.create({
              productId: productID,
              orderId: result[0].id,
              quantity: +quantity,
            })
              .then((createdProduct) => {
                res.status(201).json({
                  status: 201,
                  data: createdProduct,
                });
              })
              .catch((error) =>
                res.json({
                  errors: error,
                })
              );
          }
        } else {
          // Si no existe la orden, la creo
          db.Orders.create({
            userId,
            state: "PENDING",
          })
            .then((order) => {
              if (order) {
                //Si se creó correctamente, creo el registro en la tabla de items
                db.Order_items.create({
                  orderId: order.id,
                  productId: productID,
                  quantity: +quantity,
                }).then((order_item) => {
                  res.json({
                    meta: {
                      status: 201,
                    },
                    data: order_item,
                  });
                });
              }
            })
            .catch((error) =>
              res.json({
                errors: error,
              })
            );
        }
      });
    }
  },
  removeOneFromCart: (req, res) => {
    let itemId = req.params.item;
    let user = req.params.user;
    //Busco la orden asociada al usuario
    db.Orders.findOne({
      where: {
        userId: user,
      },
      include: [
        {
          association: "order_items",
          include: [
            {
              association: "products",
            },
          ],
        },
      ],
    }).then((order) => {
      // Busco en la orden el item a quitar
      let itemToRemove = order.order_items.find(
        (item) => item.productId === +itemId
      );
      if (itemToRemove !== undefined) {
        db.Order_items.findByPk(itemToRemove.id)
          .then((item) => {
            let newQuantity = +item.quantity - 1;
            if (item.quantity > 1) {
              db.Order_items.update(
                {
                  orderId: item.orderId,
                  productId: item.productId,
                  quantity: newQuantity,
                },
                {
                  where: {
                    id: item.id,
                  },
                }
              ).then((result) => {
                if (result) {
                  res.json({
                    status: 200,
                    msg: "Item quantity updated",
                  });
                }
              });
            } else {
              db.Order_items.destroy({
                where: {
                  id: item.id,
                },
              }).then((result) =>
                res.status(200).json({
                  status: 200,
                  msg: "Item removed absolutely",
                })
              );
            }
          })
          .catch((error) =>
            res.json({
              errors: error,
            })
          );
      }
    });
  },
  removeAllFromCart: (req, res) => {
    let itemId = +req.params.item;
    let user = req.params.user;
    //Busco la orden asociada al usuario
    db.Orders.findOne({
      where: {
        userId: user,
      },
      include: [
        {
          association: "order_items",
          include: [
            {
              association: "products",
            },
          ],
        },
      ],
    }).then((order) => {
      // Busco en la orden el item a quitar
      let itemToRemove = order.order_items.find(
        (item) => item.productId === +itemId
      );
      if (itemToRemove !== undefined) {
        db.Order_items.destroy({
          where: {
            id: itemToRemove.id,
          },
        })
          .then((result) =>
            res.json({
              status: 200,
              msg: "Item removed absolutely",
            })
          )
          .catch((error) =>
            res.json({
              errors: error,
            })
          );
      }
    });
  },
  clearCart: (req, res) => {
    let user = req.params.user;
    //Busco la orden asociada al usuario
    db.Orders.findOne({
      where: {
        userId: user,
      },
      include: [
        {
          association: "order_items",
          include: [
            {
              association: "products",
            },
          ],
        },
      ],
    }).then((order) => {
      db.Order_items.destroy({
        where: {
          orderId: order.id,
        },
      })
        .then((result) => {
          db.Orders.destroy({
            where: {
              id: order.id,
            },
          }).then((finalResult) => {
            res.json({
              status: 200,
              msg: "Order deleted ok!",
            });
          });
        })
        .catch((error) =>
          res.json({
            errors: error,
          })
        );
    });
  },
  productsInCart: (req, res) => {
    let user = req.params.user
    
    db.Orders.findOne({
      where: {
        userId: user,
      },
      include: [
        {
          association: "order_items",
          include: [
            {
              association: "products",
              include: [{association: "productImages"}]
            },
          ],
        },
      ],
    }).then((order) => {
      if(order){
        res.json({
          data: order,
        });
      }else{
        res.json({
          status: 404,
          msg: "No hay una orden creada"
        })
      }
    }).catch(error => console.log(error))
  },
};
