const express = require('express')
const timeSearchParkingController = require('../controllers/timeSearchParkingController')

const router = express.Router()

// Time search parking route
router.get('/', timeSearchParkingController.getAllTimeSearchParking)
router.post('/', timeSearchParkingController.createTimeSearchParking)
router.put('/:id', timeSearchParkingController.updateTimeSearchParking)
router.delete('/:id', timeSearchParkingController.deleteTimeSearchParking)

module.exports = router
