const { DataTypes } = require('sequelize');
const database = require('../modules/database.module');

const User = database.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

database.sync();

module.exports = User;

