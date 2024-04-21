const Customer = require('../models/customerModel');
const createError = require('../utils/appError');

// Get all customers
exports.getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            status: 'success',
            data: customers
        });
    } catch (error) {
        next(error);
    }
};

// Update a customer
exports.updateCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { firstname_owner, lastname_owner, phone_number } = req.body;
        const updatedCustomer = await Customer.findByIdAndUpdate(id, {
            firstname_owner,
            lastname_owner,
            phone_number,
        }, { new: true });
        if (!updatedCustomer) {
            return next(createError(404, 'Cliente no encontrado'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Cliente actualizado exitosamente!',
            data: updatedCustomer
        });
    } catch (error) {
        next(error);
    }
};

// Delete a customer
exports.deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
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
