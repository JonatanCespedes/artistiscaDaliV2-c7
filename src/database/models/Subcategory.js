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
            type: dataTypes.STRING,
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    
    let config = {
        tableName: "subcategories",
        timeStamps: false
    }

    const Subcategory = sequelize.define(alias, cols, config)

    return Subcategory;
}