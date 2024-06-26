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

// Get the last income
exports.getLastIncome = async (req, res, next) => {
    try {
        const lastIncome = await Income.findOne().sort({ _id: -1 });
        if (!lastIncome) {
            return next(createError(404, 'No se encontraron ingresos'));
        }
        res.status(200).json({
            status: 'success',
            data: lastIncome
        });
    } catch (error) {
        next(error);
    }
};

// Create a new income
exports.createIncome = async (req, res, next) => {
    try {
        const { day, month, year, income } = req.body;
        const now = new Date(); 
        const newIncome = await Income.create({
            day: day,
            month: month,
            year: year,
            income: income,
            hour_date: now 
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
        const { day, month, year, hour_date, income } = req.body;
        const updatedIncome = await Income.findByIdAndUpdate(id, {
            day,
            month,
            year,
            hour_date,
            income
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
