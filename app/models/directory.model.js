const { DataTypes } = require('sequelize');
const database = require('../modules/database.module');

const Directory = database.define('directories', {
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

database.sync();

module.exports = Directory;