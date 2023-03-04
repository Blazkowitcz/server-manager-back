const { DataTypes } = require('sequelize');
const database = require('../modules/database.module');

const Service = database.define('services', {
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_service: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stop_service: {
        type: DataTypes.STRING,
        allowNull: true
    },
    restart_service: {
        type: DataTypes.STRING,
        allowNull: true
    },
    port: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

database.sync();

module.exports = Service;