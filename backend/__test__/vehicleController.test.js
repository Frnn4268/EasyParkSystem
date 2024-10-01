const Vehicle = require('../src/models/vehicleModel');
const ParkingSpace = require('../src/models/parkingSpaceModel');
const createError = require('../src/utils/appError');

// Mock the necessary models and utilities
jest.mock('../src/models/vehicleModel');
jest.mock('../src/models/parkingSpaceModel');
jest.mock('../src/utils/appError');

const vehicleController = require('../src/controllers/vehicleController');

// Test suite for the Vehicle Controller
describe('vehicleController Unit Testing - Vehicle Controller', () => {
    let req, res, next;

    // Set up mocks for each test
    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(), // Mock the status method to allow chaining
            json: jest.fn() // Mock the json method to verify responses
        };
        next = jest.fn(); // Mock the next function to verify error handling
    });

    // Clear all mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test suite for getAllVehicles function
    describe('vehicleController - getAllVehicles', () => {
        // Test successful retrieval of all vehicles
        it('should return all vehicles with a 200 status', async () => {
            // Mock data to be returned
            const mockVehicles = [{ _id: 1, license_plate: 'ABC123' }, { _id: 2, license_plate: 'XYZ789' }];
            Vehicle.find.mockResolvedValue(mockVehicles);

            // Call the controller method
            await vehicleController.getAllVehicles(req, res, next);

            // Check if the correct methods were called with expected arguments
            expect(Vehicle.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: mockVehicles
            });
        });

        // Test error handling during retrieval of all vehicles
        it('should call next with an error if one occurs', async () => {
            // Mock an error to be thrown
            const error = new Error('Test Error');
            Vehicle.find.mockRejectedValue(error);

            // Call the controller method
            await vehicleController.getAllVehicles(req, res, next);

            // Check if the error is passed to the next middleware
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    // Test suite for updateVehicle function
    describe('vehicleController - updateVehicle', () => {
        // Test successful update of a vehicle
        it('should update a vehicle and return a 200 status with the updated vehicle', async () => {
            // Mock data for the updated vehicle
            const mockVehicle = { _id: 1, license_plate: 'ABC123', type: 'SUV', brand: 'Toyota', color: 'Red' };
            req.params.id = '1';
            req.body = { license_plate: 'DEF456', type: 'SUV', brand: 'Honda', color: 'Blue' };

            Vehicle.findByIdAndUpdate.mockResolvedValue(mockVehicle);

            // Call the controller method
            await vehicleController.updateVehicle(req, res, next);

            // Check if the correct methods were called with expected arguments
            expect(Vehicle.findByIdAndUpdate).toHaveBeenCalledWith(
                '1',
                { license_plate: 'DEF456', type: 'SUV', brand: 'Honda', color: 'Blue' },
                { new: true }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Vehicle updated successfully!',
                data: mockVehicle
            });
        });

        // Test handling of vehicle not found during update
        it('should call next with a 404 error if the vehicle is not found', async () => {
            req.params.id = 'nonexistent-id';
            Vehicle.findByIdAndUpdate.mockResolvedValue(null);

            const error = new Error('Vehicle not found');
            createError.mockReturnValue(error); // Mock createError to return an error

            // Call the controller method
            await vehicleController.updateVehicle(req, res, next);

            // Check if the error is created and passed to the next middleware
            expect(createError).toHaveBeenCalledWith(404, 'Vehicle not found');
            expect(next).toHaveBeenCalledWith(error);
        });

        // Test error handling during update of a vehicle
        it('should call next with an error if one occurs', async () => {
            // Mock an error to be thrown
            const error = new Error('Test Error');
            Vehicle.findByIdAndUpdate.mockRejectedValue(error);

            // Call the controller method
            await vehicleController.updateVehicle(req, res, next);

            // Check if the error is passed to the next middleware
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    // Test suite for deleteVehicle function
    describe('vehicleController - deleteVehicle', () => {
        // Test successful deletion of a vehicle
        it('should delete a vehicle and return a 204 status', async () => {
            req.params.id = '1';
            Vehicle.findByIdAndDelete.mockResolvedValue(true);
            ParkingSpace.findOne.mockResolvedValue(null);

            // Call the controller method
            await vehicleController.deleteVehicle(req, res, next);

            // Check if the correct methods were called with expected arguments
            expect(ParkingSpace.findOne).toHaveBeenCalledWith({ vehicle: '1' });
            expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Vehículo eliminado exitosamente!',
                data: null
            });
        });

        // Test handling of vehicle associated with a parking space
        it('should call next with a 400 error if the vehicle is associated with a parking space', async () => {
            req.params.id = '1';
            ParkingSpace.findOne.mockResolvedValue({ _id: '1', vehicle: '1' });

            const error = new Error('No se puede eliminar este vehículo porque está asociado a un espacio de estacionamiento.');
            createError.mockReturnValue(error); // Mock createError to return an error

            // Call the controller method
            await vehicleController.deleteVehicle(req, res, next);

            // Check if the error is created and passed to the next middleware
            expect(ParkingSpace.findOne).toHaveBeenCalledWith({ vehicle: '1' });
            expect(createError).toHaveBeenCalledWith(
                'No se puede eliminar este vehículo porque está asociado a un espacio de estacionamiento.',
                400
            );
            expect(next).toHaveBeenCalledWith(error);
        });

        // Test handling of vehicle not found during deletion
        it('should call next with a 404 error if the vehicle is not found', async () => {
            req.params.id = 'nonexistent-id';
            Vehicle.findByIdAndDelete.mockResolvedValue(null);

            const error = new Error('Vehículo no encontrado');
            createError.mockReturnValue(error); // Mock createError to return an error

            // Call the controller method
            await vehicleController.deleteVehicle(req, res, next);

            // Check if the error is created and passed to the next middleware
            expect(createError).toHaveBeenCalledWith(404, 'Vehículo no encontrado');
            expect(next).toHaveBeenCalledWith(error);
        });

        // Test error handling during deletion of a vehicle
        it('should call next with an error if one occurs', async () => {
            // Mock an error to be thrown
            const error = new Error('Vehículo no encontrado');
            Vehicle.findByIdAndDelete.mockRejectedValue(error);

            // Call the controller method
            await vehicleController.deleteVehicle(req, res, next);

            // Check if the error is passed to the next middleware
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});