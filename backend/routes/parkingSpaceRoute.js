const express = require('express')
const parkingSpaceController = require('../controllers/parkingSpaceController')

const router = express.Router()

// Parking space route
router.get('/', parkingSpaceController.getAllParkingSpaces)
router.post('/', parkingSpaceController.createParkingSpace)
router.put('/:id', parkingSpaceController.updateParkingSpace)
router.delete('/:id', parkingSpaceController.deleteParkingSpace)

module.exports = router
