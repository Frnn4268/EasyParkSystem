const TimeSearchParking = require('../src/models/timeSearchParkingModel');
const creatError = require('../src/utils/appError');
const timeSearchParkingController = require('../src/controllers/timeSearchParkingController');

jest.mock('../src/models/timeSearchParkingModel');
jest.mock('../src/utils/appError', () => {
  return {
    creatError: jest.fn()
  };
});

describe('TimeSearchParking Controller', () => {
  let req, res, next;

  // Setup before each test
  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(), // Chainable status mock
      json: jest.fn() // Mock for JSON response
    };
    next = jest.fn(); // Mock for the next middleware function
  });

  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllTimeSearchParking', () => {
    it('should return all time search parking with a 200 status', async () => {
      const mockTimeSearchParking = [
        { _id: '1', hour_date_entry: new Date(), hour_date_output: null, time_search_parking: null },
        { _id: '2', hour_date_entry: new Date(), hour_date_output: null, time_search_parking: null }
      ];
      TimeSearchParking.find.mockResolvedValue(mockTimeSearchParking); // Mock the find method

      await timeSearchParkingController.getAllTimeSearchParking(req, res, next);

      expect(TimeSearchParking.find).toHaveBeenCalled(); // Ensure the find method was called
      expect(res.status).toHaveBeenCalledWith(200); // Check if the status code is 200
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking
      }); // Verify the response data
    });
  });

  describe('getLastTimeSearchParking', () => {
    it('should return the last created time search parking ID with a 200 status', async () => {
      const mockTimeSearchParking = { _id: '1' };
      TimeSearchParking.findOne.mockResolvedValue(mockTimeSearchParking); // Mock the findOne method

      await timeSearchParkingController.getLastTimeSearchParking(req, res, next);

      expect(TimeSearchParking.findOne).toHaveBeenCalled(); // Ensure the findOne method was called
      expect(res.status).toHaveBeenCalledWith(200); // Check if the status code is 200
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking._id
      }); // Verify the response data
    });

    it('should return a 404 status if no records are found', async () => {
      TimeSearchParking.findOne.mockResolvedValue(null); // Mock no records found

      await timeSearchParkingController.getLastTimeSearchParking(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404); // Check if the status code is 404
      expect(res.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'No parking search records found',
        data: null
      }); // Verify the response data
    });
  });

  describe('createTimeSearchParking', () => {
    it('should create a new time search parking and return a 201 status', async () => {
      const mockTimeSearchParking = { _id: '1', hour_date_entry: new Date(), hour_date_output: null, time_search_parking: null };
      TimeSearchParking.create.mockResolvedValue(mockTimeSearchParking); // Mock the create method

      await timeSearchParkingController.createTimeSearchParking(req, res, next);

      expect(TimeSearchParking.create).toHaveBeenCalledWith({
        hour_date_entry: expect.any(Date),
        hour_date_output: null,
        time_search_parking: null
      }); // Ensure the create method was called with the correct parameters
      expect(res.status).toHaveBeenCalledWith(201); // Check if the status code is 201
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking
      }); // Verify the response data
    });
  });

  describe('updateTimeSearchParking', () => {
    it('should update a time search parking and return a 200 status with the updated record', async () => {
      const mockTimeSearchParking = { _id: '1', hour_date_entry: new Date(), hour_date_output: new Date(), time_search_parking: 3600000 };
      req.params.id = '1'; // Set request params for the ID
      TimeSearchParking.findById.mockResolvedValue(mockTimeSearchParking); // Mock the findById method
      TimeSearchParking.prototype.save.mockResolvedValue(mockTimeSearchParking); // Mock the save method

      await timeSearchParkingController.updateTimeSearchParking(req, res, next);

      expect(TimeSearchParking.findById).toHaveBeenCalledWith('1'); // Ensure the findById method was called
      expect(TimeSearchParking.prototype.save).toHaveBeenCalled(); // Ensure the save method was called
      expect(res.status).toHaveBeenCalledWith(200); // Check if the status code is 200
      expect(res.json).toHaveBeenCalledWith({
        status: 'success',
        data: mockTimeSearchParking
      }); // Verify the response data
    });

    it('should return a 404 error if the record is not found', async () => {
      req.params.id = 'nonexistent-id'; // Set a non-existent ID
      TimeSearchParking.findById.mockResolvedValue(null); // Mock no record found

      await timeSearchParkingController.updateTimeSearchParking(req, res, next);

      expect(creatError).toHaveBeenCalledWith(404, 'Parking search record not found'); // Ensure creatError was called with correct params
      expect(next).toHaveBeenCalledWith(expect.any(Error)); // Check if next was called with an error
    });

    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error');
      TimeSearchParking.findById.mockRejectedValue(error); // Mock error in findById method

      await timeSearchParkingController.updateTimeSearchParking(req, res, next);

      expect(next).toHaveBeenCalledWith(error); // Check if next was called with the error
    });
  });

  describe('deleteTimeSearchParking', () => {
    it('should delete a time search parking and return a 204 status', async () => {
      req.params.id = '1'; // Set request params for the ID
      TimeSearchParking.findByIdAndDelete.mockResolvedValue(true); // Mock successful deletion

      await timeSearchParkingController.deleteTimeSearchParking(req, res, next);

      expect(TimeSearchParking.findByIdAndDelete).toHaveBeenCalledWith('1'); // Ensure the findByIdAndDelete method was called
      expect(res.status).toHaveBeenCalledWith(204); // Check if the status code is 204
      expect(res.json).not.toHaveBeenCalled(); // Verify that no JSON response was sent
    });

    it('should return a 404 error if the record is not found', async () => {
      req.params.id = 'nonexistent-id'; // Set a non-existent ID
      TimeSearchParking.findByIdAndDelete.mockResolvedValue(null); // Mock no record found

      await timeSearchParkingController.deleteTimeSearchParking(req, res, next);

      expect(creatError).toHaveBeenCalledWith(404, 'Parking search record not found'); // Ensure creatError was called with correct params
      expect(next).toHaveBeenCalledWith(expect.any(Error)); // Check if next was called with an error
    });
  });
});