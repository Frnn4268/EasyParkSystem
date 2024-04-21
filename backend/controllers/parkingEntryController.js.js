const ParkingSpace = require('../models/parkingSpaceModel.js');
const Client = require('../models/clientModel.js');
const Vehicle = require('../models/vehicleModel.js');

exports.parkingEntryCreate = async (req, res, next) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { clientData, vehicleData } = req.body;

        // Crear una instancia de ParkingSpace con la fecha y hora de entrada automáticas
        const parkingSpace = new ParkingSpace({
            state: 'Ocupado', // Definir el estado como 'Ocupado' por defecto
            hour_date_entry: new Date(), // Agregar la fecha y hora de entrada automáticamente
            ...req.body.parkingSpaceData // Mantener otros datos proporcionados en el cuerpo de la solicitud
        });

        // Guardar el espacio de estacionamiento en la base de datos
        await parkingSpace.save();

        // Crear una instancia de Client con los datos proporcionados
        const client = new Client(clientData);
        // Guardar el cliente en la base de datos
        await client.save();

        // Agregar el id del cliente al vehículo
        vehicleData.clientId = client._id;

        // Crear una instancia de Vehicle con los datos proporcionados
        const vehicle = new Vehicle(vehicleData);
        // Guardar el vehículo en la base de datos
        await vehicle.save();

        // Actualizar el espacio de estacionamiento con el id del vehículo
        await ParkingSpace.findByIdAndUpdate(parkingSpace._id, { vehicleId: vehicle._id });

        res.status(201).json({ message: 'Datos guardados exitosamente' });
    } catch (error) {
        next(error);
    }
};
