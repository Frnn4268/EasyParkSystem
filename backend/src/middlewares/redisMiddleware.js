const redisClient = require('../config/redisClient');
const jwt = require('jsonwebtoken');

exports.storeToken = async (userId, token) => {
    await redisClient.set(userId.toString(), token, {
        EX: 90 * 24 * 60 * 60 // 90 days in seconds
    });
};

exports.getToken = async (userId) => {
    return await redisClient.get(userId.toString());
};

exports.generateToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.SECRET_KEY, {
        expiresIn: '90d',
    });
};