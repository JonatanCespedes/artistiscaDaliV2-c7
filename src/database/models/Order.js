module.exports = (sequelize, dataTypes) => {
    let alias = "Orders";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        userId: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            allowNull: false 
        },
        state: {
            type: dataTypes.STRING,
            allowNull: false 
        },

    }
    let config = {
        tableName: "orders",
        timestamps: true
    }

    const Order = sequelize.define(alias, cols, config)

    Order.associate = models => {
        Order.belongsTo(models.Users, {
            as:"users",
            foreignKey: "userId"
        })
        Order.hasMany(models.Order_items, {
            as: "order_items",
            foreignKey: "orderId"
        })
    }

    return Order;
}