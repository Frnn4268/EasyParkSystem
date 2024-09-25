const mongoose = require('mongoose');
const Income = require('../src/models/incomeModel');
const { getIncomesGroupedByPeriod } = require('../src/controllers/incomeStatisticsController');
const createError = require('../src/utils/appError');

// Mocking the Income model and createError utility
jest.mock('../src/models/incomeModel');
jest.mock('../src/utils/appError');

describe('getIncomesGroupedByPeriod', () => {
    let req, res, next;

    beforeEach(() => {
      // Setting up mock request, response, and next function
      req = { params: { period: 'month' } };
      res = {
          status: jest.fn().mockReturnThis(), // Mocking res.status to return the response object itself
          json: jest.fn() // Mocking res.json to capture the JSON response
      };
      next = jest.fn(); // Mocking next function for error handling
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clearing mocks after each test to avoid interference between tests
    });

    it('should group incomes by month', async () => {
        // Mocking the result of the aggregation query
        const mockIncomes = [
          { _id: 1, totalIncome: 1000 },
          { _id: 2, totalIncome: 1500 }
        ];
        Income.aggregate.mockResolvedValue(mockIncomes);

        // Calling the controller method with mocked request, response, and next
        await getIncomesGroupedByPeriod(req, res, next);

        // Verifying that the Income.aggregate method was called with the correct aggregation pipeline
        expect(Income.aggregate).toHaveBeenCalledWith([
            {
                $group: {
                    _id: { $month: '$hour_date' }, // Grouping by month
                    totalIncome: { $sum: '$income' } // Summing up the income for each group
                }
            },
            { $sort: { '_id': 1 } } // Sorting the result by month
        ]);

        // Verifying that the response status is 200 and the response JSON contains the expected data
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: [
                { _id: 'Month 1', totalIncome: 1000 },
                { _id: 'Month 2', totalIncome: 1500 },
                { _id: 'Month 3', totalIncome: 0 },
                { _id: 'Month 4', totalIncome: 0 },
                { _id: 'Month 5', totalIncome: 0 },
                { _id: 'Month 6', totalIncome: 0 },
                { _id: 'Month 7', totalIncome: 0 },
                { _id: 'Month 8', totalIncome: 0 },
                { _id: 'Month 9', totalIncome: 0 },
                { _id: 'Month 10', totalIncome: 0 },
                { _id: 'Month 11', totalIncome: 0 },
                { _id: 'Month 12', totalIncome: 0 }
            ]
        });
    });

    it('should handle an invalid period', async () => {
        // Mock the createError function to return an Error object
        const error = new Error('Período de agrupación no válido');
        createError.mockReturnValue(error);

        // Setting an invalid period in the request parameters
        req.params.period = 'invalidPeriod';

        // Calling the controller method with the invalid period
        await getIncomesGroupedByPeriod(req, res, next);

        // Verifying that createError was called with a 400 status and the error message
        expect(createError).toHaveBeenCalledWith(400, 'Período de agrupación no válido');
        
        // Verifying that the next function was called with the mocked Error object
        expect(next).toHaveBeenCalledWith(error);
    });

    it('should call next with an error if an exception occurs', async () => {
        // Mocking the aggregate method to throw an error
        const error = new Error('Test Error');
        Income.aggregate.mockRejectedValue(error);

        // Calling the controller method, expecting it to handle the error
        await getIncomesGroupedByPeriod(req, res, next);

        // Verifying that the next function was called with the error
        expect(next).toHaveBeenCalledWith(error);
    });
});
