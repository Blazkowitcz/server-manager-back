module.exports = app => {
    const FileController = require('../controllers/file.controller');

    app.get('/directory/content', FileController.getDirectoryContent);

    app.post('/directory/create', FileController.createRootDirectory);
};