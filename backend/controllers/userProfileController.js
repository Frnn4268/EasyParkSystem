const User = require('../models/userModel');
const createError = require('../utils/appError');

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
        
        const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, { new: true });
        
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