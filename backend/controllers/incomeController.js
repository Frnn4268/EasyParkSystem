const Income = require('../models/incomeModel');
const createError = require('../utils/appError');
const moment = require('moment');

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

// Get all week incomes
exports.getWeeklyIncome = async (req, res, next) => {
    try {
        const currentDate = moment();
        const startDate = currentDate.clone().startOf('week'); // Inicio de la semana actual
        const endDate = currentDate.clone().endOf('week'); // Fin de la semana actual

        const weeklyIncomes = await Income.aggregate([
            {
                $match: {
                    hour_date: { $gte: startDate.toDate(), $lte: endDate.toDate() } // Filtrar por la semana actual
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%A', date: '$hour_date' } // Convertir la fecha a nombre del día de la semana
                    },
                    totalIncome: { $sum: '$income' } // Sumar los ingresos diarios
                }
            }
        ]);

        res.status(200).json({ weeklyIncomes });
    } catch (error) {
        next(error);
    }
};

// Statistics Income 
exports.getFilteredIncome = async (req, res, next) => {
    try {
        const { filterType } = req.query;
        let groupByFormat = '';

        switch (filterType) {
            case 'weekly':
                groupByFormat = '%Y-%U'; // Agrupar por año y semana
                break;
            case 'monthly':
                groupByFormat = '%Y-%m'; // Agrupar por año y mes
                break;
            case 'annual':
                groupByFormat = '%Y'; // Agrupar por año
                break;
            default:
                throw new Error('Tipo de filtro no válido');
        }

        const filteredIncomes = await Income.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: groupByFormat, date: '$hour_date' } }, // Agrupar según el formato seleccionado
                    totalIncome: { $sum: '$income' } // Sumar los ingresos según el grupo
                }
            }
        ]);

        res.status(200).json({ filteredIncomes });
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
