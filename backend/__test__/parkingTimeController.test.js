const { getLatestParkingSpaceById } = require('../src/controllers/parkingTimeController');
const ParkingSpace = require('../src/models/parkingSpaceModel');

jest.mock('../src/models/parkingSpaceModel');

describe('getLatestParkingSpaceById', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: { id: 'someParkingSpaceId' } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    it('should return the latest parking space with a null hour_date_output', async () => {
        const mockParkingSpace = { parking_space_id: 'someParkingSpaceId', hour_date_entry: new Date(), hour_date_output: null };
        ParkingSpace.findOne.mockReturnValue({
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue(mockParkingSpace)
        });

        await getLatestParkingSpaceById(req, res, next);

        expect(ParkingSpace.findOne).toHaveBeenCalledWith({ parking_space_id: 'someParkingSpaceId', hour_date_output: null });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockParkingSpace);
    });

    it('should return 404 if no parking space is found', async () => {
        ParkingSpace.findOne.mockReturnValue({
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue(null)
        });

        await getLatestParkingSpaceById(req, res, next);

        expect(ParkingSpace.findOne).toHaveBeenCalledWith({ parking_space_id: 'someParkingSpaceId', hour_date_output: null });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No se encontró ningún espacio de parqueo para el ID de colección proporcionado con una fecha de salida nula.' });
    });

    it('should call next with an error if there is an exception', async () => {
        const error = new Error('Something went wrong');
        ParkingSpace.findOne.mockReturnValue({
            sort: jest.fn().mockReturnThis(),
            limit: jest.fn().mockRejectedValue(error)
        });

        await getLatestParkingSpaceById(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});