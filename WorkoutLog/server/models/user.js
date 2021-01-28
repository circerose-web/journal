module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return User;
}