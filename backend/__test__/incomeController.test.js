const Income = require('../src/models/incomeModel');
const createError = require('../src/utils/appError');
const incomeController = require('../src/controllers/incomeController');

// Mock the required modules
jest.mock('../src/models/incomeModel');
jest.mock('../src/utils/appError');

// Test suite for the Income Controller
describe('incomeController Unit Testing - Income Controller', () => {
    let req, res, next;

    // Setup mock request, response, and next function for each test
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(), // Mock status method and enable chaining
            json: jest.fn(), // Mock json method to return response data
        };
        next = jest.fn(); // Mock next function for error handling
    });

    // Test suite for getAllIncomes function
    describe('incomeController - getAllIncomes', () => {
        // Test successful retrieval of all incomes
        it('should retrieve and return all incomes', async () => {
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

        // Test error handling during retrieval of incomes
        it('should handle errors during retrieval of incomes', async () => {
            const error = new Error('Database error');
            Income.find.mockRejectedValueOnce(error); // Mock a database error

            await incomeController.getAllIncomes(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    // Test suite for getLastIncome function
    describe('incomeController - getLastIncome', () => {
        // Test successful retrieval of the last income
        it('should retrieve and return the last income', async () => {
            const lastIncome = { day: 1, month: 1, year: 2024, income: 1000 };
            
            // Mock the findOne method to return an object with a sort function
            Income.findOne.mockImplementationOnce(() => ({
                sort: jest.fn().mockResolvedValue(lastIncome),
            }));
    
            await incomeController.getLastIncome(req, res, next);
    
            expect(Income.findOne).toHaveBeenCalledWith(); // Verify that Income.findOne was called
            expect(res.status).toHaveBeenCalledWith(200); // Verify that status 200 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: lastIncome,
            });
        });
    
        // Test handling of no incomes found
        it('should handle no incomes found', async () => {
            // Mock findOne to return an object with a sort function returning null
            Income.findOne.mockImplementationOnce(() => ({
                sort: jest.fn().mockResolvedValue(null),
            }));
    
            await incomeController.getLastIncome(req, res, next);
    
            expect(next).toHaveBeenCalledWith(createError(404, 'No se encontraron ingresos')); // Verify that a 404 error was passed to next()
        });
    });

    // Test suite for createIncome function
    describe('incomeController - createIncome', () => {
        // Test successful creation of a new income
        it('should create a new income and return it', async () => {
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

        // Test error handling during creation of a new income
        it('should handle errors during creation of a new income', async () => {
            const error = new Error('Database error');
            Income.create.mockRejectedValueOnce(error); // Mock a database error during income creation

            req.body = { day: 1, month: 1, year: 2024, income: 1000 };

            await incomeController.createIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    // Test suite for updateIncome function
    describe('incomeController - updateIncome', () => {
        // Test successful update of an existing income
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

        // Test handling of income not found during update
        it('should handle income not found during update', async () => {
            const id = '123';
            req.params = { id };
            req.body = { day: 2, month: 2, year: 2024, income: 2000 };
            Income.findByIdAndUpdate.mockResolvedValueOnce(null); // Mock case where income is not found

            await incomeController.updateIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'No se encontraron ingresos')); // Verify that a 404 error was passed to next()
        });

        // Test error handling during update of an income
        it('should handle errors during update of an income', async () => {
            const error = new Error('Database error');
            const id = '123';
            req.params = { id };
            req.body = { day: 2, month: 2, year: 2024, income: 2000 };
            Income.findByIdAndUpdate.mockRejectedValueOnce(error); // Mock a database error during income update

            await incomeController.updateIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    // Test suite for deleteIncome function
    describe('incomeController - deleteIncome', () => {
        // Test successful deletion of an income
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

        // Test handling of income not found during deletion
        it('should handle income not found during deletion', async () => {
            const id = '123';
            req.params = { id };
            Income.findByIdAndDelete.mockResolvedValueOnce(null); // Mock case where income is not found

            await incomeController.deleteIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'No se encontraron ingresos')); // Verify that a 404 error was passed to next()
        });

        // Test error handling during deletion of an income
        it('should handle errors during deletion of an income', async () => {
            const error = new Error('Database error');
            const id = '123';
            req.params = { id };
            Income.findByIdAndDelete.mockRejectedValueOnce(error); // Mock a database error during income deletion

            await incomeController.deleteIncome(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });
});