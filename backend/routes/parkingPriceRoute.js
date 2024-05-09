const express = require('express')
const parkingPriceController = require('../controllers/parkingPriceController')

const router = express.Router()

// Income route
router.get('/last-parking-price', parkingPriceController.getLastParkingPrice)
router.post('/', parkingPriceController.createParkingPrice)

module.exports = router