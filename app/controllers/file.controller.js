const path = require('path');
const fs = require('fs');
const Directory = require('../models/directory.model');
const FileUtil = require('../utils/file.util');

/**
 * Get Directory Content
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getDirectoryContent = async (req, res) => {
    const directory = await Directory.findOne({where: {id: req.body.directory}});
    const currentPath = req.body.path;
    const directoryPath = path.join(directory.path, currentPath);
    const results = [];
    const files =  fs.readdirSync(directoryPath, function (err, files) {
        const test = [];
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach(function (file) {
            test.push(file);
        });
        return results;
    });
    for(const file of files){
        const type = fs.lstatSync(directoryPath + '/' + file).isDirectory() === true ? 'directory' : await FileUtil.checkFileExtension(file);
        results.push({
            name: file,
            type: type,
            path: directoryPath
        });
    }
    res.send(results);
};

/**
 * Create new root Directory
 * @param {Request} req 
 * @param {Response} res 
 */
exports.createRootDirectory = async (req,res) => {
    let directory = await Directory.findOne({where: {name: req.body.name}});
    if(directory !== null){
        res.send({status: false, message: 'Directory name already exist'});
    }
    directory = await Directory.create({
        name: req.body.name,
        path: req.body.path
    });
    directory.save();
    res.send({statue: true});
};

/**
 * Move a file to a new destination
 * @param {Request} req 
 * @param {Response} res 
 */
exports.moveFile = async (req,res) => {
    if(fs.lstatSync(req.body.filePath).isFile() === true || fs.lstatSync(req.body.filePath).isDirectory() === true){
        fs.rename(req.body.filePath, req.body.destination);
        res.send({status: true, message: 'Element moved'});
    }else{
        res.send({status: false, message: 'file does not exist'});
    }
};

