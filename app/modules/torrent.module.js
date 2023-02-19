const {Transmission} = require('kkito-transmission-rpc');
const transmission = new Transmission({ host: '192.168.1.26', auth: {username: 'blazkowicz', password: 'marley66'} });
module.exports = transmission;
