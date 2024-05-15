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

        const timeSearchParking = await TimeSearchParking.findById(id);
        if (!timeSearchParking) {
            return next(createError(404, 'Registro de búsqueda de estacionamiento no encontrado'));
        }

        await timeSearchParking.remove();

        res.status(200).json({
            status: 'success',
            message: 'Registro de búsqueda de estacionamiento eliminado correctamente'
        });
    } catch (error) {
        next(error);
    }
};
