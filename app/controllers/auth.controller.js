const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../../config.json');

/**
 * Connect User account
 * @param {Request} req 
 * @param {Response} res 
 */
exports.signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({where: {username: username}});
        if (!user){
            return res.status(400).json({status: false, message: 'Error during login'});
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match){
            return res.status(400).json({status: false, message: 'Error during login'});
        }
        const payload = { user: {id: user.id, username: user.username}};
        jwt.sign(
            payload,
            config.salt,
            {
                expiresIn: 3600
            },
            (err, token) => {
                if (err) { throw err;}
                else {
                    res.status(200).json({token});
                }
            }
        );
    } catch (e) {
        res.send({status: false, message: 'An error occured'});
    }
};

/**
 * Create User account
 * @param {Request} req 
 * @param {Response} res 
 */
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    try{
        let user = await User.findOne({where: {username: username}});
        if(user !== null){
            res.send({status: false, message: 'User already exist'});
        } else {
            const salt = await bcrypt.genSalt(10);
            user = await User.create({
                username: username,
                email: email,
                password: await bcrypt.hash(password, salt)
            });
            user.save();
            res.send({status: true});
        }
    } catch (e){
        console.log(e);
        res.send({status: false, message: 'An error occured'});
    }
};