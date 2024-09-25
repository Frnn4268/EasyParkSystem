const ParkingPrice = require('../src/models/parkingPriceModel');
const ParkingSpace = require('../src/models/parkingSpaceModel');
const { getLastParkingPrice, createParkingPrice, getParkingCostById, calculateParkingCost } = require('../src/controllers/parkingPriceController');
const createError = require('../src/utils/appError');

jest.mock('../src/models/parkingPriceModel');
jest.mock('../src/models/parkingSpaceModel');

describe('Parking Controller', () => {
    let req, res, next;

    beforeEach(() => {
        // Initialize the req, res, and next objects before each test
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(), // Mock the status method to allow chaining
            json: jest.fn(), // Mock the json method to verify responses
        };
        next = jest.fn(); // Mock the next function to verify error handling
    });

    afterEach(() => {
        // Clear all mocks after each test to ensure no residual state
        jest.clearAllMocks();
    });

    describe('calculateParkingCost', () => {
        // Test the calculateParkingCost helper function
        it('should calculate the correct parking cost based on time and price', () => {
            const parkingPrice = 10; // Example price per hour
            const elapsedTimeInSeconds = 3600; // Example elapsed time in seconds (1 hour)
            const result = calculateParkingCost(parkingPrice, elapsedTimeInSeconds);
            expect(result).toBe('10.00'); // Assert that the cost is calculated correctly
        });
    });

    describe('getLastParkingPrice', () => {
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

    describe('createParkingPrice', () => {
        // Test the createParkingPrice controller function
        it('should create a new parking price', async () => {
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

        it('should call next with an error if something goes wrong', async () => {
            const error = new Error('Something went wrong'); // Simulate an error
            ParkingPrice.create.mockRejectedValue(error); // Mock the create method to throw an error

            await createParkingPrice(req, res, next);

            // Verify that the next function was called with the simulated error
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getParkingCostById', () => {
        // Test the getParkingCostById controller function
        it('should return the parking cost if the space is occupied', async () => {
            // Mock parking space and price data
            const mockParkingSpace = { _id: '123', state: 'Ocupado', hour_date_entry: new Date(new Date().getTime() - 3600000) }; // 1 hour ago
            const mockParkingPrice = { price: 10 };
            req.params.id = '123'; // Simulate request parameter data
            ParkingSpace.findOne.mockResolvedValue(mockParkingSpace); // Mock the findOne method to return the mocked data
            ParkingPrice.findOne.mockResolvedValue(mockParkingPrice); // Mock the findOne method to return the mocked price data
        
            // Mock res.status and res.json
            res.status = jest.fn().mockReturnValue(res);
            res.json = jest.fn();
        
            calculateParkingCost.mockReturnValue('10.00'); // Mock the calculateParkingCost function

            await getParkingCostById(req, res, next);
        
            // Calculate the expected cost based on the mock data
            const expectedCost = '10.00'; // 1 hour at $10/hour
            // Verify the correct methods were called with the correct arguments
            expect(ParkingSpace.findOne).toHaveBeenCalledWith({ _id: '123' });
            expect(ParkingPrice.findOne).toHaveBeenCalledTimes(1);
            expect(calculateParkingCost).toHaveBeenCalledWith(10, 3600);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: 'success',
                data: { parkingCost: expectedCost }
            });
        });
    
        it('should return 404 if the parking space is not found', async () => {
            req.params.id = '123'; // Simulate request parameter data
            ParkingSpace.findOne.mockResolvedValue(null); // Mock the findOne method to return null (no space found)
    
            await getParkingCostById(req, res, next);
    
            // Verify that the next function was called with a 404 error
            expect(ParkingSpace.findOne).toHaveBeenCalledWith({ _id: '123' });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Espacio de estacionamiento no encontrado' });
        });
    
        it('should return 200 with a message if the space is not occupied', async () => {
            const mockParkingSpace = { _id: '123', state: 'Libre' }; // Simulate a free parking space
            req.params.id = '123';
            ParkingSpace.findOne.mockResolvedValue(mockParkingSpace); // Mock the findOne method to return the mocked data
    
            await getParkingCostById(req, res, next);
    
            // Verify the correct response was sent
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'El espacio de estacionamiento no está ocupado',
                parkingCost: 0
            });
        });
    
        it('should call next with a 404 error if no parking price is found', async () => {
            // Mock the findOne method to return a query object with a sort method
            const mockQuery = {
                sort: jest.fn().mockResolvedValue(null) // Mock the sort method to return null (no price found)
            };
            ParkingPrice.findOne.mockReturnValue(mockQuery);
        
            await getLastParkingPrice(req, res, next);
        
            // Verify that the next function was called with a 404 error
            expect(ParkingPrice.findOne).toHaveBeenCalledTimes(1);
            expect(mockQuery.sort).toHaveBeenCalledWith({ _id: -1 });
            
            // Verify the error passed to next
            expect(next).toHaveBeenCalledWith(expect.any(createError));
        });
    });
});