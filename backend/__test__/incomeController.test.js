const Income = require('../src/models/incomeModel');
const creatError = require('../src/utils/appError');
const incomeController = require('../src/controllers/incomeController');

// Mock the required modules
jest.mock('../src/models/incomeModel');
jest.mock('../src/utils/appError');

describe('Income Controller', () => {
    let req, res, next;

    beforeEach(() => {
        // Setup mock request, response, and next function for each test
        req = {};
        res = {
            status: jest.fn().mockReturnThis(), // Mock status method and enable chaining
            json: jest.fn(), // Mock json method to return response data
        };
        next = jest.fn(); // Mock next function for error handling
    });

    describe('getAllIncomes', () => {
        it('should return all incomes', async () => {
            const incomes = [{ day: 1, month: 1, year: 2024, income: 1000 }];
            Income.find.mockResolvedValueOnce(incomes); // Mock successful database retrieval

            await incomeController.getAllIncomes(req, res, next); // Call the controller method

            expect(Income.find).toHaveBeenCalled(); // Verify that Income.find was called
            expect(res.status).toHaveBeenCalledWith(200); // Verify that status 200 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: incomes
            }); // Verify that correct data was returned in response
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            Income.find.mockRejectedValueOnce(error); // Mock a database error

            await incomeController.getAllIncomes(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    describe('getLastIncome', () => {
        it('should return the last income', async () => {
            const lastIncome = { day: 1, month: 1, year: 2024, income: 1000 };
            Income.findOne.mockResolvedValueOnce(lastIncome); // Mock successful retrieval of last income

            await incomeController.getLastIncome(req, res, next);

            expect(Income.findOne).toHaveBeenCalledWith(); // Verify that Income.findOne was called
            expect(res.status).toHaveBeenCalledWith(200); // Verify that status 200 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: lastIncome
            }); // Verify that correct data was returned in response
        });

        it('should handle no incomes found', async () => {
            Income.findOne.mockResolvedValueOnce(null); // Mock case where no income is found

            await incomeController.getLastIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(creatError(404, 'No se encontraron ingresos')); // Verify that a 404 error was passed to next()
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            Income.findOne.mockRejectedValueOnce(error); // Mock a database error

            await incomeController.getLastIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    describe('createIncome', () => {
        it('should create a new income', async () => {
            const newIncome = { day: 1, month: 1, year: 2024, income: 1000, hour_date: new Date() };
            req.body = { day: 1, month: 1, year: 2024, income: 1000 };
            Income.create.mockResolvedValueOnce(newIncome); // Mock successful creation of income

            await incomeController.createIncome(req, res, next);

            expect(Income.create).toHaveBeenCalledWith({
                day: 1,
                month: 1,
                year: 2024,
                income: 1000,
                hour_date: expect.any(Date)
            }); // Verify that create method was called with correct parameters
            expect(res.status).toHaveBeenCalledWith(201); // Verify that status 201 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Ingreso creado exitosamente!',
                data: newIncome
            }); // Verify that correct data was returned in response
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            Income.create.mockRejectedValueOnce(error); // Mock a database error

            await incomeController.createIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    describe('updateIncome', () => {
        it('should update an existing income and return it', async () => {
            const updatedIncome = { day: 2, month: 2, year: 2024, income: 2000, hour_date: new Date() };
            const id = '123';
            req.params = { id };
            req.body = updatedIncome;
            Income.findByIdAndUpdate.mockResolvedValueOnce(updatedIncome); // Mock successful income update

            await incomeController.updateIncome(req, res, next);

            expect(Income.findByIdAndUpdate).toHaveBeenCalledWith(id, updatedIncome, { new: true }); // Verify that update method was called with correct parameters
            expect(res.status).toHaveBeenCalledWith(200); // Verify that status 200 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Ingreso actualizado exitosamente!',
                data: updatedIncome
            }); // Verify that correct data was returned in response
        });

        it('should handle income not found', async () => {
            const id = '123';
            req.params = { id };
            req.body = { day: 2, month: 2, year: 2024, income: 2000 };
            Income.findByIdAndUpdate.mockResolvedValueOnce(null); // Mock case where income is not found

            await incomeController.updateIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'No se encontraron ingresos')); // Verify that a 404 error was passed to next()
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            const id = '123';
            req.params = { id };
            req.body = { day: 2, month: 2, year: 2024, income: 2000 };
            Income.findByIdAndUpdate.mockRejectedValueOnce(error); // Mock a database error

            await incomeController.updateIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    describe('deleteIncome', () => {
        it('should delete an income and return success', async () => {
            const id = '123';
            req.params = { id };
            const deletedIncome = { day: 2, month: 2, year: 2024, income: 2000 };
            Income.findByIdAndDelete.mockResolvedValueOnce(deletedIncome); // Mock successful deletion of income

            await incomeController.deleteIncome(req, res, next);

            expect(Income.findByIdAndDelete).toHaveBeenCalledWith(id); // Verify that delete method was called with correct id
            expect(res.status).toHaveBeenCalledWith(204); // Verify that status 204 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Ingreso eliminado exitosamente!',
                data: null
            }); // Verify that correct response was returned
        });

        it('should handle income not found', async () => {
            const id = '123';
            req.params = { id };
            Income.findByIdAndDelete.mockResolvedValueOnce(null); // Mock case where income is not found

            await incomeController.deleteIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'No se encontraron ingresos')); // Verify that a 404 error was passed to next()
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            const id = '123';
            req.params = { id };
            Income.findByIdAndDelete.mockRejectedValueOnce(error); // Mock a database error

            await incomeController.deleteIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });
});
