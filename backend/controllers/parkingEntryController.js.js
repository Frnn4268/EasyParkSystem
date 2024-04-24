const ParkingSpace = require('../models/parkingSpaceModel.js');
const Customer = require('../models/customerModel.js');
const Vehicle = require('../models/vehicleModel.js');

exports.getAllParkingSpaces = async (req, res, next) => {
    try {
        const parkingSpaces = await ParkingSpace.find();

        res.status(200).json({ parkingSpaces });
    } catch (error) {
        next(error);
    }
};

exports.getAllLatestParkingSpaces = async (req, res, next) => {
    try {
        const latestParkingSpaces = await ParkingSpace.aggregate([
            { $sort: { hour_date_entry: -1 } },
            { $group: { _id: "$parking_space_id", latestEntry: { $first: "$$ROOT" } } } 
        ]);

        const formattedParkingSpaces = latestParkingSpaces.map(space => ({
            parking_space_id: space.latestEntry.parking_space_id,
            state: space.latestEntry.state,
            hour_date_entry: space.latestEntry.hour_date_entry
        }));

        res.status(200).json({ parkingSpaces: formattedParkingSpaces });
    } catch (error) {
        next(error);
    }
};

exports.getParkingSpaceById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const parkingSpace = await ParkingSpace.findOne({ parking_space_id: id }).sort({ hour_date_entry: -1 });

        if (!parkingSpace) {
            return res.status(404).json({ message: 'Espacio de estacionamiento no encontrado' });
        }

        res.status(200).json({ parkingSpace });
    } catch (error) {
        next(error);
    }
};

exports.parkingEntryCreate = async (req, res, next) => {
    try {
        const { customerData, vehicleData } = req.body;

        const parkingSpace = new ParkingSpace({
            state: 'Ocupado', 
            hour_date_entry: new Date(), 
            ...req.body.parkingSpaceData 
        });

        await parkingSpace.save();

        const customer = new Customer(customerData);
        await customer.save();

        vehicleData.CustomerId = customer._id;

        const vehicle = new Vehicle(vehicleData);
        await vehicle.save();

        await ParkingSpace.findByIdAndUpdate(parkingSpace._id, { vehicleId: vehicle._id });

        res.status(201).json({ message: 'Datos guardados exitosamente' });
    } catch (error) {
        next(error);
    }
};

exports.parkingOutputEdit = async (req, res, next) => {
    try {
        const { id } = req.params; 
        const { state } = req.body;

        const parkingSpaces = await ParkingSpace.find({ parking_space_id: id }).sort({ hour_date_entry: -1 });

        if (!parkingSpaces || parkingSpaces.length === 0) {
            return res.status(404).json({ message: 'Espacio de estacionamiento no encontrado' });
        }

        const lastParkingSpace = parkingSpaces[0];

        lastParkingSpace.state = state;
        lastParkingSpace.hour_date_output = new Date();

        const timeDifference = lastParkingSpace.hour_date_output - lastParkingSpace.hour_date_entry;
        lastParkingSpace.timed_parking_space = new Date(timeDifference);

        await lastParkingSpace.save();

        res.status(200).json({ message: 'Estado del espacio de estacionamiento actualizado exitosamente', updatedParkingSpace: lastParkingSpace });
    } catch (error) {
        next(error);
    }
};

exports.deleteParkingSpace = async (req, res, next) => {
    try {
        const { id } = req.params; 

        const deletedParkingSpace = await ParkingSpace.findByIdAndDelete(id);

        if (!deletedParkingSpace) {
            return res.status(404).json({ message: 'Espacio de estacionamiento no encontrado' });
        }

        res.status(200).json({ message: 'Espacio de estacionamiento eliminado exitosamente' });
    } catch (error) {
        next(error);
    }
};