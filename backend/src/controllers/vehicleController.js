const Vehicle = require('../models/vehicleModel.js');
const ParkingSpace = require('../models/parkingSpaceModel.js');
const createError = require('../utils/appError.js');

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

        const vehicleInParkingSpace = await ParkingSpace.findOne({ vehicle: id });

        if (vehicleInParkingSpace) {
            return next(new createError('No se puede eliminar este vehículo porque está asociado a un espacio de estacionamiento.', 400));
        }

        const deletedVehicle = await Vehicle.findByIdAndDelete(id);

        if (!deletedVehicle) {
            return next(createError(404, 'Vehículo no encontrado'));
        }

        res.status(204).json({
            status: 'success',
            message: 'Vehículo eliminado exitosamente!',
            data: null
        });
    } catch (error) {
        next(error);
    }
};
