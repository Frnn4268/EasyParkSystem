const ParkingSpace = require('../models/parkingSpaceModel.js');
const Customer = require('../models/customerModel.js');
const Vehicle = require('../models/vehicleModel.js');
const moment = require('moment');
const createError = require('../utils/appError');

// Controlador: Obtener todos los clientes totales por día
exports.getTotalCustomersPerDay = async (req, res, next) => {
    try {
        const totalCustomersPerDay = await Customer.aggregate([
            {
                $lookup: {
                    from: 'parkingspaces',
                    localField: '_id',
                    foreignField: 'customer',
                    as: 'parkingSpaces'
                }
            },
            {
                $unwind: '$parkingSpaces'
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$parkingSpaces.hour_date_entry" } },
                    totalCustomers: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } // Ordenar por fecha ascendente
        ]);

        res.status(200).json({ totalCustomersPerDay });
    } catch (error) {
        next(error);
    }
};

// Controlador: Otra para obtener toda la cantidad de veces que se han usado cada uno de los espacios de estacionamiento
exports.getParkingSpaceUsageCount = async (req, res, next) => {
    try {
        const parkingSpaceUsageCount = await ParkingSpace.aggregate([
            {
                $group: {
                    _id: "$parking_space_id",
                    usageCount: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } // Ordenar por id de espacio de estacionamiento
        ]);

        res.status(200).json({ parkingSpaceUsageCount });
    } catch (error) {
        next(error);
    }
};

// Controlador: Obtener el total de veces que se ha usado cada ID de espacio de estacionamiento
exports.getTotalUsageCountPerParkingSpace = async (req, res, next) => {
    try {
        const totalUsageCountPerParkingSpace = await ParkingSpace.aggregate([
            {
                $group: {
                    _id: "$parking_space_id",
                    totalUsageCount: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } // Ordenar por id de espacio de estacionamiento
        ]);

        res.status(200).json({ totalUsageCountPerParkingSpace });
    } catch (error) {
        next(error);
    }
};

// Controlador: Obtener los tiempos promedio de estacionado en cada uno de los ID de espacio de estacionamiento
exports.getAverageParkingTimePerParkingSpace = async (req, res, next) => {
    try {
        const averageParkingTimePerParkingSpace = await ParkingSpace.aggregate([
            {
                $group: {
                    _id: "$parking_space_id",
                    averageParkingTime: { $avg: { $subtract: ["$hour_date_output", "$hour_date_entry"] } }
                }
            },
            { $sort: { _id: 1 } } // Ordenar por id de espacio de estacionamiento
        ]);

        res.status(200).json({ averageParkingTimePerParkingSpace });
    } catch (error) {
        next(error);
    }
};

// Controlador: Obtener el tiempo promedio de estacionamiento de vehículos
exports.getAverageParkingTimeForVehicles = async (req, res, next) => {
    try {
        const parkingSpaces = await ParkingSpace.find({ hour_date_output: { $ne: null } });

        const parkingDurations = parkingSpaces.map(space => {
            const entryTime = new Date(space.hour_date_entry);
            const outputTime = new Date(space.hour_date_output);
            return outputTime - entryTime;
        });

        const averageParkingTime = parkingDurations.reduce((acc, cur) => acc + cur, 0) / parkingDurations.length;
        const averageParkingTimeInMinutes = averageParkingTime / (1000 * 60);

        res.status(200).json({ averageParkingTimeForVehicles: averageParkingTimeInMinutes });
    } catch (error) {
        next(error);
    }
};

// Controlador: Obtener el total de estados en ocupado y disponible
exports.getTotalOccupiedAndAvailableStates = async (req, res, next) => {
    try {
        const occupiedCount = await ParkingSpace.countDocuments({ state: 'Ocupado' });
        const availableCount = await ParkingSpace.countDocuments({ state: 'Disponible' });

        res.status(200).json({ occupiedCount, availableCount });
    } catch (error) {
        next(error);
    }
};

// Controlador: Obtener el total de clientes de hoy
exports.getTotalCustomersToday = async (req, res, next) => {
    try {
        const today = moment().startOf('day').toDate();

        const totalCustomersToday = await Customer.aggregate([
            {
                $lookup: {
                    from: 'parkingspaces',
                    localField: '_id',
                    foreignField: 'customer',
                    as: 'parkingSpaces'
                }
            },
            {
                $unwind: '$parkingSpaces'
            },
            {
                $match: {
                    'parkingSpaces.hour_date_entry': { $gte: today }
                }
            },
            {
                $group: {
                    _id: null,
                    totalCustomersToday: { $sum: 1 }
                }
            }
        ]);

        const total = totalCustomersToday.length > 0 ? totalCustomersToday[0].totalCustomersToday : 0;

        res.status(200).json({ totalCustomersToday: total });
    } catch (error) {
        next(error);
    }
};
