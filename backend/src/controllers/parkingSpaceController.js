const ParkingSpace = require('../models/parkingSpaceModel');
const createError = require('../utils/appError');

// Get all parking spaces
exports.getAllParkingSpaces = async (req, res, next) => {
    try {
        const parkingSpaces = await ParkingSpace.find();
        res.status(200).json({
            status: 'success',
            data: parkingSpaces
        });
    } catch (error) {
        next(error);
    }
};

// Create a new parking space
exports.createParkingSpace = async (req, res, next) => {
    try {
        const { estado } = req.body;
        const newParkingSpace = new ParkingSpace({
            estado
        });
        await newParkingSpace.save();
        res.status(201).json({
            status: 'success',
            message: 'Parking space created successfully!',
            data: newParkingSpace
        });
    } catch (error) {
        next(error);
    }
};

// Update a parking space
exports.updateParkingSpace = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const updatedParkingSpace = await ParkingSpace.findByIdAndUpdate(id, {
            estado
        }, { new: true });
        if (!updatedParkingSpace) {
            return next(createError(404, 'Parking space not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Parking space updated successfully!',
            data: updatedParkingSpace
        });
    } catch (error) {
        next(error);
    }
};

// Delete a parking space
exports.deleteParkingSpace = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedParkingSpace = await ParkingSpace.findByIdAndDelete(id);
        if (!deletedParkingSpace) {
            return next(createError(404, 'Parking space not found'));
        }
        res.status(204).json({
            status: 'success',
            message: 'Parking space deleted successfully!',
            data: null
        });
    } catch (error) {
        next(error);
    }
};
