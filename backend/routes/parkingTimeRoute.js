const express = require('express');
const parkintTimeController = require('../controllers/parkingTimeController');

const router = express.Router()

router.get('/:id', parkintTimeController.getLatestParkingSpaceById);

module.exports = router;