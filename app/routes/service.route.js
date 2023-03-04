module.exports = app => {
    const ServiceController = require('../controllers/service.controller');

    /**
     * Get
     */
    app.get('/service/all', ServiceController.getAllServices);

    /**
     * Post
     */
    app.post('/service/add', ServiceController.addService);
    app.post('/service/remove', ServiceController.removeService);
    app.post('/service/edit', ServiceController.editService);
    app.post('/service/start', ServiceController.startService);
};