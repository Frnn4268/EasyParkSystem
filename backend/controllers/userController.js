const User = require('../models/userModel');
const createError = require('../utils/appError');

// Get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (error) {
        next(error);
    }
};

// Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const { name, email, role, password, active } = req.body;
        const newUser = new User({
            name,
            email,
            role,
            password,
            active
        });
        await newUser.save();
        res.status(201).json({
            status: 'success',
            message: 'User created successfully!',
            data: newUser
        });
    } catch (error) {
        next(error);
    }
};

// Update a user
exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, role, password, active } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, {
            name,
            email,
            role,
            password,
            active
        }, { new: true });
        if (!updatedUser) {
            return next(createError(404, 'User not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'User updated successfully!',
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return next(createError(404, 'User not found'));
        }
        res.status(204).json({
            status: 'success',
            message: 'User deleted successfully!',
            data: null
        });
    } catch (error) {
        next(error);
    }
};
