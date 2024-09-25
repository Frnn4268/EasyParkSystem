const ParkingSpace = require('../src/models/parkingSpaceModel.js');
const Customer = require('../src/models/customerModel.js');
const Vehicle = require('../src/models/vehicleModel.js');
const moment = require('moment');
const createError = require('../src/utils/appError');
const {
    getAllParkingSpaces,
    getAllLatestParkingSpaces,
    getAverageParkingTime,
    getFrequentCustomers,
    getTotalCustomersToday,
    getParkingSpaceById,
    parkingEntryCreate,
    parkingOutputEdit,
    deleteParkingSpace
} = require('../src/controllers/parkingEntryController.js');

jest.mock('../src/models/parkingSpaceModel.js');
jest.mock('../src/models/customerModel.js');
jest.mock('../src/models/vehicleModel.js');
jest.mock('moment');
jest.mock('../src/utils/appError');

describe('Parking Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe('getAllParkingSpaces', () => {
        it('should return all parking spaces', async () => {
            const mockPopulate = jest.fn().mockReturnThis();
            const mockExec = jest.fn().mockResolvedValueOnce([{ _id: '1', customer: { _id: 'c1' }, vehicle: { _id: 'v1' } }]);
            
            ParkingSpace.find.mockReturnValueOnce({
                populate: jest.fn().mockReturnThis(),
                exec: mockExec
            });
            
            await getAllParkingSpaces(req, res, next);
            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ parkingSpaces: [{ _id: '1', customer: { _id: 'c1' }, vehicle: { _id: 'v1' } }] });
        });

        it('should handle errors', async () => {
            const error = new createError('Test Error');
            ParkingSpace.find.mockRejectedValueOnce(error);
            await getAllParkingSpaces(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getAllLatestParkingSpaces', () => {
        it('should return latest parking spaces', async () => {
            ParkingSpace.aggregate.mockResolvedValueOnce([{ latestEntry: { parking_space_id: '1', state: 'Ocupado', hour_date_entry: new Date() } }]);
            await getAllLatestParkingSpaces(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ parkingSpaces: expect.any(Array) }));
        });

        it('should handle errors', async () => {
            const error = new createError('Test Error');
            ParkingSpace.aggregate.mockRejectedValueOnce(error);
            await getAllLatestParkingSpaces(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getAverageParkingTime', () => {
        it('should return average parking time', async () => {
            ParkingSpace.find.mockResolvedValueOnce([{ hour_date_entry: new Date(), hour_date_output: new Date() }]);
            await getAverageParkingTime(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ averageParkingTime: expect.any(Number) }));
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            ParkingSpace.find.mockRejectedValueOnce(error);
            await getAverageParkingTime(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getFrequentCustomers', () => {
        it('should return frequent customers', async () => {
            Customer.aggregate.mockResolvedValueOnce([{ _id: { firstname_owner: 'John', lastname_owner: 'Doe' }, count: 5 }]);
            await getFrequentCustomers(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ frequentCustomers: expect.any(Array) }));
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            Customer.aggregate.mockRejectedValueOnce(error);
            await getFrequentCustomers(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getTotalCustomersToday', () => {
        it('should return total customers today', async () => {
            Customer.aggregate.mockResolvedValueOnce([{ totalCustomers: 10 }]);
            await getTotalCustomersToday(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ totalCustomersToday: 10 });
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            Customer.aggregate.mockRejectedValueOnce(error);
            await getTotalCustomersToday(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getParkingSpaceById', () => {
        it('should return parking space by id', async () => {
            ParkingSpace.findOne.mockResolvedValueOnce({ _id: '1' });
            req.params.id = '1';
            await getParkingSpaceById(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ parkingSpace: { _id: '1' } });
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            ParkingSpace.findOne.mockRejectedValueOnce(error);
            await getParkingSpaceById(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('parkingEntryCreate', () => {
        it('should create a parking entry', async () => {
            Customer.prototype.save = jest.fn().mockResolvedValueOnce({ _id: '1' });
            Vehicle.prototype.save = jest.fn().mockResolvedValueOnce({ _id: '1' });
            ParkingSpace.prototype.save = jest.fn().mockResolvedValueOnce({ _id: '1' });
            req.body = { customerData: {}, vehicleData: {}, parkingSpaceData: {} };
            await parkingEntryCreate(req, res, next);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Data successfully saved', parkingSpace: expect.any(Object) }));
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            Customer.prototype.save = jest.fn().mockRejectedValueOnce(error);
            await parkingEntryCreate(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('parkingOutputEdit', () => {
        it('should edit parking output', async () => {
            ParkingSpace.find.mockResolvedValueOnce([{ _id: '1', hour_date_entry: new Date() }]);
            req.params.id = '1';
            req.body.state = 'Libre';
            await parkingOutputEdit(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Estado del espacio de estacionamiento actualizado exitosamente', updatedParkingSpace: expect.any(Object) }));
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            ParkingSpace.find.mockRejectedValueOnce(error);
            await parkingOutputEdit(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteParkingSpace', () => {
        it('should delete parking space', async () => {
            ParkingSpace.findById.mockResolvedValueOnce({ _id: '1', state: 'Libre' });
            ParkingSpace.findByIdAndDelete.mockResolvedValueOnce({ _id: '1' });
            req.params.id = '1';
            await deleteParkingSpace(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Espacio de estacionamiento eliminado exitosamente' });
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            ParkingSpace.findById.mockRejectedValueOnce(error);
            await deleteParkingSpace(req, res, next);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});