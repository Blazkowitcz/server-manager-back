const { DataTypes } = require('sequelize');
const database = require('../modules/database.module');

const Server = database.define('servers', {
    ip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

database.sync();

module.exports = Server;