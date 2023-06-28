module.exports = app => {
    const ServerController = require('../controllers/server.controller');

    /**
     * Get
     */
    app.get('/server/all', ServerController.getServers);

    /**
     * Post
     */
    app.post('/server/add', ServerController.addServer);
};