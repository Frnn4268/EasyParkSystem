const express = require('express')
const vehicleController = require('../controllers/vehicleController')

const router = express.Router()

// Vehicle route
router.get('/', vehicleController.getAllVehicles)
router.post('/', vehicleController.createVehicle)
router.put('/', vehicleController.updateVehicle)
router.delete('/', vehicleController.deleteVehicle)

module.exports = router
