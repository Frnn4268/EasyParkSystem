const ParkingPrice = require('../src/models/parkingPriceModel');
const ParkingSpace = require('../src/models/parkingSpaceModel');
const { getLastParkingPrice, createParkingPrice, getParkingCostById, calculateParkingCost } = require('../src/controllers/parkingPriceController');
const createError = require('../src/utils/appError');

jest.mock('../src/models/parkingPriceModel');
jest.mock('../src/models/parkingSpaceModel');

// Test suite for the Parking Controller
describe('parkingPriceController Unit Testing - Parking Price Controller', () => {
    let req, res, next;

    // Initialize the req, res, and next objects before each test
    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(), // Mock the status method to allow chaining
            json: jest.fn(), // Mock the json method to verify responses
        };
        next = jest.fn(); // Mock the next function to verify error handling
    });

    // Clear all mocks after each test to ensure no residual state
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test suite for calculateParkingCost function
    describe('parkingPriceController - calculateParkingCost', () => {
        // Test the calculateParkingCost helper function
        it('should calculate the correct parking cost based on time and price', () => {
            const parkingPrice = 10; // Example price per hour
            const elapsedTimeInSeconds = 3600; // Example elapsed time in seconds (1 hour)
            const result = calculateParkingCost(parkingPrice, elapsedTimeInSeconds);
            expect(result).toBe('10.00'); // Assert that the cost is calculated correctly
        });
    });

    // Test suite for getLastParkingPrice function
    describe('parkingPriceController - getLastParkingPrice', () => {
        // Test the getLastParkingPrice controller function
        it('should return the last parking price if found', async () => {
            const mockParkingPrice = { price: 10, time_in_hours: 1 }; // Mocked parking price data
            ParkingPrice.findOne.mockReturnValueOnce({
                sort: jest.fn().mockResolvedValueOnce(mockParkingPrice)
            }); // Mock the model method to return the mocked data

            await getLastParkingPrice(req, res, next); // Call the controller function

            // Verify that the correct methods were called with the correct arguments
            expect(ParkingPrice.findOne).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: mockParkingPrice
            });
        });

        // Test handling of no parking price found
        it('should return 404 if no parking price is found', async () => {
            ParkingPrice.findOne.mockReturnValueOnce({
                sort: jest.fn().mockResolvedValueOnce(null)
            }); // Mock the model method to return null (no price found)

            await getLastParkingPrice(req, res, next);

            // Verify that the next function was called with a 404 error
            expect(ParkingPrice.findOne).toHaveBeenCalledTimes(1);
            expect(next).toHaveBeenCalledWith(expect.any(createError));
        });
    });

    // Test suite for createParkingPrice function
    describe('parkingPriceController - createParkingPrice', () => {
        // Test the createParkingPrice controller function
        it('should create a new parking price and return it', async () => {
            const mockParkingPrice = { price: 10, time_in_hours: 1, hour_date: new Date() }; // Mocked parking price data
            req.body = { price: 10, time_in_hours: 1 }; // Simulate request body data
            ParkingPrice.create.mockResolvedValue(mockParkingPrice); // Mock the create method to return the mocked data

            await createParkingPrice(req, res, next);

            // Verify that the create method was called with the correct arguments
            expect(ParkingPrice.create).toHaveBeenCalledWith({
                price: 10,
                time_in_hours: 1,
                hour_date: expect.any(Date),
            });
            // Verify the correct response was sent
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                message: 'Precio de parqueo creado exitosamente!',
                data: mockParkingPrice
            });
        });

        // Test error handling during creation of a new parking price
        it('should call next with an error if something goes wrong', async () => {
            const error = new Error('Something went wrong'); // Simulate an error
            ParkingPrice.create.mockRejectedValue(error); // Mock the create method to throw an error

            await createParkingPrice(req, res, next);

            // Verify that the next function was called with the simulated error
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    // Test suite for getParkingCostById function
    describe('parkingPriceController - getParkingCostById', () => {
        // Initialize the req, res, and next objects before each test
        beforeEach(() => {
            req = { params: { id: '123' } };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            next = jest.fn();
        });

        // Test handling of parking space not found
        it('should return 404 if parking space is not found', async () => {
            ParkingSpace.findOne.mockResolvedValue(null);

            await getParkingCostById(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Espacio de estacionamiento no encontrado' });
        });

        // Test handling of parking space not occupied
        it('should return 200 if parking space is not occupied', async () => {
            ParkingSpace.findOne.mockResolvedValue({ state: 'Libre' });

            await getParkingCostById(req, res, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'El espacio de estacionamiento no está ocupado', parkingCost: 0 });
        });

        // Test error handling during retrieval of parking cost by ID
        it('should call next with error if an exception occurs', async () => {
            const error = new Error('Test error');
            ParkingSpace.findOne.mockRejectedValue(error);

            await getParkingCostById(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});