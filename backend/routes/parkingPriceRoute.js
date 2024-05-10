const express = require('express')
const parkingPriceController = require('../controllers/parkingPriceController')

const router = express.Router()

// Parking Price route
router.get('/last-parking-price', parkingPriceController.getLastParkingPrice)
router.get('/:id', parkingPriceController.getParkingCostById)
router.post('/', parkingPriceController.createParkingPrice)

module.exports = router