const TimeSearchParking = require('../src/models/timeSearchParkingModel');
const createError = require('../src/utils/appError');
const timeSearchParkingController = require('../src/controllers/timeSearchParkingController');

// Mocking the necessary models and utilities
jest.mock('../src/models/timeSearchParkingModel');
jest.mock('../src/utils/appError', () => ({
  createError: jest.fn()
}));

describe('TimeSearchParking Controller', () => {
  let req, res, next;

  // Setup mock objects before each test
  beforeEach(() => {
    req = { params: {}, body: {} }; // Mock request object
    res = {
      status: jest.fn().mockReturnThis(), // Mock response object with status method
      json: jest.fn() // Mock response object with json method
    };
    next = jest.fn(); // Mock next function
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTimeSearchParking', () => {
    it('should return all time search parking with a 200 status', async () => {
      const mockTimeSearchParking = [
        { _id: '1', hour_date_entry: new Date(), hour_date_output: null, time_search_parking: null },
        { _id: '2', hour_date_entry: new Date(), hour_date_output: null, time_search_parking: null }
      ];
      TimeSearchParking.find.mockResolvedValue(mockTimeSearchParking);

      await timeSearchParkingController.getAllTimeSearchParking(req, res, next);

      expect(TimeSearchParking.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking
      });
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      TimeSearchParking.find.mockRejectedValue(error);

      await timeSearchParkingController.getAllTimeSearchParking(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getLastTimeSearchParking', () => {
    it('should return the last created time search parking ID with a 200 status', async () => {
      const mockTimeSearchParking = { _id: '1' };
      TimeSearchParking.findOne.mockResolvedValue(mockTimeSearchParking);

      await timeSearchParkingController.getLastTimeSearchParking(req, res, next);

      expect(TimeSearchParking.findOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking._id
      });
    });

    it('should return a 404 status if no records are found', async () => {
      TimeSearchParking.findOne.mockResolvedValue(null);

      await timeSearchParkingController.getLastTimeSearchParking(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'No se encontraron registros de búsqueda de estacionamiento',
        data: null
      });
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      TimeSearchParking.findOne.mockRejectedValue(error);

      await timeSearchParkingController.getLastTimeSearchParking(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createTimeSearchParking', () => {
    it('should create a new time search parking and return a 201 status', async () => {
      const mockTimeSearchParking = { _id: '1', hour_date_entry: new Date(), hour_date_output: null, time_search_parking: null };
      TimeSearchParking.create.mockResolvedValue(mockTimeSearchParking);

      await timeSearchParkingController.createTimeSearchParking(req, res, next);

      expect(TimeSearchParking.create).toHaveBeenCalledWith({
        hour_date_entry: expect.any(Date),
        hour_date_output: null,
        time_search_parking: null
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking
      });
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      TimeSearchParking.create.mockRejectedValue(error);

      await timeSearchParkingController.createTimeSearchParking(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('updateTimeSearchParking', () => {
    it('should update a time search parking and return a 200 status with the updated record', async () => {
      const mockTimeSearchParking = { _id: '1', hour_date_entry: new Date(), hour_date_output: new Date(), time_search_parking: 3600000 };
      req.params.id = '1';

      TimeSearchParking.findById.mockResolvedValue(mockTimeSearchParking);
      TimeSearchParking.prototype.save.mockResolvedValue(mockTimeSearchParking);

      await timeSearchParkingController.updateTimeSearchParking(req, res, next);

      expect(TimeSearchParking.findById).toHaveBeenCalledWith('1');
      expect(TimeSearchParking.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking
      });
    });

    it('should return a 404 error if the record is not found', async () => {
      req.params.id = 'nonexistent-id';
      TimeSearchParking.findById.mockResolvedValue(null);

      await timeSearchParkingController.updateTimeSearchParking(req, res, next);

      expect(createError).toHaveBeenCalledWith(404, 'Registro de búsqueda de estacionamiento no encontrado');
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      TimeSearchParking.findById.mockRejectedValue(error);

      await timeSearchParkingController.updateTimeSearchParking(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteTimeSearchParking', () => {
    it('should delete a time search parking and return a 204 status', async () => {
      req.params.id = '1';
      TimeSearchParking.findByIdAndDelete.mockResolvedValue(true);

      await timeSearchParkingController.deleteTimeSearchParking(req, res, next);

      expect(TimeSearchParking.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should return a 404 error if the record is not found', async () => {
      req.params.id = 'nonexistent-id';
      TimeSearchParking.findByIdAndDelete.mockResolvedValue(null);

      await timeSearchParkingController.deleteTimeSearchParking(req, res, next);

      expect(createError).toHaveBeenCalledWith(404, 'Registro de búsqueda de estacionamiento no encontrado');
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      TimeSearchParking.findByIdAndDelete.mockRejectedValue(error);

      await timeSearchParkingController.deleteTimeSearchParking(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
