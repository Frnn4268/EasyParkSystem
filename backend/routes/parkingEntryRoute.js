const express = require('express');
const parkingEntryController = require('../controllers/parkingEntryController.js');

const router = express.Router()

// Parking Space route
router.post('/', parkingEntryController.parkingEntryCreate);

module.exports = router;