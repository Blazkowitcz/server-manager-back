const Server = require('../models/server.model');
const Service = require('../models/service.model');

/**
 * Get all servers
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getServers = async (req, res) => {
    const servers = await Server.findAll({include: Service});
    res.send(servers);
};

/**
 * Add a new server
 * @param {Request} req 
 * @param {Response} res 
 */
exports.addServer = async (req, res) => {
    const server = await Server.create({
        name: req.body.name,
        ip: req.body.ip
    });
    server.save();
    res.send(true);
};