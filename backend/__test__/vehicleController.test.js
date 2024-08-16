const Vehicle = require('../src/models/vehicleModel');
const ParkingSpace = require('../src/models/parkingSpaceModel');
const createError = require('../src/utils/appError');

// Mocking the necessary models and utilities
jest.mock('../src/models/vehicleModel');
jest.mock('../src/models/parkingSpaceModel');
jest.mock('../src/utils/appError');

const vehicleController = require('../src/controllers/vehicleController');

describe('Vehicle Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllVehicles', () => {
    it('should return all vehicles with a 200 status', async () => {
      const mockVehicles = [{ _id: 1, license_plate: 'ABC123' }, { _id: 2, license_plate: 'XYZ789' }];
      Vehicle.find.mockResolvedValue(mockVehicles);

      await vehicleController.getAllVehicles(req, res, next);

      expect(Vehicle.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockVehicles
      });
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      Vehicle.find.mockRejectedValue(error);

      await vehicleController.getAllVehicles(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateVehicle', () => {
    it('should update a vehicle and return a 200 status with the updated vehicle', async () => {
      const mockVehicle = { _id: 1, license_plate: 'ABC123', type: 'Car', brand: 'Toyota', color: 'Red' };
      req.params.id = '1';
      req.body = { license_plate: 'DEF456', type: 'SUV', brand: 'Honda', color: 'Blue' };

      Vehicle.findByIdAndUpdate.mockResolvedValue(mockVehicle);

      await vehicleController.updateVehicle(req, res, next);

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

      await vehicleController.updateVehicle(req, res, next);

      expect(createError).toHaveBeenCalledWith(404, 'Vehicle not found');
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      Vehicle.findByIdAndUpdate.mockRejectedValue(error);

      await vehicleController.updateVehicle(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteVehicle', () => {
    it('should delete a vehicle and return a 204 status', async () => {
      req.params.id = '1';
      Vehicle.findByIdAndDelete.mockResolvedValue(true);
      ParkingSpace.findOne.mockResolvedValue(null);

      await vehicleController.deleteVehicle(req, res, next);

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

      await vehicleController.deleteVehicle(req, res, next);

      expect(ParkingSpace.findOne).toHaveBeenCalledWith({ vehicle: '1' });
      expect(createError).toHaveBeenCalledWith(
        400,
        'No se puede eliminar este vehículo porque está asociado a un espacio de estacionamiento.'
      );
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next with a 404 error if the vehicle is not found', async () => {
      req.params.id = 'nonexistent-id';
      Vehicle.findByIdAndDelete.mockResolvedValue(null);

      await vehicleController.deleteVehicle(req, res, next);

      expect(createError).toHaveBeenCalledWith(404, 'Vehículo no encontrado');
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      Vehicle.findByIdAndDelete.mockRejectedValue(error);

      await vehicleController.deleteVehicle(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
