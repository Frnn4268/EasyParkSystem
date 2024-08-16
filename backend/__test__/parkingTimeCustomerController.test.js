const ParkingSpace = require('../src/models/parkingSpaceModel.js');
const parkingSpaceController = require('../src/controllers/parkingSpaceController'); 

jest.mock('../src/models/parkingSpaceModel.js');

describe('ParkingSpace Controller', () => {
  // Variables to mock req, res, and next objects
  let req, res, next;

  // Setup mock objects before each test
  beforeEach(() => {
    req = { params: {} }; // Mock request object
    res = {
      status: jest.fn().mockReturnThis(), // Mock response status method
      json: jest.fn() // Mock response json method
    };
    next = jest.fn(); // Mock next function for error handling
  });

  // Clear mocks after each test to avoid test interference
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Describe the tests for getLatestParkingSpaceByCustomer function
  describe('getLatestParkingSpaceByCustomer', () => {
    // Test if the function returns the latest parking space with a 200 status
    it('should return the latest parking space with a 200 status', async () => {
      const mockParkingSpace = { _id: '1', hour_date_entry: new Date(), hour_date_output: null };
      req.params.id = '1'; // Mock the customer ID in request parameters

      // Mock the findOne method to return the simulated parking space
      ParkingSpace.findOne.mockResolvedValue(mockParkingSpace);

      // Call the controller method with mock objects
      await parkingSpaceController.getLatestParkingSpaceByCustomer(req, res, next);

      // Check if findOne was called with correct parameters
      expect(ParkingSpace.findOne).toHaveBeenCalledWith({
        _id: '1',
        hour_date_output: null 
      });
      // Ensure findOne was called only once
      expect(ParkingSpace.findOne).toHaveBeenCalledTimes(1);
      // Verify response status is 200
      expect(res.status).toHaveBeenCalledWith(200);
      // Check if response json method was called with the mock data
      expect(res.json).toHaveBeenCalledWith(mockParkingSpace);
    });

    // Test if the function returns a 404 status if no parking space is found
    it('should return a 404 status if no parking space is found', async () => {
      req.params.id = '1'; // Mock the customer ID in request parameters
      // Mock findOne to return null
      ParkingSpace.findOne.mockResolvedValue(null);

      // Call the controller method with mock objects
      await parkingSpaceController.getLatestParkingSpaceByCustomer(req, res, next);

      // Check if findOne was called with correct parameters
      expect(ParkingSpace.findOne).toHaveBeenCalledWith({
        _id: '1',
        hour_date_output: null 
      });
      // Ensure findOne was called only once
      expect(ParkingSpace.findOne).toHaveBeenCalledTimes(1);
      // Verify response status is 404
      expect(res.status).toHaveBeenCalledWith(404);
      // Check if response json method was called with the error message
      expect(res.json).toHaveBeenCalledWith({
        message: 'No parking space found for the provided collection ID with a null exit date.'
      });
    });

    // Test if the function calls next with an error if one occurs
    it('should call next with an error if one occurs', async () => {
      const error = new Error('Test Error'); // Create a simulated error
      // Mock findOne to reject with the simulated error
      ParkingSpace.findOne.mockRejectedValue(error);

      // Call the controller method with mock objects
      await parkingSpaceController.getLatestParkingSpaceByCustomer(req, res, next);

      // Check if next function was called with the error
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
