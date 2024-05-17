const express = require('express');
const parkingEntryController = require('../controllers/parkingEntryController.js');
const parkingStatisticsController = require('../controllers/parkingStatisticsController.js');

const router = express.Router()

// Parking Space route
router.get('/', parkingEntryController.getAllParkingSpaces);
router.get('/state', parkingEntryController.getAllLatestParkingSpaces);
router.get('/average-time', parkingEntryController.getAverageParkingTime);
router.get('/usual-customers', parkingEntryController.getFrequentCustomers);
router.get('/total-customers', parkingEntryController.getTotalCustomersToday);
router.get('/:id', parkingEntryController.getParkingSpaceById);
router.post('/', parkingEntryController.parkingEntryCreate);
router.put('/:id', parkingEntryController.parkingOutputEdit);
router.delete('/:id', parkingEntryController.deleteParkingSpace);

// Parking Space statistics routes
router.get('/total-customers-per-day', parkingStatisticsController.getTotalCustomersPerDay);
router.get('/parking-space-usage-count', parkingStatisticsController.getParkingSpaceUsageCount);
router.get('/total-usage-count-per-parking-space', parkingStatisticsController.getTotalUsageCountPerParkingSpace);
router.get('/average-parking-time-per-parking-space', parkingStatisticsController.getAverageParkingTimePerParkingSpace);
router.get('/average-parking-time-for-vehicles', parkingStatisticsController.getAverageParkingTimeForVehicles);
router.get('/total-occupied-and-available-states', parkingStatisticsController.getTotalOccupiedAndAvailableStates);
router.get('/total-customers-today', parkingStatisticsController.getTotalCustomersToday);

module.exports = router;