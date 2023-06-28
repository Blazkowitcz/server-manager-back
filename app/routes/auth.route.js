module.exports = app => {
    const AuthController = require('../controllers/auth.controller');

    app.post('/auth/login', AuthController.signin);
    app.post('/auth/register', AuthController.signup);
};