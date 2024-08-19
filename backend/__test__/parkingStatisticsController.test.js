const ParkingSpace = require('../src/models/parkingSpaceModel');
const TimeSearchParking = require('../src/models/timeSearchParkingModel');

jest.mock('../src/models/parkingSpaceModel');
jest.mock('../src/models/timeSearchParkingModel');

describe('Parking Statistics Controller', () => {
    let req, res, next;
  
    beforeEach(() => {
      // Initialize request, response, and next objects before each test
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      next = jest.fn();
    });
  
    afterEach(() => {
      // Clear all mocks after each test
      jest.clearAllMocks();
    });
  
    describe('getTotalCustomersPerDayOfMonth', () => {
      it('should return total customers per day of the current month with a 200 status', async () => {
        // Mock data for the test
        const mockCustomersPerDay = [
          { _id: 1, totalCustomers: 2 },
          { _id: 2, totalCustomers: 1 }
        ];
        ParkingSpace.aggregate.mockResolvedValue(mockCustomersPerDay);
  
        // Call the controller function and verify the results
        await require('../src/controllers/parkingStatisticsController').getTotalCustomersPerDayOfMonth(req, res, next);
  
        // Check if aggregate method was called with the correct pipeline
        expect(ParkingSpace.aggregate).toHaveBeenCalledWith([
          { $match: { hour_date_entry: { $gte: expect.any(Date), $lt: expect.any(Date) } } },
          {
            $group: {
              _id: { $dayOfMonth: "$hour_date_entry" },
              totalCustomers: { $sum: 1 }
            }
          },
          { $sort: { '_id': 1 } }
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockCustomersPerDay);
      });
  
      it('should return a 500 status if an error occurs', async () => {
        // Simulate an error in the model
        ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
  
        await require('../src/controllers/parkingStatisticsController').getTotalCustomersPerDayOfMonth(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
      });
    });
  
    describe('getTotalVehiclesPerDayOfMonth', () => {
      it('should return total vehicles per day of the current month with a 200 status', async () => {
        // Mock data for the test
        const mockVehiclesPerDay = [
          { _id: 1, totalVehicles: 3 },
          { _id: 2, totalVehicles: 2 }
        ];
        ParkingSpace.aggregate.mockResolvedValue(mockVehiclesPerDay);
  
        // Call the controller function and verify the results
        await require('../src/controllers/parkingStatisticsController').getTotalVehiclesPerDayOfMonth(req, res, next);
  
        // Check if aggregate method was called with the correct pipeline
        expect(ParkingSpace.aggregate).toHaveBeenCalledWith([
          { $match: { hour_date_entry: { $gte: expect.any(Date), $lt: expect.any(Date) } } },
          {
            $group: {
              _id: { $dayOfMonth: "$hour_date_entry" },
              totalVehicles: { $sum: 1 }
            }
          },
          { $sort: { '_id': 1 } }
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockVehiclesPerDay);
      });
  
      it('should return a 500 status if an error occurs', async () => {
        // Simulate an error in the model
        ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
  
        await require('../src/controllers/parkingStatisticsController').getTotalVehiclesPerDayOfMonth(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
      });
    });
  
    describe('getAvailableAndOccupiedSpaces', () => {
      it('should return available and occupied spaces with a 200 status', async () => {
        // Mock data for the test
        const mockLatestStates = [
          { _id: '1', latestState: { state: 'Available' } },
          { _id: '2', latestState: { state: 'Occupied' } },
          { _id: '3', latestState: { state: 'Available' } }
        ];
        ParkingSpace.aggregate.mockResolvedValue(mockLatestStates);
  
        // Call the controller function and verify the results
        await require('../src/controllers/parkingStatisticsController').getAvailableAndOccupiedSpaces(req, res, next);
  
        // Check if aggregate method was called with the correct pipeline
        expect(ParkingSpace.aggregate).toHaveBeenCalledWith([
          {
            $group: {
              _id: "$parking_space_id",
              latestState: { $last: "$$ROOT" }
            }
          }
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ availableSpaces: 2, occupiedSpaces: 1 });
      });
  
      it('should return a 500 status if an error occurs', async () => {
        // Simulate an error in the model
        ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
  
        await require('../src/controllers/parkingStatisticsController').getAvailableAndOccupiedSpaces(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
      });
    });
  
    describe('getTotalUsagePerSpace', () => {
      it('should return total usage per space for the current month with a 200 status', async () => {
        // Mock data for the test
        const mockUsagePerSpace = [
          { _id: '1', usageCount: 4 },
          { _id: '2', usageCount: 5 }
        ];
        ParkingSpace.aggregate.mockResolvedValue(mockUsagePerSpace);
  
        // Call the controller function and verify the results
        await require('../src/controllers/parkingStatisticsController').getTotalUsagePerSpace(req, res, next);
  
        // Check if aggregate method was called with the correct pipeline
        expect(ParkingSpace.aggregate).toHaveBeenCalledWith([
          { $match: { hour_date_entry: { $gte: expect.any(Date), $lt: expect.any(Date) } } },
          {
            $group: {
              _id: "$parking_space_id",
              usageCount: { $sum: 1 }
            }
          },
          { $sort: { '_id': 1 } }
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockUsagePerSpace);
      });
  
      it('should return a 500 status if an error occurs', async () => {
        // Simulate an error in the model
        ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
  
        await require('../src/controllers/parkingStatisticsController').getTotalUsagePerSpace(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
      });
    });
  
    describe('getTotalDailyCustomers', () => {
      it('should return total customers for today with a 200 status', async () => {
        // Mock data for the test
        ParkingSpace.countDocuments.mockResolvedValue(10);
  
        // Call the controller function and verify the results
        await require('../src/controllers/parkingStatisticsController').getTotalDailyCustomers(req, res, next);
  
        // Check if countDocuments method was called with the correct filter
        expect(ParkingSpace.countDocuments).toHaveBeenCalledWith({
          hour_date_entry: { $gte: expect.any(Date), $lt: expect.any(Date) }
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ totalCustomers: 10 });
      });
  
      it('should return a 500 status if an error occurs', async () => {
        // Simulate an error in the model
        ParkingSpace.countDocuments.mockRejectedValue(new Error('Test Error'));
  
        await require('../src/controllers/parkingStatisticsController').getTotalDailyCustomers(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
      });
    });
  
    describe('getAverageParkingTime', () => {
      it('should return average parking time with a 200 status', async () => {
        // Mock data for the test
        const mockAverageParkingTime = [{ averageTime: 60 }];
        ParkingSpace.aggregate.mockResolvedValue(mockAverageParkingTime);
  
        // Call the controller function and verify the results
        await require('../src/controllers/parkingStatisticsController').getAverageParkingTime(req, res, next);
  
        // Check if aggregate method was called with the correct pipeline
        expect(ParkingSpace.aggregate).toHaveBeenCalledWith([
          { $match: { hour_date_output: { $ne: null } } },
          {
            $project: {
              parkingTime: {
                $subtract: [
                  { $ifNull: ["$hour_date_output", new Date()] },
                  "$hour_date_entry"
                ]
              }
            }
          },
          {
            $group: {
              _id: null,
              averageTime: { $avg: "$parkingTime" }
            }
          }
        ]);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ averageParkingTime: 60 });
      });
  
      it('should return a 500 status if an error occurs', async () => {
        // Simulate an error in the model
        ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
  
        await require('../src/controllers/parkingStatisticsController').getAverageParkingTime(req, res, next);
  
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
      });
    });
});