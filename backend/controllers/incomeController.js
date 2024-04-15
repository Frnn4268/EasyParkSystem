const Income = require('../models/incomeModel');
const createError = require('../utils/appError');

// Get all incomes 
exports.getAllIncomes = async (req, res, next) => {
    try {
        const incomes = await Income.find();
        res.status(200).json({
            status: 'success',
            data: incomes
        });
    } catch (error) {
        next(error);
    }
};

// Create a new income
exports.createIncome = async (req, res, next) => {
    try {
        const { día, mes, año, fecha_hora, monto } = req.body;
        const newIncome = await Income.create({
            día,
            mes,
            año,
            fecha_hora,
            monto
        });
        res.status(201).json({
            status: 'success',
            message: 'Ingreso creado exitosamente!',
            data: newIncome
        });
    } catch (error) {
        next(error);
    }
};

// Update a income
exports.updateIncome = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { día, mes, año, fecha_hora, monto } = req.body;
        const updatedIncome = await Income.findByIdAndUpdate(id, {
            día,
            mes,
            año,
            fecha_hora,
            monto
        }, { new: true });
        if (!updatedIncome) {
            return next(createError(404, 'Ingreso no encontrado'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Ingreso actualizado exitosamente!',
            data: updatedIncome
        });
    } catch (error) {
        next(error);
    }
};

// Delete a income
exports.deleteIncome = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedIncome = await Income.findByIdAndDelete(id);
        if (!deletedIncome) {
            return next(createError(404, 'Ingreso no encontrado'));
        }
        res.status(204).json({
            status: 'success',
            message: 'Ingreso eliminado exitosamente!',
            data: null
        });
    } catch (error) {
        next(error);
    }
};
