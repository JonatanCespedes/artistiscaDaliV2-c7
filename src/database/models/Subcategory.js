<<<<<<< HEAD
const Category = require("./Category");

=======
>>>>>>> 391cc2d71fb4f1ef2396794bb1245cc30f1a044e
module.exports = (sequelize, dataTypes) => {
    let alias = "Subcategories";
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
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }
    let config = {
        tableName: "subcategories",
        timeStamps: true
    }

    const Subcategory = sequelize.define(alias, cols, config)

    return Subcategory;
}