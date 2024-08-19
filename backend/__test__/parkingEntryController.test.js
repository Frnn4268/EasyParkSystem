const request = require('supertest');
const express = require('express');
const ParkingSpace = require('../src/models/parkingSpaceModel.js');
const Customer = require('../src/models/customerModel.js');
const Vehicle = require('../src/models/vehicleModel.js');
const app = express();

const parkingController = require('../src/controllers/parkingEntryController.js');

// Mock middleware for error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message });
});

// Set up the test app with routes
app.use(express.json());
app.get('/parkingSpaces', parkingController.getAllParkingSpaces);
app.get('/latestParkingSpaces', parkingController.getAllLatestParkingSpaces);
app.get('/averageParkingTime', parkingController.getAverageParkingTime);
app.get('/frequentCustomers', parkingController.getFrequentCustomers);
app.get('/totalCustomersToday', parkingController.getTotalCustomersToday);
app.get('/parkingSpace/:id', parkingController.getParkingSpaceById);
app.post('/parkingEntry', parkingController.parkingEntryCreate);
app.put('/parkingOutput/:id', parkingController.parkingOutputEdit);
app.delete('/parkingSpace/:id', parkingController.deleteParkingSpace);

// Mock Mongoose models to prevent actual database calls
jest.mock('../src/models/parkingSpaceModel.js');
jest.mock('../src/models/customerModel.js');
jest.mock('../src/models/vehicleModel.js');

describe('Parking Controller', () => {
    // Clear all mocks after each test
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test GET /parkingSpaces route
    describe('GET /parkingSpaces', () => {
        it('should return all parking spaces', async () => {
            ParkingSpace.find.mockResolvedValue([{ _id: '123', state: 'Occupied' }]);

            const res = await request(app).get('/parkingSpaces');

            expect(res.status).toBe(200);
            expect(res.body.parkingSpaces).toHaveLength(1);
        });
    });

    // Test GET /latestParkingSpaces route
    describe('GET /latestParkingSpaces', () => {
        it('should return the latest parking spaces', async () => {
            ParkingSpace.aggregate.mockResolvedValue([{ _id: '123', latestEntry: { parking_space_id: '1', state: 'Occupied', hour_date_entry: new Date() } }]);

            const res = await request(app).get('/latestParkingSpaces');

            expect(res.status).toBe(200);
            expect(res.body.parkingSpaces).toHaveLength(1);
        });
    });

    // Test GET /averageParkingTime route
    describe('GET /averageParkingTime', () => {
        it('should return the average parking time', async () => {
            ParkingSpace.find.mockResolvedValue([{ hour_date_entry: new Date(), hour_date_output: new Date() }]);

            const res = await request(app).get('/averageParkingTime');

            expect(res.status).toBe(200);
            expect(res.body.averageParkingTime).toBeDefined();
        });
    });

    // Test GET /frequentCustomers route
    describe('GET /frequentCustomers', () => {
        it('should return the frequent customers', async () => {
            Customer.aggregate.mockResolvedValue([{ _id: { firstname_owner: 'John', lastname_owner: 'Doe' }, count: 5 }]);

            const res = await request(app).get('/frequentCustomers');

            expect(res.status).toBe(200);
            expect(res.body.frequentCustomers).toHaveLength(1);
        });
    });

    // Test GET /totalCustomersToday route
    describe('GET /totalCustomersToday', () => {
        it('should return the total customers today', async () => {
            Customer.aggregate.mockResolvedValue([{ _id: null, totalCustomers: 5 }]);

            const res = await request(app).get('/totalCustomersToday');

            expect(res.status).toBe(200);
            expect(res.body.totalCustomersToday).toBe(5);
        });
    });

    // Test GET /parkingSpace/:id route
    describe('GET /parkingSpace/:id', () => {
        it('should return a parking space by id', async () => {
            ParkingSpace.findOne.mockResolvedValue({ _id: '123', state: 'Occupied' });

            const res = await request(app).get('/parkingSpace/123');

            expect(res.status).toBe(200);
            expect(res.body.parkingSpace._id).toBe('123');
        });

        it('should return 404 if parking space not found', async () => {
            ParkingSpace.findOne.mockResolvedValue(null);

            const res = await request(app).get('/parkingSpace/123');

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Parking space not found');
        });
    });

    // Test POST /parkingEntry route
    describe('POST /parkingEntry', () => {
        it('should create a new parking entry', async () => {
            const customer = { _id: 'customerId' };
            const vehicle = { _id: 'vehicleId' };
            const parkingSpace = { _id: 'parkingSpaceId', state: 'Occupied' };

            // Mock the implementations of model saving
            Customer.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(customer)
            }));
            Vehicle.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(vehicle)
            }));
            ParkingSpace.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(parkingSpace)
            }));

            const res = await request(app).post('/parkingEntry').send({
                customerData: { name: 'John Doe' },
                vehicleData: { licensePlate: 'ABC123' },
                parkingSpaceData: { parking_space_id: '1' }
            });

            expect(res.status).toBe(201);
            expect(res.body.message).toBe('Data successfully saved');
        });
    });

    // Test PUT /parkingOutput/:id route
    describe('PUT /parkingOutput/:id', () => {
        it('should update parking output details', async () => {
            ParkingSpace.find.mockResolvedValue([{ _id: '123', state: 'Occupied', hour_date_entry: new Date() }]);

            const res = await request(app).put('/parkingOutput/123').send({ state: 'Free' });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Parking space status updated successfully');
        });

        it('should return 404 if parking space not found', async () => {
            ParkingSpace.find.mockResolvedValue([]);

            const res = await request(app).put('/parkingOutput/123').send({ state: 'Free' });

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Parking space not found');
        });
    });

    // Test DELETE /parkingSpace/:id route
    describe('DELETE /parkingSpace/:id', () => {
        it('should delete a parking space', async () => {
            ParkingSpace.findById.mockResolvedValue({ _id: '123', state: 'Free' });
            ParkingSpace.findByIdAndDelete.mockResolvedValue({ _id: '123' });

            const res = await request(app).delete('/parkingSpace/123');

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Parking space deleted successfully');
        });

        it('should return 404 if parking space not found', async () => {
            ParkingSpace.findById.mockResolvedValue(null);

            const res = await request(app).delete('/parkingSpace/123');

            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Parking space not found');
        });

        it('should return 400 if parking space is occupied', async () => {
            ParkingSpace.findById.mockResolvedValue({ _id: '123', state: 'Occupied' });

            const res = await request(app).delete('/parkingSpace/123');

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Cannot delete parking history because it is occupied. Please free the parking space before deleting.');
        });
    });
});