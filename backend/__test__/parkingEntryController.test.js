const ParkingSpace = require('../src/models/parkingSpaceModel.js');
const Customer = require('../src/models/customerModel.js');
const Vehicle = require('../src/models/vehicleModel.js');
const moment = require('moment');
const createError = require('../src/utils/appError.js');
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
} = require('../src/controllers/parkingEntryController');

jest.mock('../src/models/parkingSpaceModel.js');
jest.mock('../src/models/customerModel.js');
jest.mock('../src/models/vehicleModel.js');
jest.mock('moment', () => {
    const originalMoment = jest.requireActual('moment');
    return () => originalMoment('2024-01-01T00:00:00.000Z');
});

describe('parkingEntryController Unit Testing - Parking Entry Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('parkingEntryController - getAllParkingSpaces', () => {
        it('should return all parking spaces', async () => {
            const mockParkingSpaces = [{ _id: '1', state: 'Ocupado' }];
            ParkingSpace.find.mockResolvedValue(mockParkingSpaces);
    
            await getAllParkingSpaces(req, res, next);
    
            expect(ParkingSpace.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ parkingSpaces: mockParkingSpaces });
        });
    });

    describe('parkingEntryController - getAllLatestParkingSpaces', () => {
        it('should return all latest parking spaces', async () => {
            const mockParkingSpaces = [
                { _id: '1', latestEntry: { parking_space_id: '1', state: 'Ocupado', hour_date_entry: new Date() } }
            ];
            ParkingSpace.aggregate.mockResolvedValue(mockParkingSpaces);

            await getAllLatestParkingSpaces(req, res, next);

            expect(ParkingSpace.aggregate).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                parkingSpaces: [
                    {
                        parking_space_id: '1',
                        state: 'Ocupado',
                        hour_date_entry: mockParkingSpaces[0].latestEntry.hour_date_entry
                    }
                ]
            });
        });
    });

    describe('parkingEntryController - getAverageParkingTime', () => {
        it('should return the average parking time', async () => {
            const mockParkingSpaces = [
                { hour_date_entry: new Date('2023-01-01T00:00:00.000Z'), hour_date_output: new Date('2023-01-01T01:00:00.000Z') }
            ];
            ParkingSpace.find.mockResolvedValue(mockParkingSpaces);

            await getAverageParkingTime(req, res, next);

            expect(ParkingSpace.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ averageParkingTime: 60 });
        });
    });

    describe('parkingEntryController - getFrequentCustomers', () => {
        it('should return frequent customers', async () => {
            const mockCustomers = [
                { _id: { firstname_owner: 'John', lastname_owner: 'Doe' }, count: 5 }
            ];
            Customer.aggregate.mockResolvedValue(mockCustomers);

            await getFrequentCustomers(req, res, next);

            expect(Customer.aggregate).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ frequentCustomers: mockCustomers });
        });
    });

    describe('parkingEntryController - getTotalCustomersToday', () => {
        it('should return total customers today', async () => {
            const mockTotalCustomersToday = [{ totalCustomers: 10 }];
            Customer.aggregate.mockResolvedValue(mockTotalCustomersToday);

            await getTotalCustomersToday(req, res, next);

            expect(Customer.aggregate).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ totalCustomersToday: 10 });
        });
    });

    describe('parkingEntryController - getParkingSpaceById', () => {
        it('should return a parking space by ID', async () => {
        const mockParkingSpace = { _id: '1', parking_space_id: '1', state: 'Ocupado' };
        ParkingSpace.findOne.mockResolvedValue(mockParkingSpace);

        req.params = { id: '1' };

        await getParkingSpaceById(req, res, next);

        console.log('ParkingSpace.findOne called:', ParkingSpace.findOne.mock.calls.length);
        console.log('res.status called:', res.status.mock.calls.length);
        console.log('res.json called:', res.json.mock.calls.length);

        expect(ParkingSpace.findOne).toHaveBeenCalledWith({ parking_space_id: '1' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ parkingSpace: mockParkingSpace });
    });

        it('should return 404 if parking space not found', async () => {
            ParkingSpace.findOne.mockResolvedValue(null);

            req.params = { id: '1' };

            await getParkingSpaceById(req, res, next);

            expect(ParkingSpace.findOne).toHaveBeenCalledWith({ parking_space_id: '1' });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Espacio de estacionamiento no encontrado' });
        });
    });

    describe('parkingEntryController - parkingEntryCreate', () => {
        it('should create a new parking entry', async () => {
            const mockCustomer = { _id: '1', firstname_owner: 'John', lastname_owner: 'Doe' };
            const mockVehicle = { _id: '1', license_plate: 'ABC123' };
            const mockParkingSpace = { _id: '1', state: 'Ocupado', hour_date_entry: new Date() };

            Customer.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockCustomer)
            }));
            Vehicle.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockVehicle)
            }));
            ParkingSpace.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockParkingSpace)
            }));

            req.body = {
                customerData: { firstname_owner: 'John', lastname_owner: 'Doe' },
                vehicleData: { license_plate: 'ABC123' },
                parkingSpaceData: { parking_space_id: '1' }
            };

            await parkingEntryCreate(req, res, next);

            expect(Customer).toHaveBeenCalledWith(req.body.customerData);
            expect(Vehicle).toHaveBeenCalledWith(req.body.vehicleData);
            expect(ParkingSpace).toHaveBeenCalledWith({
                state: 'Ocupado',
                hour_date_entry: expect.any(Date),
                ...req.body.parkingSpaceData,
                customer: mockCustomer._id,
                vehicle: mockVehicle._id
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Data successfully saved',
                parkingSpace: mockParkingSpace
            });
        });

        it('should handle errors', async () => {
            const error = new Error('Test Error');
            Customer.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(error)
            }));

            req.body = {
                customerData: { firstname_owner: 'John', lastname_owner: 'Doe' },
                vehicleData: { license_plate: 'ABC123' },
                parkingSpaceData: { parking_space_id: '1' }
            };

            await parkingEntryCreate(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('parkingEntryController - parkingOutputEdit', () => {
        it('should update the parking space state and output time', async () => {
            const mockParkingSpace = { _id: '1', parking_space_id: '1', state: 'Ocupado', hour_date_entry: new Date() };
            const updatedParkingSpace = { ...mockParkingSpace, state: 'Disponible', hour_date_exit: new Date() };
    
            ParkingSpace.findOneAndUpdate.mockResolvedValue(updatedParkingSpace);
    
            req.body = { parking_space_id: '1', state: 'Disponible' };
    
            await parkingOutputEdit(req, res, next);
    
            expect(ParkingSpace.findOneAndUpdate).toHaveBeenCalledWith(
                { parking_space_id: '1' },
                { state: 'Disponible', hour_date_exit: expect.any(Date) },
                { new: true }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Estado del espacio de estacionamiento actualizado exitosamente',
                updatedParkingSpace: expect.objectContaining({ state: 'Disponible' })
            });
        });

        it('should return 404 if parking space not found', async () => {
            ParkingSpace.findOneAndUpdate.mockResolvedValue(null);
    
            req.body = { parking_space_id: '1', state: 'Disponible' };
    
            await parkingOutputEdit(req, res, next);
    
            expect(ParkingSpace.findOneAndUpdate).toHaveBeenCalledWith(
                { parking_space_id: '1' },
                { state: 'Disponible', hour_date_exit: expect.any(Date) },
                { new: true }
            );
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Espacio de estacionamiento no encontrado' });
        });
    });

    describe('parkingEntryController - deleteParkingSpace', () => {
        it('should delete a parking space', async () => {
            const mockParkingSpace = { _id: '1', state: 'Disponible' };
            ParkingSpace.findById.mockResolvedValue(mockParkingSpace);
            ParkingSpace.findByIdAndDelete.mockResolvedValue(mockParkingSpace);

            req.params = { id: '1' };

            await deleteParkingSpace(req, res, next);

            expect(ParkingSpace.findById).toHaveBeenCalledWith('1');
            expect(ParkingSpace.findByIdAndDelete).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Espacio de estacionamiento eliminado exitosamente' });
        });

        it('should return 404 if parking space not found', async () => {
            ParkingSpace.findById.mockResolvedValue(null);

            req.params = { id: '1' };

            await deleteParkingSpace(req, res, next);

            expect(ParkingSpace.findById).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Espacio de estacionamiento no encontrado' });
        });

        it('should return 400 if parking space is occupied', async () => {
            const mockParkingSpace = { _id: '1', state: 'Ocupado' };
            ParkingSpace.findById.mockResolvedValue(mockParkingSpace);

            req.params = { id: '1' };

            await deleteParkingSpace(req, res, next);

            expect(ParkingSpace.findById).toHaveBeenCalledWith('1');
            expect(next).toHaveBeenCalledWith(expect.any(createError));
        });
    });
});