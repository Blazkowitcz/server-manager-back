module.exports = app => {
    const TorrentController = require('../controllers/torrent.controller');

    /**
     * Get
     */
    app.get('/torrents', TorrentController.getTorrents);
    app.get('/getTorrentInfo', TorrentController.getTorrentInfo);

    /**
     * Post
     */
    app.post('/addTorrent', TorrentController.addTorrent);
    app.post('/removeTorrent', TorrentController.removeTorrent);
};