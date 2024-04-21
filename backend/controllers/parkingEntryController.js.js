const ParkingSpace = require('../models/parkingSpaceModel.js');
const Client = require('../models/clientModel.js');
const Vehicle = require('../models/vehicleModel.js');

exports.getAllParkingSpaces = async (req, res, next) => {
    try {
        // Obtener todos los espacios de estacionamiento de la base de datos
        const parkingSpaces = await ParkingSpace.find();

        res.status(200).json({ parkingSpaces });
    } catch (error) {
        next(error);
    }
};

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

exports.parkingOutputEdit = async (req, res, next) => {
    try {
        const { id } = req.params; // Obtener el ID del espacio de estacionamiento desde los parámetros de la solicitud
        const { state } = req.body; // Obtener el nuevo estado del espacio de estacionamiento desde el cuerpo de la solicitud

        // Buscar el espacio de estacionamiento por su ID y actualizar su estado y hora de salida
        const updatedParkingSpace = await ParkingSpace.findByIdAndUpdate(
            id,
            {
                state,
                hour_date_output: new Date(), // Actualizar la hora de salida automáticamente
            },
            { new: true } // Devolver el documento actualizado
        );

        // Calcular la diferencia de tiempo entre la hora de entrada y la hora de salida
        const timeDifference = updatedParkingSpace.hour_date_output - updatedParkingSpace.hour_date_entry;

        // Actualizar el tiempo de estacionamiento con la diferencia de tiempo calculada
        updatedParkingSpace.timed_parking_space = new Date(timeDifference);

        // Guardar los cambios en el espacio de estacionamiento
        await updatedParkingSpace.save();

        // Verificar si el espacio de estacionamiento fue encontrado y actualizado
        if (!updatedParkingSpace) {
            return res.status(404).json({ message: 'Espacio de estacionamiento no encontrado' });
        }

        res.status(200).json({ message: 'Estado del espacio de estacionamiento actualizado exitosamente', updatedParkingSpace });
    } catch (error) {
        next(error);
    }
};