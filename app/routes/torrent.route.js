module.exports = app => {
    const TorrentController = require('../controllers/torrent.controller');

    app.get('/torrents', TorrentController.getTorrents);
    app.get('/getTorrentInfo', TorrentController.getTorrentInfo);
    //app.get('/signin', AuthController.signin);
};