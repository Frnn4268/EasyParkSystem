const express = require('express')
const timeSearchParkingController = require('../controllers/timeSearchParkingController')

const router = express.Router()

// Time search parking route
router.get('/', timeSearchParkingController.getAllTimeSearchParking)
router.get('/last-time', timeSearchParkingController.getLastTimeSearchParking)
router.post('/', timeSearchParkingController.createTimeSearchParking)
router.put('/:id', timeSearchParkingController.updateTimeSearchParking)
router.delete('/:id', timeSearchParkingController.deleteTimeSearchParking)

module.exports = router
