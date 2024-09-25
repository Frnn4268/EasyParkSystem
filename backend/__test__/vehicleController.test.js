const Vehicle = require('../src/models/vehicleModel');
const ParkingSpace = require('../src/models/parkingSpaceModel');
const createError = require('../src/utils/appError');

// Mock the necessary models and utilities
jest.mock('../src/models/vehicleModel');
jest.mock('../src/models/parkingSpaceModel');
jest.mock('../src/utils/appError');

const vehicleController = require('../src/controllers/vehicleController');

describe('Vehicle Controller', () => {
  let req, res, next;

  // Set up mocks for each test
  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllVehicles', () => {
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

  describe('updateVehicle', () => {
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

    it('should call next with a 404 error if the vehicle is not found', async () => {
      req.params.id = 'nonexistent-id';
      Vehicle.findByIdAndUpdate.mockResolvedValue(null);

      const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
      };

      const next = jest.fn();

      const error = new Error('Vehicle not found');
      createError.mockReturnValue(error); // Mock createError to return an error

      // Call the controller method
      await vehicleController.updateVehicle(req, res, next);

      // Check if the error is created and passed to the next middleware
      expect(createError).toHaveBeenCalledWith(404, 'Vehicle not found');
      expect(next).toHaveBeenCalledWith(error);
    });

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

  describe('deleteVehicle', () => {
    it('should delete a vehicle and return a 204 status', async () => {
        req.params.id = '1';
        Vehicle.findByIdAndDelete.mockResolvedValue(true);
        ParkingSpace.findOne.mockResolvedValue(null);

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

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

    it('should call next with a 400 error if the vehicle is associated with a parking space', async () => {
        req.params.id = '1';
        ParkingSpace.findOne.mockResolvedValue({ _id: '1', vehicle: '1' });

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

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

    it('should call next with a 404 error if the vehicle is not found', async () => {
        req.params.id = 'nonexistent-id';
        Vehicle.findByIdAndDelete.mockResolvedValue(null);

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

        const error = new Error('Vehículo no encontrado');
        createError.mockReturnValue(error); // Mock createError to return an error

        // Call the controller method
        await vehicleController.deleteVehicle(req, res, next);

        // Check if the error is created and passed to the next middleware
        expect(createError).toHaveBeenCalledWith(404, 'Vehículo no encontrado');
        expect(next).toHaveBeenCalledWith(error);
    });

    it('should call next with an error if one occurs', async () => {
        // Mock an error to be thrown
        const error = new Error('Vehículo no encontrado');
        Vehicle.findByIdAndDelete.mockRejectedValue(error);

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

        // Call the controller method
        await vehicleController.deleteVehicle(req, res, next);

        // Check if the error is passed to the next middleware
        expect(next).toHaveBeenCalledWith(error);
    });
  });
});
