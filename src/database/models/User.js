module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull:false
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull:false
        },
        last_name: {
            type: dataTypes.STRING(45),
            allowNull:false
        },
        email: {
            type: dataTypes.STRING(60),
            allowNull:false
        },
        password: {
            type: dataTypes.STRING(70),
            allowNull:false
        },
        phone: {
            type: dataTypes.STRING(30)
        },
        rol: {
            type: dataTypes.INTEGER(2).UNSIGNED,
            allowNull:false
        }
    }
    let config = {
        tableName: "users",
        timeStamps: true // Si no existen las columnas created_at, updated_at linea fundamental
     }

    const User = sequelize.define(alias, cols, config),

    return User;
}


