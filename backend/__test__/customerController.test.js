const Customer = require('../src/models/customerModel');
const ParkingSpace = require('../src/models/parkingSpaceModel.js');
const createError = require('../src/utils/appError');
const customerController = require('../src/controllers/customerController');

// Mock the required modules
jest.mock('../src/models/customerModel');
jest.mock('../src/models/parkingSpaceModel.js');
jest.mock('../src/utils/appError');

// Test suite for the Customer Controller
describe('customerController Unit Testing - Customer Controller', () => {
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

    // Test suite for getAllCustomers function
    describe('customerController - getAllCustomers', () => {
        // Test successful retrieval of all customers
        it('should retrieve and return all customers', async () => {
            const customers = [{ firstname_owner: 'John', lastname_owner: 'Doe', phone_number: '123456789' }];
            Customer.find.mockResolvedValueOnce(customers); // Mock successful database retrieval

            await customerController.getAllCustomers(req, res, next); // Call the controller method

            expect(Customer.find).toHaveBeenCalled(); // Verify that Customer.find was called
            expect(res.status).toHaveBeenCalledWith(200); // Verify that status 200 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: customers
            }); // Verify that correct data was returned in response
        });

        // Test error handling during retrieval of customers
        it('should handle errors during retrieval of customers', async () => {
            const error = new Error('Database error');
            Customer.find.mockRejectedValueOnce(error); // Mock a database error

            await customerController.getAllCustomers(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    // Test suite for updateCustomer function
    describe('customerController - updateCustomer', () => {
        // Test successful update of an existing customer
        it('should update an existing customer and return it', async () => {
            const updatedCustomer = { firstname_owner: 'Jane', lastname_owner: 'Doe', phone_number: '987654321' };
            const id = '123';
            req.params = { id };
            req.body = updatedCustomer;
            Customer.findByIdAndUpdate.mockResolvedValueOnce(updatedCustomer); // Mock successful customer update

            await customerController.updateCustomer(req, res, next);

            expect(Customer.findByIdAndUpdate).toHaveBeenCalledWith(id, updatedCustomer, { new: true }); // Verify that update method was called with correct parameters
            expect(res.status).toHaveBeenCalledWith(200); // Verify that status 200 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Cliente actualizado exitosamente!',
                data: updatedCustomer
            }); // Verify that correct data was returned in response
        });

        // Test handling of customer not found during update
        it('should handle customer not found during update', async () => {
            const id = '123';
            req.params = { id };
            req.body = { firstname_owner: 'Jane', lastname_owner: 'Doe', phone_number: '987654321' };
            Customer.findByIdAndUpdate.mockResolvedValueOnce(null); // Mock a case where customer is not found

            await customerController.updateCustomer(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'Cliente no encontrado')); // Verify that a 404 error was passed to next()
        });

        // Test error handling during update of a customer
        it('should handle errors during update of a customer', async () => {
            const error = new Error('Database error');
            const id = '123';
            req.params = { id };
            req.body = { firstname_owner: 'Jane', lastname_owner: 'Doe', phone_number: '987654321' };
            Customer.findByIdAndUpdate.mockRejectedValueOnce(error); // Mock a database error during customer update

            await customerController.updateCustomer(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    // Test suite for deleteCustomer function
    describe('customerController - deleteCustomer', () => {
        // Test successful deletion of a customer
        it('should delete a customer and return success', async () => {
            const id = '123';
            req.params = { id };
            const deletedCustomer = { firstname_owner: 'Jane', lastname_owner: 'Doe', phone_number: '987654321' };
            ParkingSpace.findOne.mockResolvedValueOnce(null); // Mock no parking space associated with the customer
            Customer.findByIdAndDelete.mockResolvedValueOnce(deletedCustomer); // Mock successful customer deletion

            await customerController.deleteCustomer(req, res, next);

            expect(ParkingSpace.findOne).toHaveBeenCalledWith({ customer: id }); // Verify that ParkingSpace.findOne was called with correct id
            expect(Customer.findByIdAndDelete).toHaveBeenCalledWith(id); // Verify that the delete method was called with correct id
            expect(res.status).toHaveBeenCalledWith(204); // Verify that status 204 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Cliente eliminado exitosamente!',
                data: null
            }); // Verify that correct response was returned
        });

        // Test handling of customer associated with parking space
        it('should handle customer associated with parking space', async () => {
            const id = '123';
            req.params = { id };
            ParkingSpace.findOne.mockResolvedValueOnce({ customer: id }); // Mock a case where customer is associated with a parking space

            await customerController.deleteCustomer(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(createError)); // Verify that a createError was passed to next()
        });

        // Test handling of customer not found during deletion
        it('should handle customer not found during deletion', async () => {
            const id = '123';
            req.params = { id };
            ParkingSpace.findOne.mockResolvedValueOnce(null); // Mock no parking space associated with the customer
            Customer.findByIdAndDelete.mockResolvedValueOnce(null); // Mock a case where customer is not found

            await customerController.deleteCustomer(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'Cliente no encontrado')); // Verify that a 404 error was passed to next()
        });

        // Test error handling during deletion of a customer
        it('should handle errors during deletion of a customer', async () => {
            const error = new Error('Database error');
            const id = '123';
            req.params = { id };
            ParkingSpace.findOne.mockResolvedValueOnce(null); // Mock no parking space associated with the customer
            Customer.findByIdAndDelete.mockRejectedValueOnce(error); // Mock a database error during customer deletion

            await customerController.deleteCustomer(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });
});