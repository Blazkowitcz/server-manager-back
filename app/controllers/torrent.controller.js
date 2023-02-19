const transmission = require('../modules/torrent.module');

/**
 * Get all torrents
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getTorrents = async (req, res) => {
    res.send(await transmission.getTorrents());
};

/**
 * Get torrent informations
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getTorrentInfo = async (req, res) => {
    res.send(await transmission.getTorrentInfo(req.body.torrent_id));
};