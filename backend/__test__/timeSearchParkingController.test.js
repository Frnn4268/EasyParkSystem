const TimeSearchParking = require('../src/models/timeSearchParkingModel');
const createError = require('../src/utils/appError');
const timeSearchParkingController = require('../src/controllers/timeSearchParkingController');

jest.mock('../src/models/timeSearchParkingModel');
jest.mock('../src/utils/appError', () => ({
  createError: jest.fn()
}));

describe('TimeSearchParking Controller', () => {
  let req, res, next;

  // Setup mock objects before each test
  beforeEach(() => {
    req = { params: {}, body: {} }; // Mock request object with params and body
    res = {
      status: jest.fn().mockReturnThis(), // Mock response object with status method
      json: jest.fn() // Mock response object with json method
    };
    next = jest.fn(); // Mock next function for error handling
  });

  // Clear all mocks after each test to ensure isolation
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Tests for getAllTimeSearchParking method
  describe('getAllTimeSearchParking', () => {
    it('should return all time search parking with a 200 status', async () => {
      const mockTimeSearchParking = [
        { _id: '1', hour_date_entry: new Date(), hour_date_output: null, time_search_parking: null },
        { _id: '2', hour_date_entry: new Date(), hour_date_output: null, time_search_parking: null }
      ];
      // Mock find method to return an array of parking search records
      TimeSearchParking.find.mockResolvedValue(mockTimeSearchParking);

      // Call the controller method
      await timeSearchParkingController.getAllTimeSearchParking(req, res, next);

      // Check if find method was called
      expect(TimeSearchParking.find).toHaveBeenCalled();
      // Verify response status and json data
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking
      });
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      // Mock find method to throw an error
      TimeSearchParking.find.mockRejectedValue(error);

      // Call the controller method
      await timeSearchParkingController.getAllTimeSearchParking(req, res, next);

      // Check if next function was called with the error
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // Tests for getLastTimeSearchParking method
  describe('getLastTimeSearchParking', () => {
    it('should return the last created time search parking ID with a 200 status', async () => {
      const mockTimeSearchParking = { _id: '1' };
      // Mock findOne method to return the latest parking search record
      TimeSearchParking.findOne.mockResolvedValue(mockTimeSearchParking);

      // Call the controller method
      await timeSearchParkingController.getLastTimeSearchParking(req, res, next);

      // Check if findOne method was called
      expect(TimeSearchParking.findOne).toHaveBeenCalled();
      // Verify response status and json data
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking._id
      });
    });

    it('should return a 404 status if no records are found', async () => {
      // Mock findOne method to return null
      TimeSearchParking.findOne.mockResolvedValue(null);

      // Call the controller method
      await timeSearchParkingController.getLastTimeSearchParking(req, res, next);

      // Verify response status and error message
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'No parking search records found',
        data: null
      });
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      // Mock findOne method to throw an error
      TimeSearchParking.findOne.mockRejectedValue(error);

      // Call the controller method
      await timeSearchParkingController.getLastTimeSearchParking(req, res, next);

      // Check if next function was called with the error
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // Tests for createTimeSearchParking method
  describe('createTimeSearchParking', () => {
    it('should create a new time search parking and return a 201 status', async () => {
      const mockTimeSearchParking = { _id: '1', hour_date_entry: new Date(), hour_date_output: null, time_search_parking: null };
      // Mock create method to return the new parking search record
      TimeSearchParking.create.mockResolvedValue(mockTimeSearchParking);

      // Call the controller method
      await timeSearchParkingController.createTimeSearchParking(req, res, next);

      // Check if create method was called with the correct parameters
      expect(TimeSearchParking.create).toHaveBeenCalledWith({
        hour_date_entry: expect.any(Date),
        hour_date_output: null,
        time_search_parking: null
      });
      // Verify response status and json data
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking
      });
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      // Mock create method to throw an error
      TimeSearchParking.create.mockRejectedValue(error);

      // Call the controller method
      await timeSearchParkingController.createTimeSearchParking(req, res, next);

      // Check if next function was called with the error
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // Tests for updateTimeSearchParking method
  describe('updateTimeSearchParking', () => {
    it('should update a time search parking and return a 200 status with the updated record', async () => {
      const mockTimeSearchParking = { _id: '1', hour_date_entry: new Date(), hour_date_output: new Date(), time_search_parking: 3600000 };
      req.params.id = '1'; // Mock ID in request parameters

      // Mock findById and save methods
      TimeSearchParking.findById.mockResolvedValue(mockTimeSearchParking);
      TimeSearchParking.prototype.save.mockResolvedValue(mockTimeSearchParking);

      // Call the controller method
      await timeSearchParkingController.updateTimeSearchParking(req, res, next);

      // Check if findById and save methods were called
      expect(TimeSearchParking.findById).toHaveBeenCalledWith('1');
      expect(TimeSearchParking.prototype.save).toHaveBeenCalled();
      // Verify response status and json data
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking
      });
    });

    it('should return a 404 error if the record is not found', async () => {
      req.params.id = 'nonexistent-id'; // Mock non-existing ID
      // Mock findById method to return null
      TimeSearchParking.findById.mockResolvedValue(null);

      // Call the controller method
      await timeSearchParkingController.updateTimeSearchParking(req, res, next);

      // Verify error creation and handling
      expect(createError).toHaveBeenCalledWith(404, 'Parking search record not found');
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      // Mock findById method to throw an error
      TimeSearchParking.findById.mockRejectedValue(error);

      // Call the controller method
      await timeSearchParkingController.updateTimeSearchParking(req, res, next);

      // Check if next function was called with the error
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  // Tests for deleteTimeSearchParking method
  describe('deleteTimeSearchParking', () => {
    it('should delete a time search parking and return a 204 status', async () => {
      req.params.id = '1'; // Mock ID in request parameters
      // Mock findByIdAndDelete method to return true
      TimeSearchParking.findByIdAndDelete.mockResolvedValue(true);

      // Call the controller method
      await timeSearchParkingController.deleteTimeSearchParking(req, res, next);

      // Check if findByIdAndDelete was called
      expect(TimeSearchParking.findByIdAndDelete).toHaveBeenCalledWith('1');
      // Verify response status and absence of json data
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should return a 404 error if the record is not found', async () => {
      req.params.id = 'nonexistent-id'; // Mock non-existing ID
      // Mock findByIdAndDelete method to return null
      TimeSearchParking.findByIdAndDelete.mockResolvedValue(null);

      // Call the controller method
      await timeSearchParkingController.deleteTimeSearchParking(req, res, next);

      // Verify error creation and handling
      expect(createError).toHaveBeenCalledWith(404, 'Parking search record not found');
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      // Mock findByIdAndDelete method to throw an error
      TimeSearchParking.findByIdAndDelete.mockRejectedValue(error);

      // Call the controller method
      await timeSearchParkingController.deleteTimeSearchParking(req, res, next);

      // Check if next function was called with the error
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
