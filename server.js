const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config.json');
const path = require('path');

require('./app/modules/database.module');

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(cors());

/**
 * Routes
 */
require('./app/routes/auth.route')(app);

app.listen(config.port || 3000, function() {});