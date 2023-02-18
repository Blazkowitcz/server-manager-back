const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config.json');
const path = require('path');

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(cors());

app.listen(config.port || 3000, function() {});