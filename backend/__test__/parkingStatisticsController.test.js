const ParkingSpace = require('../src/models/parkingSpaceModel');
const ParkingStatisticsController = require('../src/controllers/parkingStatisticsController');

jest.mock('../src/models/parkingSpaceModel');
jest.mock('../src/models/timeSearchParkingModel');

// Test suite for the Parking Statistics Controller
describe('parkingStatisticsController Unit Testing - Parking Statistics Controller', () => {
    let req, res, next;
  
    // Initialize the req, res, and next objects before each test
    beforeEach(() => {
        req = {};
        res = {
          status: jest.fn().mockReturnThis(), // Mock the status method to allow chaining
          json: jest.fn() // Mock the json method to verify responses
        };
        next = jest.fn(); // Mock the next function to verify error handling
    });
  
    // Clear all mocks after each test to ensure no residual state
    afterEach(() => {
        jest.clearAllMocks();
    });
  
    // Test suite for getTotalCustomersPerDayOfMonth function
    describe('parkingStatisticsController - getTotalCustomersPerDayOfMonth', () => {
        // Test successful retrieval of total customers per day of the current month
        it('should return total customers per day of the current month with a 200 status', async () => {
            const mockCustomersPerDay = [
                { _id: 1, totalCustomers: 2 },
                { _id: 2, totalCustomers: 1 }
            ];
            ParkingSpace.aggregate.mockResolvedValue(mockCustomersPerDay);
    
            await ParkingStatisticsController.getTotalCustomersPerDayOfMonth(req, res, next);
    
            // Verify that the aggregation pipeline is correct
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
  
        // Test error handling during retrieval of total customers per day
        it('should return a 500 status if an error occurs', async () => {
            ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
      
            await ParkingStatisticsController.getTotalCustomersPerDayOfMonth(req, res, next);
      
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
  
    // Test suite for getTotalVehiclesPerDayOfMonth function
    describe('parkingStatisticsController - getTotalVehiclesPerDayOfMonth', () => {
        // Test successful retrieval of total vehicles per day of the current month
        it('should return total vehicles per day of the current month with a 200 status', async () => {
            const mockVehiclesPerDay = [
                { _id: 1, totalVehicles: 3 },
                { _id: 2, totalVehicles: 2 }
            ];
            ParkingSpace.aggregate.mockResolvedValue(mockVehiclesPerDay);
      
            await ParkingStatisticsController.getTotalVehiclesPerDayOfMonth(req, res, next);
      
            // Verify that the aggregation pipeline is correct
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
      
        // Test error handling during retrieval of total vehicles per day
        it('should return a 500 status if an error occurs', async () => {
            ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
        
            await ParkingStatisticsController.getTotalVehiclesPerDayOfMonth(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
  
    // Test suite for getAvailableAndOccupiedSpaces function
    describe('parkingStatisticsController - getAvailableAndOccupiedSpaces', () => {
        // Test successful retrieval of available and occupied spaces
        it('should return available and occupied spaces with a 200 status', async () => {
            const mockLatestStates = [
                { _id: '1', latestState: { state: 'Disponible' } },
                { _id: '2', latestState: { state: 'Ocupado' } },
                { _id: '3', latestState: { state: 'Disponible' } }
            ];
            ParkingSpace.aggregate.mockResolvedValue(mockLatestStates);
      
            await ParkingStatisticsController.getAvailableAndOccupiedSpaces(req, res, next);
      
            // Verify that the aggregation pipeline is correct
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
    
        // Test error handling during retrieval of available and occupied spaces
        it('should return a 500 status if an error occurs', async () => {
            ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
      
            await ParkingStatisticsController.getAvailableAndOccupiedSpaces(req, res, next);
      
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
  
    // Test suite for getTotalUsagePerSpace function
    describe('parkingStatisticsController - getTotalUsagePerSpace', () => {
        // Test successful retrieval of total usage per space for the current month
        it('should return total usage per space for the current month with a 200 status', async () => {
            const mockUsagePerSpace = [
                { _id: '1', usageCount: 4 },
                { _id: '2', usageCount: 5 }
            ];
            ParkingSpace.aggregate.mockResolvedValue(mockUsagePerSpace);
      
            await ParkingStatisticsController.getTotalUsagePerSpace(req, res, next);
      
            // Verify that the aggregation pipeline is correct
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
    
        // Test error handling during retrieval of total usage per space
        it('should return a 500 status if an error occurs', async () => {
            ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
      
            await ParkingStatisticsController.getTotalUsagePerSpace(req, res, next);
      
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
  
    // Test suite for getTotalDailyCustomers function
    describe('parkingStatisticsController - getTotalDailyCustomers', () => {
        // Test successful retrieval of total customers for today
        it('should return total customers for today with a 200 status', async () => {
            ParkingSpace.countDocuments.mockResolvedValue(10);
      
            await ParkingStatisticsController.getTotalDailyCustomers(req, res, next);
      
            // Verify that the countDocuments method is called with the correct query
            expect(ParkingSpace.countDocuments).toHaveBeenCalledWith({
                hour_date_entry: { $gte: expect.any(Date), $lt: expect.any(Date) }
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ totalCustomers: 10 });
        });
    
        // Test error handling during retrieval of total daily customers
        it('should return a 500 status if an error occurs', async () => {
            ParkingSpace.countDocuments.mockRejectedValue(new Error('Test Error'));
      
            await ParkingStatisticsController.getTotalDailyCustomers(req, res, next);
      
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
  
    // Test suite for getAverageParkingTime function
    describe('parkingStatisticsController - getAverageParkingTime', () => {
        // Test successful retrieval of average parking time
        it('should return average parking time with a 200 status', async () => {
            const mockAverageParkingTime = [{ averageTime: 60 }];
            ParkingSpace.aggregate.mockResolvedValue(mockAverageParkingTime);
      
            await ParkingStatisticsController.getAverageParkingTime(req, res, next);
      
            // Verify that the aggregation pipeline is correct
            expect(ParkingSpace.aggregate).toHaveBeenCalledWith([
                { $match: { hour_date_output: { $ne: null } } },
                {
                    $project: {
                      parkingTime: {
                        $divide: [{ $subtract: ["$hour_date_output", "$hour_date_entry"] }, 1000 * 60]
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
      
        // Test error handling during retrieval of average parking time
        it('should return a 500 status if an error occurs', async () => {
            ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
        
            await ParkingStatisticsController.getAverageParkingTime(req, res, next);
        
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
});