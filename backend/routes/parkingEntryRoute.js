const express = require('express');
const parkingEntryController = require('../controllers/parkingEntryController.js');

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

module.exports = router;