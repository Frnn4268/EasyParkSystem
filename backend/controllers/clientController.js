const Client = require('../models/clientModel');
const createError = require('../utils/appError');

// Get all clients
exports.getAllClients = async (req, res, next) => {
    try {
        const clients = await Client.find();
        res.status(200).json({
            status: 'success',
            data: clients
        });
    } catch (error) {
        next(error);
    }
};

// Create new client
exports.createClient = async (req, res, next) => {
    try {
        const { placa, tipo, nombre_propietario, apellido_propietario } = req.body;
        const newClient = new Client({
            placa,
            tipo,
            nombre_propietario,
            apellido_propietario
        });
        await newClient.save();
        res.status(201).json({
            status: 'success',
            message: 'Cliente creado exitosamente!',
            data: newClient
        });
    } catch (error) {
        next(error);
    }
};

// Update a client
exports.updateClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { placa, tipo, nombre_propietario, apellido_propietario } = req.body;
        const updatedClient = await Client.findByIdAndUpdate(id, {
            placa,
            tipo,
            nombre_propietario,
            apellido_propietario
        }, { new: true });
        if (!updatedClient) {
            return next(createError(404, 'Cliente no encontrado'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Cliente actualizado exitosamente!',
            data: updatedClient
        });
    } catch (error) {
        next(error);
    }
};

// Delete a client
exports.deleteClient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedClient = await Client.findByIdAndDelete(id);
        if (!deletedClient) {
            return next(createError(404, 'Cliente no encontrado'));
        }
        res.status(204).json({
            status: 'success',
            message: 'Cliente eliminado exitosamente!',
            data: null
        });
    } catch (error) {
        next(error);
    }
};
