const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config.json');
const path = require('path');
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({windowMs: 1*60*1000, max: 20});
require('./app/modules/database.module');

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(cors());
app.use(limiter);

/**
 * Routes
 */
require('./app/routes/auth.route')(app);
require('./app/routes/torrent.route')(app);
require('./app/routes/service.route')(app);
require('./app/routes/server.route')(app);
require('./app/routes/file.route')(app);

app.listen(config.port || 3000, function() {});