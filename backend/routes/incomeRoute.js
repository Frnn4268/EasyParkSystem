const express = require('express')
const incomeController = require('../controllers/incomeController')

const router = express.Router()

// Income route
router.get('/', incomeController.getAllIncomes)
router.get('/last-income', incomeController.getLastIncome)
router.get('/week-income', incomeController.getWeeklyIncome)
router.get('/statistics-income', incomeController.getFilteredIncome)
router.post('/', incomeController.createIncome)
router.put('/:id', incomeController.updateIncome)
router.delete('/:id', incomeController.deleteIncome)

module.exports = router