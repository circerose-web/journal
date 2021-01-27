const sequelize = require("../db")

module.exports = function(sequelize, DataTypes){
    const Log = sequelize.define('log', {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return User;
}