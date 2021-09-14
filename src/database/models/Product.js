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
        subcategory_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        images: {
            type: dataTypes.TEXT,
        }
        
    }
    let config = {
        tableName: "products",
        timeStamps: true
    }

    const Product = sequelize.define(alias, cols, config)

    return Product;
}
