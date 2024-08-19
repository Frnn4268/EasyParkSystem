const ParkingSpace = require('../src/models/parkingSpaceModel');
const { getLatestParkingSpaceByCustomer } = require('../src/controllers/parkingSpaceController'); // Asegúrate de que la ruta sea correcta

// Mock de la dependencia ParkingSpace
jest.mock('../src/models/parkingSpaceModel');

describe('ParkingSpace Controller - getLatestParkingSpaceByCustomer', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            params: {
                id: 'someId',
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should return the latest parking space with null hour_date_output', async () => {
        const mockParkingSpace = {
            _id: 'someId',
            hour_date_entry: new Date(),
            hour_date_output: null,
        };
        // Mock de ParkingSpace.findOne para devolver el objeto mock
        ParkingSpace.findOne.mockResolvedValueOnce(mockParkingSpace);

        await getLatestParkingSpaceByCustomer(req, res, next);

        expect(ParkingSpace.findOne).toHaveBeenCalledWith({
            _id: req.params.id,
            hour_date_output: null
        });
        expect(ParkingSpace.findOne).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockParkingSpace);
    });

    it('should return a 404 error if no parking space is found', async () => {
        // Mock de ParkingSpace.findOne para devolver null
        ParkingSpace.findOne.mockResolvedValueOnce(null);

        await getLatestParkingSpaceByCustomer(req, res, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No se encontró ningún espacio de parqueo para el ID de colección proporcionado con una fecha de salida nula.' });
    });

    it('should handle errors and call next with the error', async () => {
        const error = new Error('Database error');
        // Mock de ParkingSpace.findOne para lanzar un error
        ParkingSpace.findOne.mockRejectedValueOnce(error);

        await getLatestParkingSpaceByCustomer(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
