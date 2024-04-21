const ParkingSpace = require('../models/parkingSpaceModel');
const Client = require('../models/clientModel');
const Vehicle = require('../models/vehicleModel');

const createParkingEntry = async (req, res) => {
    try {
        // Crear el objeto de espacio de estacionamiento
        const parkingSpace = new ParkingSpace({
            state: 'Ocupado' // Supongamos que el estado predeterminado es ocupado
        });

        // Guardar el espacio de estacionamiento en la base de datos
        const savedParkingSpace = await parkingSpace.save();

        // Crear el objeto de cliente
        const client = new Client({
            license_plate: req.body.client_license_plate,
            type: req.body.client_type,
            firstname_owner: req.body.client_firstname_owner,
            lastname_owner: req.body.client_lastname_owner
        });

        // Guardar el cliente en la base de datos
        const savedClient = await client.save();

        // Crear el objeto de vehículo
        const vehicle = new Vehicle({
            license_plate: req.body.vehicle_license_plate,
            type: req.body.vehicle_type,
            hour_date_entry: req.body.vehicle_hour_date_entry,
            timed_parking_space: req.body.vehicle_timed_parking_space,
            id_parking_space: savedParkingSpace._id, // Establecer la relación con el espacio de estacionamiento guardado
        });

        // Guardar el vehículo en la base de datos
        const savedVehicle = await vehicle.save();

        // Devolver una respuesta exitosa con los datos guardados
        res.status(201).json({
            message: 'Entrada de estacionamiento creada exitosamente',
            parkingSpace: savedParkingSpace,
            client: savedClient,
            vehicle: savedVehicle
        });
    } catch (error) {
        // Manejar errores
        console.error('Error creating parking entry:', error);
        res.status(500).json({ error: 'Error creating parking entry' });
    }
};

module.exports = { createParkingEntry };
