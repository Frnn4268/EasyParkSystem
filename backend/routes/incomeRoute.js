const express = require('express')
const incomeController = require('../controllers/incomeController')

const router = express.Router()

// Income route
router.get('/', incomeController.getAllIncomes)
router.post('/', incomeController.createIncome)
router.put('/', incomeController.updateIncome)
router.delete('/', incomeController.deleteIncome)

module.exports = router