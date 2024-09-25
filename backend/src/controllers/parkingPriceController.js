const ParkingPrice = require('../models/parkingPriceModel');
const ParkingSpace = require('../models/parkingSpaceModel');
const createError = require('../utils/appError');

// Calculate parking cost based on parking price and elapsed time
const calculateParkingCost = (parkingPrice, elapsedTimeInSeconds) => {
    const costPerSecond = parkingPrice / 3600; // Convert price per hour to price per second
    const cost = elapsedTimeInSeconds * costPerSecond;
    return cost.toFixed(2);
};

// Get the last parking price
exports.getLastParkingPrice = async (req, res, next) => {
    try {
        const lastParkingPrice = await ParkingPrice.findOne().sort({ _id: -1 });
        if (!lastParkingPrice) {
            return next(new createError(404, 'No se encontro el último precio de parqueo'));
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

// Get parking space by ID and calculate parking cost
exports.getParkingCostById = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Get parking space details by ID
        const parkingSpace = await ParkingSpace.findOne({ _id: id });
        if (!parkingSpace) {
            return res.status(404).json({ message: 'Espacio de estacionamiento no encontrado' });
        }

        // Check if parking space is occupied
        if (parkingSpace.state !== 'Ocupado') {
            return res.status(200).json({ message: 'El espacio de estacionamiento no está ocupado', parkingCost: 0 });
        }

        // Calculate elapsed time since entry
        const currentTime = new Date().getTime();
        const entryTime = new Date(parkingSpace.hour_date_entry).getTime();
        const elapsedTimeInSeconds = Math.floor((currentTime - entryTime) / 1000);

        // Get the last parking price
        const lastParkingPrice = await ParkingPrice.findOne().sort({ _id: -1 });
        if (!lastParkingPrice) {
            return next(createError(404, 'No se encontró el último precio de parqueo'));
        }

        // Calculate parking cost
        const parkingCost = calculateParkingCost(lastParkingPrice.price, elapsedTimeInSeconds);

        res.status(200).json({
            status: 'success',
            data: {
                parkingCost: parkingCost
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports.calculateParkingCost = calculateParkingCost;