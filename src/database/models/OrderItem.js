module.exports = (sequelize, dataTypes) => {
    let alias = "Order_items";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        orderId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false 
        },
        productId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false 
        },
        quantity: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false 
        },

    }
    let config = {
        tableName: "order_items",
        timestamps: true
    }

    const Order_items = sequelize.define(alias, cols, config)

    Order_items.associate = models => {
        Order_items.belongsTo(models.Orders, {
            as:"order",
            foreignKey: "orderId"
        })
        Order_items.belongsTo(models.Products, {
            as:"products",
            foreignKey: "productId"
        })
    }

    return Order_items;
}