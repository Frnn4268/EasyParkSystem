const mongoose = require('mongoose');
const Income = require('../src/models/incomeModel');
const { getIncomesGroupedByPeriod } = require('../src/controllers/incomeStatisticsController');
const createError = require('../src/utils/appError');

// Mocking the Income model and createError utility
jest.mock('../src/models/incomeModel');
jest.mock('../src/utils/appError');

// Test suite for the getIncomesGroupedByPeriod function
describe('incomeStatisticsController Unit Testing - Get Incomes Grouped By Period', () => {
    let req, res, next;

    // Setup mock request, response, and next function for each test
    beforeEach(() => {
        req = { params: { period: 'month' } };
        res = {
            status: jest.fn().mockReturnThis(), // Mock status method and enable chaining
            json: jest.fn(), // Mock json method to return response data
        };
        next = jest.fn(); // Mock next function for error handling
    });

    // Clear mocks after each test to avoid interference between tests
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test successful grouping of incomes by month
    it('should group incomes by month and return the result', async () => {
        const mockIncomes = [
            { _id: 1, totalIncome: 1000 },
            { _id: 2, totalIncome: 1500 }
        ];
        Income.aggregate.mockResolvedValue(mockIncomes); // Mock successful aggregation query

        await getIncomesGroupedByPeriod(req, res, next); // Call the controller method

        // Verify that Income.aggregate was called with the correct aggregation pipeline
        expect(Income.aggregate).toHaveBeenCalledWith([
            {
                $group: {
                    _id: { $month: '$hour_date' }, // Grouping by month
                    totalIncome: { $sum: '$income' } // Summing up the income for each group
                }
            },
            { $sort: { '_id': 1 } } // Sorting the result by month
        ]);

        // Verify that the response status is 200 and the response JSON contains the expected data
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

    // Test handling of an invalid period
    it('should handle an invalid period and return an error', async () => {
        const error = new Error('Período de agrupación no válido');
        createError.mockReturnValue(error); // Mock createError to return an Error object

        req.params.period = 'invalidPeriod'; // Set an invalid period in the request parameters

        await getIncomesGroupedByPeriod(req, res, next); // Call the controller method with the invalid period

        // Verify that createError was called with a 400 status and the error message
        expect(createError).toHaveBeenCalledWith(400, 'Período de agrupación no válido');
        
        // Verify that the next function was called with the mocked Error object
        expect(next).toHaveBeenCalledWith(error);
    });

    // Test handling of exceptions during the aggregation query
    it('should call next with an error if an exception occurs during aggregation', async () => {
        const error = new Error('Test Error');
        Income.aggregate.mockRejectedValue(error); // Mock the aggregate method to throw an error

        await getIncomesGroupedByPeriod(req, res, next); // Call the controller method, expecting it to handle the error

        // Verify that the next function was called with the error
        expect(next).toHaveBeenCalledWith(error);
    });
});