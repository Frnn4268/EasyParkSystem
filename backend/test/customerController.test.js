const Customer = require('../src/models/customerModel'); 
const ParkingSpace = require('../src/models/parkingSpaceModel.js'); 
const createError = require('../src/utils/appError');
const customerController = require('../src/controllers/customerController'); // Importa el controlador correctamente

// Mock the required modules
jest.mock('../src/models/customerModel');
jest.mock('../src/models/parkingSpaceModel.js');
jest.mock('../src/utils/appError');

describe('Customer Controller', () => {
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

    describe('getAllCustomers', () => {
        it('should return all customers', async () => {
            const customers = [{ firstname_owner: 'John', lastname_owner: 'Doe', phone_number: '123456789' }];
            Customer.find.mockResolvedValueOnce(customers); // Mock successful database retrieval

            await customerController.getAllCustomers(req, res, next); // Llama al controlador correctamente

            expect(Customer.find).toHaveBeenCalled(); // Verify that Customer.find was called
            expect(res.status).toHaveBeenCalledWith(200); // Verify that status 200 was sent
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: customers
            }); // Verify that correct data was returned in response
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            Customer.find.mockRejectedValueOnce(error); // Mock a database error

            await customerController.getAllCustomers(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    describe('updateCustomer', () => {
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

        it('should handle customer not found', async () => {
            const id = '123';
            req.params = { id };
            req.body = { firstname_owner: 'Jane', lastname_owner: 'Doe', phone_number: '987654321' };
            Customer.findByIdAndUpdate.mockResolvedValueOnce(null); // Mock a case where customer is not found

            await customerController.updateCustomer(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'Cliente no encontrado')); // Verify that a 404 error was passed to next()
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            const id = '123';
            req.params = { id };
            req.body = { firstname_owner: 'Jane', lastname_owner: 'Doe', phone_number: '987654321' };
            Customer.findByIdAndUpdate.mockRejectedValueOnce(error); // Mock a database error during customer update

            await customerController.updateCustomer(req, res, next);

            expect(next).toHaveBeenCalledWith(error); // Verify that the error was passed to next()
        });
    });

    describe('deleteCustomer', () => {
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

        it('should handle customer associated with parking space', async () => {
            const id = '123';
            req.params = { id };
            ParkingSpace.findOne.mockResolvedValueOnce({ customer: id }); // Mock a case where customer is associated with a parking space

            await customerController.deleteCustomer(req, res, next);

            expect(next).toHaveBeenCalledWith(new createError('No se puede eliminar este cliente porque está asociado a un espacio de estacionamiento.', 400)); // Verify that a 400 error was passed to next()
        });

        it('should handle customer not found', async () => {
            const id = '123';
            req.params = { id };
            ParkingSpace.findOne.mockResolvedValueOnce(null); // Mock no parking space associated with the customer
            Customer.findByIdAndDelete.mockResolvedValueOnce(null); // Mock a case where customer is not found

            await customerController.deleteCustomer(req, res, next);

            expect(next).toHaveBeenCalledWith(createError(404, 'Cliente no encontrado')); // Verify that a 404 error was passed to next()
        });

        it('should handle errors', async () => {
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
