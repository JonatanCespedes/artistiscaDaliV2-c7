module.exports = (sequelize, dataTypes) => {
    let alias = "Categories";
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
        banner: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    
    let config = {
        tableName: "categories",
        timeStamps: false
    }

    const Category = sequelize.define(alias, cols, config)

    return Category;
}