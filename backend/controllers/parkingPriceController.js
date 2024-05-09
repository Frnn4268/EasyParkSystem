const ParkingPrice = require('../models/parkingPriceModel');
const createError = require('../utils/appError');

// Get the last parking price
exports.getLastParkingPrice = async (req, res, next) => {
    try {
        const lastParkingPrice = await ParkingPrice.findOne().sort({ _id: -1 });
        if (!lastParkingPrice) {
            return next(createError(404, 'No se encontro el último precio de parqueo'));
        }
        res.status(200).json({
            status: 'success',
            data: lastParkingPrice
        });
    } catch (error) {
        next(error);
    }
};

// Create a new parking price
exports.createParkingPrice = async (req, res, next) => {
    try {
        const { price, time_in_hours } = req.body;
        const now = new Date(); 
        const newParkingPrice = await ParkingPrice.create({
            price: price,
            time_in_hours: time_in_hours,
            hour_date: now,
        });
        res.status(201).json({
            status: 'success',
            message: 'Precio de parqueo creado exitosamente!',
            data: newParkingPrice
        });
    } catch (error) {
        next(error);
    }
};
