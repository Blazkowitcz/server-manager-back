const Transmission = require('transmission');
const config = require('../../config.json');
const transmission = new Transmission({host: config.torrent.transmission.host, port: 9091, username: config.torrent.transmission.auth.username, password: config.torrent.transmission.auth.password});
module.exports = transmission;
