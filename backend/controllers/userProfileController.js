const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const createError = require('../utils/appError');
const multer = require("multer");
const path = require("path");
require('dotenv').config();

// Configuración de almacenamiento para imágenes usando Multer
const storage = multer.diskStorage({
    destination: './uploads', // Directorio donde se guardarán las imágenes
    filename: (req, file, cb) => { // Función para generar el nombre de archivo único
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

exports.uploadUserImage = upload.single('image');

// Get user by ID
exports.getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return next(createError(404, 'User not found'));
        }

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// Update a user
exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;

        if (!name || !email) {
            return next(createError(400, 'Name and email are required'));
        }

        let updatedUserData = {
            name,
            email
        };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            updatedUserData.password = hashedPassword;
        }

        // Verifica si hay una imagen en la solicitud
        if (req.file) {
            updatedUserData.image = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, { new: true });

        if (!updatedUser) {
            return next(createError(404, 'User not found'));
        }

        // Generar un nuevo token para el usuario actualizado
        const token = jwt.sign({ _id: updatedUser._id }, process.env.SECRET_KEY, {
            expiresIn: '90d',
        });

        res.status(200).json({
            status: 'success',
            message: 'User updated successfully!',
            data: updatedUser,
            token
        });
    } catch (error) {
        next(error);
    }
};
