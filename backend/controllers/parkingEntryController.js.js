const ParkingSpace = require('../models/parkingSpaceModel.js');
const Client = require('../models/clientModel.js');
const Vehicle = require('../models/vehicleModel.js');

exports.getAllParkingSpaces = async (req, res, next) => {
    try {
        const parkingSpaces = await ParkingSpace.find();

        res.status(200).json({ parkingSpaces });
    } catch (error) {
        next(error);
    }
};

exports.parkingEntryCreate = async (req, res, next) => {
    try {
        const { clientData, vehicleData } = req.body;

        const parkingSpace = new ParkingSpace({
            state: 'Ocupado', 
            hour_date_entry: new Date(), 
            ...req.body.parkingSpaceData 
        });

        await parkingSpace.save();

        const client = new Client(clientData);
        await client.save();

        vehicleData.clientId = client._id;

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

        const updatedParkingSpace = await ParkingSpace.findByIdAndUpdate(
            id,
            {
                state,
                hour_date_output: new Date(), 
            },
            { new: true } 
        );

        const timeDifference = updatedParkingSpace.hour_date_output - updatedParkingSpace.hour_date_entry;

        updatedParkingSpace.timed_parking_space = new Date(timeDifference);

        await updatedParkingSpace.save();

        if (!updatedParkingSpace) {
            return res.status(404).json({ message: 'Espacio de estacionamiento no encontrado' });
        }

        res.status(200).json({ message: 'Estado del espacio de estacionamiento actualizado exitosamente', updatedParkingSpace });
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