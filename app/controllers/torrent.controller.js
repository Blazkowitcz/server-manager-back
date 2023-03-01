const transmission = require('../modules/torrent.module');
const fs = require('fs');
const config = require('../../config.json');

/**
 * Get all torrents
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getTorrents = async (req, res) => {
    try{
        const torrents = [];
        transmission.get(function(err, arg){
            arg.torrents.forEach(t => {
                const torrent = {};
                torrent.name = t.name;
                torrent.percentage = t.percentDone * 100;
                torrents.push(torrent);
            });
            res.send(torrents);
        });
    } catch (e){
        res.send(false);
    }
};

/**
 * Get torrent informations
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getTorrentInfo = async (req, res) => {
    try{
        transmission.get(function(err, arg){
            let torrent = {};
            arg.torrents.forEach(t => {
                if (t.id.toString() === req.body.torrent_id){
                    t.percentDone = t.percentDone * 100;
                    torrent = t;
                }
            });
            res.send(torrent);
        });
    } catch (e){
        res.send(false);
    }
};

/**
 * Add a torrent file
 * @param {Request} req 
 * @param {Response} res 
 */
exports.addTorrent = async (req, res) => {
    const torrent_file = req.files.torrent;
    await torrent_file.mv('./public/torrents/tmp.torrent');
    transmission.addFile('./public/torrents/tmp.torrent', function(err, arg){
        fs.unlink('./public/torrents/tmp.torrent', (err) => {});
    });
    res.send(true);
};

/**
 * Remove a torrent
 * @param {Request} req 
 * @param {Response} res 
 */
exports.removeTorrent = async (req, res) => {
    const remove_data = req.body.remove_data !== undefined ? req.body.remove_data : false;
    await transmission.removeTorrent(req.body.torrent_id, remove_data);
    res.send(true);
};

/**
 * Stop a torrent
 * @param {Request} req 
 * @param {Response} res 
 */
exports.stopTorrent = async (req, res) => {
    await transmission.stop(req.body.torrent_id);
    res.send(true);
}

/**
 * Start a torrent
 * @param {Request} req 
 * @param {Response} res 
 */
exports.startTorrent = async (req, res) => {
    await transmission.start(req.body.torrent_id);
    res.send(true);
}