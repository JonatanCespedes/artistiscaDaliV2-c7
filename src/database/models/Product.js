module.exports = (sequelize, dataTypes) => {
    let alias = "Products";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER,
        },
        description: {
            type: dataTypes.STRING(800),
        },
        subcategoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
        
    }
    let config = {
        tableName: "products",
        timestamps: true
    }

    const Product = sequelize.define(alias, cols, config)

    Product.associate = models => {
        Product.belongsTo(models.Subcategories, {
            as:"subcategories",
            foreignKey: "subcategoryId"
        })
        Product.hasMany(models.ProductImages, {
            as: "productImages",
            foreignKey: "productId"
        })
        Product.hasMany(models.Order_items, {
            as: "order_items",
            foreignKey: "productId"
        })
    }

    return Product;
}
