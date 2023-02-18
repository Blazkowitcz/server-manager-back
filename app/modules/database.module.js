const config = require('../../config.json');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    config.database.database_name, 
    config.database.user, 
    config.database.password, 
    {
        host: config.database.address, 
        dialect: config.database.database_type,
        logging: false
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;