const express = require('express');
const parkinTimeController = require('../controllers/parkingTimeController');

const router = express.Router()

router.get('/:id', parkinTimeController.getLatestParkingSpaceById);

module.exports = router;