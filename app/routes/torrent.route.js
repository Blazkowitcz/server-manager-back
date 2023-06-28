module.exports = app => {
    const TorrentController = require('../controllers/torrent.controller');

    /**
     * Get
     */
    app.get('/torrent/all', TorrentController.getTorrents);
    app.get('/torrent/info', TorrentController.getTorrentInfo);

    /**
     * Post
     */
    app.post('/torrent/add', TorrentController.addTorrent);
    app.post('/torrent/remove', TorrentController.removeTorrent);
};