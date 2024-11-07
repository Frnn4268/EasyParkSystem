const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const redis = require('redis')
const User = require('../models/userModel')
const createError = require('../utils/appError')

require('dotenv').config();

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

(async () => {
    await redisClient.connect();
})();

// Register user
exports.signup = async (req, res, next) => {
    try {
        const adminUser = await User.findOne({ role: 'Administrador' });

        if (adminUser && req.body.role === 'Administrador') {
            return next(new createError('Ya existe un administrador asignado. No se pueden registrar más administradores.', 403));
        } 

        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return next(new createError('El usuario ya existe', 400));
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
            active: true
        });

        // Assing JWT (json web token) to user
        const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY, {
            expiresIn: '90d',
        });

        // Store token in Redis
        await redisClient.set(newUser._id.toString(), token, {
            EX: 90 * 24 * 60 * 60 // 90 days in seconds
        });

        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado exitosamente',
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                active: newUser.active
            }
        });
    } catch (error) {
        next(error);
    }
};

// Login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return next(new createError('Usuario no encontrado', 404));

        if (user.active === false) return next(new createError('Usuario sin autorización', 403));

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new createError('Contraseña o email incorrecto', 401));
        }

        // Check if token exists in Redis
        const cachedToken = await redisClient.get(user._id.toString());

        let token;
        if (cachedToken) {
            token = cachedToken;
        } else {
            // Assing JWT (json web token) to user
            token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
                expiresIn: '90d',
            });

            // Store token in Redis
            await redisClient.set(user._id.toString(), token, {
                EX: 90 * 24 * 60 * 60 // 90 days in seconds
            });
        }

        res.status(200).json({
            status: 'success',
            token,
            message: 'Inicio de sesión exitoso',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                active: user.active
            }
        });

    } catch (error) {
        next(error);
    }
};