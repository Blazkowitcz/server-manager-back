const Service = require('../models/service.model');
const socket = require('../utils/socket.util');
const {spawn} = require('child_process');
const Server = require('../models/server.model');

/**
 * Get all services
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getAllServices = async (req, res) => {
    const services = await Service.findAll({include: Server});
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
    const server = await Server.findOne({where: {id: req.body.server}});
    console.log(server);
    const service = await Service.create({
        name: req.body.name,
        start_service: req.body.start_service,
        stop_service: req.body.stop_service,
        restart_service: req.body.restart_service, 
        ip: req.body.ip,
        port: req.body.port,
        serverId: server.id
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

/**
 * Start a service
 * @param {Request} req 
 * @param {Response} res 
 */
exports.startService = async (req, res) => {
    const service = await Service.findOne({where: {id: req.body.id}});
    if(service === null){
        res.send(false);
    }
    const command = service.start_service.split(' ')[0];
    const args = service.start_service.split(' ');
    args.shift();
    const result = await executeCommand(command, args);
    res.send(result);
};

/**
 * Stop a service
 * @param {Request} req 
 * @param {Response} res 
 */
exports.stopService = async (req, res) => {
    const service = await Service.findOne({where: {id: req.body.id}});
    if(service === null){
        res.send(false);
    }
    const command = service.stop_service.split(' ')[0];
    const args = service.stop_service.split(' ');
    args.shift();
    const result = await executeCommand(command, args);
    res.send(result);
};

/**
 * Restart a service
 * @param {Request} req 
 * @param {Response} res 
 */
exports.restartService = async (req, res) => {
    const service = await Service.findOne({where: {id: req.body.id}});
    if(service === null){
        res.send(false);
    }
    const command = service.restart_service.split(' ')[0];
    const args = service.restart_service.split(' ');
    args.shift();
    const result = await executeCommand(command, args);
    res.send(result);
};

/**
 * Execute command from service
 * @param {String} command 
 * @param {Array} args 
 * @returns 
 */
async function executeCommand(command, args){
    const promise = new Promise((resolve, reject) => {
        const process = spawn(command, args);
        let out = '';
        let err  = '';
        let success = true;
        process.stdout.on('data', function(data){
            out += data.toString();
        });
        process.stderr.on('data', function(data){
            err += data.toString();
            success = false;
        });
        process.on('close', (code) => {
            resolve({code: code, success: success, out: out, err: err});
        });

    });
    return promise;
}