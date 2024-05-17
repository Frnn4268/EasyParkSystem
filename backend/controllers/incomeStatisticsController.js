const Income = require('../models/incomeModel');
const createError = require('../utils/appError');

// Get incomes by week, month or year
exports.getIncomesGroupedByPeriod = async (req, res, next) => {
    try {
        const { period } = req.params;
        let groupBy;
        let dateFormat;

        switch (period) {
            case 'day':
                groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$hour_date' } };
                dateFormat = '%Y-%m-%d';
                break;
            case 'week':
                groupBy = {
                    $dateToString: {
                        format: '%Y-%U',
                        date: '$hour_date'
                    }
                };
                dateFormat = '%Y-%U';
                break;
            case 'month':
                groupBy = { $month: '$hour_date' }; 
                dateFormat = '%Y-%m';
                break;
            case 'year':
                groupBy = { $year: '$hour_date' };
                dateFormat = '%Y';
                break;
            default:
                return next(createError(400, 'Período de agrupación no válido'));
        }

        let incomes = await Income.aggregate([
            {
                $group: {
                    _id: groupBy,
                    totalIncome: { $sum: '$income' }
                }
            },
            {
                $sort: { '_id': 1 } 
            }
        ]);

        if (period === 'week') {
            incomes = incomes.slice(0, 10);
        }

        incomes.forEach(income => {
            switch (period) {
                case 'day':
                    income._id = new Date(income._id).toISOString().slice(0, 10);
                    break;
                case 'week':
                    income._id = `Week ${income._id}`;
                    break;
                case 'month':
                    income._id = `Month ${income._id}`;
                    break;
                case 'year':
                    income._id = `Year ${income._id}`;
                    break;
            }
        });

        if (period === 'month') {
            const requiredMonths = 12;
            let monthIncomes = new Array(requiredMonths).fill({ _id: null, totalIncome: 0 });
            for (let i = 1; i <= requiredMonths; i++) {
                const monthIndex = i - 1;
                monthIncomes[monthIndex] = incomes.find(income => income._id === `Month ${i}`) || { _id: `Month ${i}`, totalIncome: 0 };
            }
            incomes = monthIncomes;
        } else if (period === 'year') {
            const currentYear = new Date().getFullYear();
            const startYear = 2015;
            const requiredYears = currentYear - startYear + 1;
            let yearIncomes = new Array(requiredYears).fill({ _id: null, totalIncome: 0 });
            for (let i = currentYear; i >= startYear; i--) {
                const yearIndex = currentYear - i;
                yearIncomes[yearIndex] = incomes.find(income => income._id === `Year ${i}`) || { _id: `Year ${i}`, totalIncome: 0 };
            }
            incomes = yearIncomes;
        }

        res.status(200).json({
            status: 'success',
            data: incomes
        });
    } catch (error) {
        next(error);
    }
};