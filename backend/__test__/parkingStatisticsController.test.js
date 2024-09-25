const ParkingSpace = require('../src/models/parkingSpaceModel');
const TimeSearchParking = require('../src/models/timeSearchParkingModel');

jest.mock('../src/models/parkingSpaceModel');
jest.mock('../src/models/timeSearchParkingModel');

describe('Parking Statistics Controller', () => {
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
  
    describe('getTotalCustomersPerDayOfMonth', () => {
        it('should return total customers per day of the current month with a 200 status', async () => {
            const mockCustomersPerDay = [
                { _id: 1, totalCustomers: 2 },
                { _id: 2, totalCustomers: 1 }
            ];
            ParkingSpace.aggregate.mockResolvedValue(mockCustomersPerDay);
    
            await require('../src/controllers/parkingStatisticsController').getTotalCustomersPerDayOfMonth(req, res, next);
    
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
            ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
      
            await require('../src/controllers/parkingStatisticsController').getTotalCustomersPerDayOfMonth(req, res, next);
      
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
  
      describe('getTotalVehiclesPerDayOfMonth', () => {
          it('should return total vehicles per day of the current month with a 200 status', async () => {
              const mockVehiclesPerDay = [
                { _id: 1, totalVehicles: 3 },
                { _id: 2, totalVehicles: 2 }
              ];
              ParkingSpace.aggregate.mockResolvedValue(mockVehiclesPerDay);
      
              await require('../src/controllers/parkingStatisticsController').getTotalVehiclesPerDayOfMonth(req, res, next);
      
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
              ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
        
              await require('../src/controllers/parkingStatisticsController').getTotalVehiclesPerDayOfMonth(req, res, next);
        
              expect(res.status).toHaveBeenCalledWith(500);
              expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
          });
      });
  
    describe('getAvailableAndOccupiedSpaces', () => {
        it('should return available and occupied spaces with a 200 status', async () => {
            const mockLatestStates = [
              { _id: '1', latestState: { state: 'Disponible' } },
              { _id: '2', latestState: { state: 'Ocupado' } },
              { _id: '3', latestState: { state: 'Disponible' } }
            ];
            ParkingSpace.aggregate.mockResolvedValue(mockLatestStates);
      
            await require('../src/controllers/parkingStatisticsController').getAvailableAndOccupiedSpaces(req, res, next);
      
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
            ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
      
            await require('../src/controllers/parkingStatisticsController').getAvailableAndOccupiedSpaces(req, res, next);
      
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
  
    describe('getTotalUsagePerSpace', () => {
        it('should return total usage per space for the current month with a 200 status', async () => {
            const mockUsagePerSpace = [
              { _id: '1', usageCount: 4 },
              { _id: '2', usageCount: 5 }
            ];
            ParkingSpace.aggregate.mockResolvedValue(mockUsagePerSpace);
      
            await require('../src/controllers/parkingStatisticsController').getTotalUsagePerSpace(req, res, next);
      
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
            ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
      
            await require('../src/controllers/parkingStatisticsController').getTotalUsagePerSpace(req, res, next);
      
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
  
    describe('getTotalDailyCustomers', () => {
        it('should return total customers for today with a 200 status', async () => {
            ParkingSpace.countDocuments.mockResolvedValue(10);
      
            await require('../src/controllers/parkingStatisticsController').getTotalDailyCustomers(req, res, next);
      
            expect(ParkingSpace.countDocuments).toHaveBeenCalledWith({
                hour_date_entry: { $gte: expect.any(Date), $lt: expect.any(Date) }
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ totalCustomers: 10 });
        });
    
        it('should return a 500 status if an error occurs', async () => {
            ParkingSpace.countDocuments.mockRejectedValue(new Error('Test Error'));
      
            await require('../src/controllers/parkingStatisticsController').getTotalDailyCustomers(req, res, next);
      
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
  
      describe('getAverageParkingTime', () => {
        it('should return average parking time with a 200 status', async () => {
            const mockAverageParkingTime = [{ averageTime: 60 }];
            ParkingSpace.aggregate.mockResolvedValue(mockAverageParkingTime);
      
            await require('../src/controllers/parkingStatisticsController').getAverageParkingTime(req, res, next);
      
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
      
          it('should return a 500 status if an error occurs', async () => {
              ParkingSpace.aggregate.mockRejectedValue(new Error('Test Error'));
        
              await require('../src/controllers/parkingStatisticsController').getAverageParkingTime(req, res, next);
        
              expect(res.status).toHaveBeenCalledWith(500);
              expect(res.json).toHaveBeenCalledWith({ message: 'Test Error' });
        });
    });
});