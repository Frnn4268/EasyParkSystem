const express = require('express')
const parkingSpaceController = require('../controllers/parkingSpaceController')
const parkingStatisticsController = require('../controllers/parkingStatisticsController.js');

const router = express.Router()

// Parking space route
router.get('/', parkingSpaceController.getAllParkingSpaces)
router.post('/', parkingSpaceController.createParkingSpace)
router.put('/:id', parkingSpaceController.updateParkingSpace)
router.delete('/:id', parkingSpaceController.deleteParkingSpace)

// Parking Space statistics routes
router.get('/total-customers-per-month', parkingStatisticsController.getTotalCustomersPerDayOfMonth);
router.get('/total-vehicles-per-month', parkingStatisticsController.getTotalVehiclesPerDayOfMonth);
router.get('/total-state-spaces', parkingStatisticsController.getAvailableAndOccupiedSpaces);
router.get('/total-usage-per-space', parkingStatisticsController.getTotalUsagePerSpace);
router.get('/total-daily-customers', parkingStatisticsController.getTotalDailyCustomers);
router.get('/average-parking-time', parkingStatisticsController.getAverageParkingTime);
router.get('/longest-parking-duration-of-month', parkingStatisticsController.getLongestParkingDurationOfMonth);
router.get('/average-time-search-parking', parkingStatisticsController.getAverageTimeSearchParking);

module.exports = router
