const { DataTypes } = require('sequelize');
const database = require('../modules/database.module');

const Service = database.define('services', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    port: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

database.sync();

module.exports = Service;