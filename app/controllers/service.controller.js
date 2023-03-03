const Service = require('../models/service.model');
const socket = require('../utils/socket.util');

/**
 * Get all services
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getAllServices = async (req, res) => {
    const services = await Service.findAll();
    if(services.length === 0){
        res.send(services);
    }
    const promise = new Promise((resolve, reject) => {
        services.forEach(async (service, index, array) => {
            const reachable = await socket.isPortReachable(service.port, service.ip);
            service.dataValues.reachable = reachable;
            if (index === array.length -1){
                resolve();
            }
        });
    });
    promise.then(() => {
        res.send(services);
    });
};

/**
 * Add a new service
 * @param {Request} req 
 * @param {Response} res 
 */
exports.addService = async (req, res) => {
    const service = await Service.create({
        name: req.body.name,
        ip: req.body.ip,
        port: req.body.port
    });
    service.save();
    res.send(true);
};

/**
 * Remove a service
 * @param {Request} req 
 * @param {Response} res 
 */
exports.removeService = async (req, res) => {
    await Service.destroy({
        where: {
            id: req.body.id
        }
    });
    res.send(true);
};

/**
 * Edit a service
 * @param {Request} req 
 * @param {Response} res 
 */
exports.editService = async (req, res) => {
    const service = await Service.findOne({where: {id: req.body.id}});
    service.name = req.body.name;
    service.ip = req.body.ip;
    service.port = req.body.port;
    service.save();
    res.send(true);
};