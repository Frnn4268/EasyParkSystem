const TimeSearchParking = require('../models/timeSearchParkingModel');
const createError = require('../utils/appError');

// Get all time search parking
exports.getAllTimeSearchParking = async (req, res, next) => {
    try {
        const timeSearchParking = await TimeSearchParking.find();
        res.status(200).json({
            status: 'success',
            data: timeSearchParking
        });
    } catch (error) {
        next(error);
    }
};

// Get last created time search parking ID
exports.getLastTimeSearchParking = async (req, res, next) => {
    try {
        const lastTimeSearchParking = await TimeSearchParking.findOne().sort({ _id: -1 });
        if (!lastTimeSearchParking) {
            return res.status(404).json({
                status: 'success',
                message: 'No se encontraron registros de búsqueda de estacionamiento',
                data: null
            });
        }

        res.status(200).json({
            status: 'success',
            data: lastTimeSearchParking._id
        });
    } catch (error) {
        next(error);
    }
};

// Create a new time search parking
exports.createTimeSearchParking = async (req, res, next) => {
    try {
        const currentTime = new Date();
        const newTimeSearchParking = await TimeSearchParking.create({
            hour_date_entry: currentTime,
            hour_date_output: null,
            time_search_parking: null
        });
        res.status(201).json({
            status: 'success',
            data: newTimeSearchParking
        });
    } catch (error) {
        next(error);
    }
};

// Update a time search parking
exports.updateTimeSearchParking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const currentTime = new Date();

        const timeSearchParking = await TimeSearchParking.findById(id);
        if (!timeSearchParking) {
            return next(createError(404, 'Registro de búsqueda de estacionamiento no encontrado'));
        }

        if (!timeSearchParking.hour_date_output) {
            timeSearchParking.hour_date_output = currentTime;
            timeSearchParking.time_search_parking = currentTime - timeSearchParking.hour_date_entry;
            await timeSearchParking.save();
        } else {
            return next(createError(400, 'El registro de búsqueda de estacionamiento ya ha sido actualizado'));
        }

        res.status(200).json({
            status: 'success',
            data: timeSearchParking
        });
    } catch (error) {
        next(error);
    }
};

// Delete a time search parking
exports.deleteTimeSearchParking = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedTimeSearchParking = await TimeSearchParking.findByIdAndDelete(id);
        if(!deletedTimeSearchParking) {
            return next(createError(404, 'Time search parking not found'));
        }
        res.status(204).json({
            status: 'success',
            message: 'Time search parking deleted successfully',
            data: null
        });
    } catch (error) {
        next(error);
    }
};
