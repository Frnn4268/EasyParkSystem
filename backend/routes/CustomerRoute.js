const express = require('express')
const customerController = require('../controllers/customerController')

const router = express.Router()

// Customer route
router.get('/', customerController.getAllCustomers)
router.put('/:id', customerController.updateCustomer)
router.delete('/:id', customerController.deleteCustomer)

module.exports = router
