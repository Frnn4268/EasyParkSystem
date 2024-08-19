const ParkingSpace = require('../src/models/parkingSpaceModel.js');
const { getLatestParkingSpaceById } = require('../src/controllers/parkingTimeController.js');

// Mocks
jest.mock('../src/models/parkingSpaceModel.js');

describe('getLatestParkingSpaceById', () => {
  let req, res, next;

  // Set up the mock request, response, and next function before each test
  beforeEach(() => {
    req = { params: { id: '123' } }; // Mock request with a parameter id
    res = {
      status: jest.fn().mockReturnThis(), // Mock status function
      json: jest.fn(), // Mock json function
    };
    next = jest.fn(); // Mock next function for error handling
  });

  // Clear all mock data after each test to ensure tests are independent
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case: should return the latest parking space if found
  it('should return the latest parking space if found', async () => {
    const mockParkingSpace = { parking_space_id: '123', hour_date_entry: '2024-08-17T10:00:00Z' };

    // Simulate the model's findOne method resolving with a mock parking space
    ParkingSpace.findOne.mockResolvedValue(mockParkingSpace);

    // Call the controller function with the mocked request, response, and next
    await getLatestParkingSpaceById(req, res, next);

    // Assert that the findOne method was called with the correct query
    expect(ParkingSpace.findOne).toHaveBeenCalledWith({
      parking_space_id: '123',
      hour_date_output: null,
    });
    // Assert that the findOne method was called exactly once
    expect(ParkingSpace.findOne).toHaveBeenCalledTimes(1);

    // Assert that the response status was set to 200
    expect(res.status).toHaveBeenCalledWith(200);
    // Assert that the response JSON method was called with the mock parking space data
    expect(res.json).toHaveBeenCalledWith(mockParkingSpace);
  });

  // Test case: should return a 404 error if no parking space is found
  it('should return a 404 error if no parking space is found', async () => {
    // Simulate the model's findOne method resolving with null (no parking space found)
    ParkingSpace.findOne.mockResolvedValue(null);

    // Call the controller function with the mocked request, response, and next
    await getLatestParkingSpaceById(req, res, next);

    // Assert that the findOne method was called with the correct query
    expect(ParkingSpace.findOne).toHaveBeenCalledWith({
      parking_space_id: '123',
      hour_date_output: null,
    });
    // Assert that the findOne method was called exactly once
    expect(ParkingSpace.findOne).toHaveBeenCalledTimes(1);

    // Assert that the response status was set to 404
    expect(res.status).toHaveBeenCalledWith(404);
    // Assert that the response JSON method was called with the correct error message
    expect(res.json).toHaveBeenCalledWith({
      message: 'No se encontró ningún espacio de parqueo para el ID de colección proporcionado con una fecha de salida nula.',
    });
  });
});
