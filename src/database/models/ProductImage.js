module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImages";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false 
        },
        image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        productId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }
    let config = {
        tableName: "products_images",
        timestamps: false
    }

    const ProductImage = sequelize.define(alias, cols, config)

    ProductImage.associate = models => {
        ProductImage.belongsTo(models.Products, {
            as: "product",
            foreignKey:"productId"
        })
    }

    return ProductImage;
}