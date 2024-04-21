const Vehicle = require('../models/vehicleModel');
const createError = require('../utils/appError');

// Get all vehicles
exports.getAllVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json({
            status: 'success',
            data: vehicles
        });
    } catch (error) {
        next(error);
    }
};

// Update a vehicle
exports.updateVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { license_plate, type, brand, color } = req.body;
        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, {
            license_plate,
            type,
            brand,
            color,
        }, { new: true });
        if (!updatedVehicle) {
            return next(createError(404, 'Vehicle not found'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Vehicle updated successfully!',
            data: updatedVehicle
        });
    } catch (error) {
        next(error);
    }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedVehicle = await Vehicle.findByIdAndDelete(id);
        if (!deletedVehicle) {
            return next(createError(404, 'Vehicle not found'));
        }
        res.status(204).json({
            status: 'success',
            message: 'Vehicle deleted successfully!',
            data: null
        });
    } catch (error) {
        next(error);
    }
};
