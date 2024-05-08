const express = require('express');
const parkinTimeController = require('../controllers/parkingTimeCustomerController');

const router = express.Router()

router.get('/customer/:id', parkinTimeController.getLatestParkingSpaceByCustomer);

module.exports = router;