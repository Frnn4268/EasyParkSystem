const { getLatestParkingSpaceByCustomer } = require('../src/controllers/parkingTimeCustomerController');
const ParkingSpace = require('../src/models/parkingSpaceModel');

jest.mock('../src/models/parkingSpaceModel');

// Test suite for the getLatestParkingSpaceByCustomer function
describe('parkingTimeCustomerController Unit Testing - Get Latest Parking Space By Customer', () => {
    let req, res, next;

    // Initialize the req, res, and next objects before each test
    beforeEach(() => {
        req = { params: { id: 'someCustomerId' } };
        res = {
            status: jest.fn().mockReturnThis(), // Mock the status method to allow chaining
            json: jest.fn() // Mock the json method to verify responses
        };
        next = jest.fn(); // Mock the next function to verify error handling
    });

    // Test successful retrieval of the latest parking space with a null hour_date_output
    it('should return the latest parking space with a null hour_date_output', async () => {
        const mockParkingSpace = { _id: 'someCustomerId', hour_date_entry: new Date(), hour_date_output: null };
        ParkingSpace.findOne.mockReturnValue({
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue(mockParkingSpace)
        });

        await getLatestParkingSpaceByCustomer(req, res, next);

        // Verify that the findOne method is called with the correct query
        expect(ParkingSpace.findOne).toHaveBeenCalledWith({ _id: 'someCustomerId', hour_date_output: null });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockParkingSpace);
    });

    // Test handling of no parking space found
    it('should return 404 if no parking space is found', async () => {
        ParkingSpace.findOne.mockReturnValue({
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue(null)
        });

        await getLatestParkingSpaceByCustomer(req, res, next);

        // Verify that the findOne method is called with the correct query
        expect(ParkingSpace.findOne).toHaveBeenCalledWith({ _id: 'someCustomerId', hour_date_output: null });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No se encontró ningún espacio de parqueo para el ID de colección proporcionado con una fecha de salida nula.' });
    });

    // Test error handling during retrieval of the latest parking space
    it('should call next with an error if there is an exception', async () => {
        const error = new Error('Something went wrong');
        ParkingSpace.findOne.mockReturnValue({
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockRejectedValue(error)
        });

        await getLatestParkingSpaceByCustomer(req, res, next);

        // Verify that the next function is called with the error
        expect(next).toHaveBeenCalledWith(error);
    });
});