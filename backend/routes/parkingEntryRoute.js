const express = require('express');
const parkingEntryController = require('../controllers/parkingEntryController.js');

const router = express.Router()

// Parking Space route
router.get('/', parkingEntryController.getAllParkingSpaces);
router.post('/', parkingEntryController.parkingEntryCreate);
router.put('/:id', parkingEntryController.parkingOutputEdit);

module.exports = router;